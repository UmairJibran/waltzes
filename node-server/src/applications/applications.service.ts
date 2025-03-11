import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './schemas/application.schema';
import { Model } from 'mongoose';
import { SqsProducerService } from 'src/aws/sqs-producer/sqs-producer.service';
import { JobsService } from 'src/jobs/jobs.service';
import { Job } from 'src/jobs/entities/job.entity';
import { JobDocument } from 'src/jobs/schemas/job.schema';
import { UserDocument } from 'src/users/schemas/user.schema';
import { S3Service } from 'src/aws/s3/s3.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name) private applications: Model<Application>,
    @Inject(forwardRef(() => JobsService))
    private readonly jobsService: JobsService,
    private readonly sqsProducerService: SqsProducerService,
    private readonly usersService: UsersService,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
    user: string,
    baseUrl: string,
  ) {
    const isUserPro = await this.usersService.isUserPro({ id: user });
    if (!isUserPro) {
      throw new HttpException(
        'You need to have an active subscription to use this feature, head over to the web app to subscribe',
        402,
      );
    }
    const existingJob = await this.jobsService.findByUrl(
      createApplicationDto.jobUrl,
    );
    let jobId: string = existingJob?._id.toString() || '';
    if (!existingJob) {
      const newJob = await this.jobsService.initJob(
        createApplicationDto.jobUrl,
        { baseUrl },
      );
      jobId = newJob._id.toString();
    } else if (existingJob?.status === 'error') {
      await this.jobsService.initJob(createApplicationDto.jobUrl, { baseUrl });
    }

    const app = await this.applications.create({
      ...createApplicationDto,
      user,
      job: jobId,
    });

    if (existingJob && existingJob.status === 'done') {
      await this.startProcessingByUrl(createApplicationDto.jobUrl, existingJob);
    }

    return { applicationId: app._id };
  }

  async getApplication(applicationId: string) {
    const app = await this.applications
      .findById({
        _id: applicationId,
      })
      .populate<{ job: { status: string } }>([
        {
          path: 'job',
          model: 'Job',
          select: 'status',
        },
      ]);

    if (!app) {
      return null;
    }

    const requiresResume = app.generateResume;
    const requiresCoverLetter = app.generateCoverLetter;

    const steps = {
      scraping: 'pending',
      resume: 'pending',
      coverLetter: 'pending',
      pdf: 'pending',
    };

    const downloadUrls: {
      resume?: string;
      coverLetter?: string;
    } = {
      resume: undefined,
      coverLetter: undefined,
    };

    if (app.job?.status === 'done') {
      steps.scraping = 'done';
    } else if (app.jobScrapingStarted) {
      steps.scraping = 'processing';
    }

    if (!requiresResume) {
      steps.resume = 'skipped';
    } else if (app.resumeRaw) {
      steps.resume = 'done';
    } else if (app.resumeStarted) {
      steps.resume = 'processing';
    }

    if (!requiresCoverLetter) {
      steps.coverLetter = 'skipped';
    } else if (app.coverLetterRaw) {
      steps.coverLetter = 'done';
    } else if (app.coverLetterStarted) {
      steps.coverLetter = 'processing';
    }

    const coverLetterStatus =
      (steps.coverLetter === 'done' && app.appliedWith?.coverLetter) ||
      steps.coverLetter === 'skipped';

    const resumeStatus =
      (steps.resume === 'done' && app.appliedWith?.resume) ||
      steps.resume === 'skipped';

    if (resumeStatus && coverLetterStatus) {
      steps.pdf = 'done';
      downloadUrls.resume = app.appliedWith?.resume;
      downloadUrls.coverLetter = app.appliedWith?.coverLetter;
    }

    const overallStatus = Object.values(steps).every(
      (step) => step === 'done' || step === 'skipped',
    )
      ? 'finished'
      : Object.values(steps).some((step) => step === 'processing')
        ? 'processing'
        : 'enqueue';

    if (downloadUrls.resume) {
      downloadUrls.resume = await this.s3Service.getPreSignedUrl(
        downloadUrls.resume,
        {},
      );
    }
    if (downloadUrls.coverLetter) {
      downloadUrls.coverLetter = await this.s3Service.getPreSignedUrl(
        downloadUrls.coverLetter,
        {},
      );
    }

    return {
      status: overallStatus,
      steps,
      downloadUrls,
    };
  }

  async findAll(
    user: string,
    {
      status,
      page = 1,
      pageSize = 10,
    }: {
      status?: 'applied' | 'interviewing' | 'rejected' | 'accepted';
      page?: number;
      pageSize?: number;
    },
  ) {
    const query = {
      user,
      deletedAt: null,
      ...(status && { applicationStatus: status }),
    };

    const skip = (page - 1) * pageSize;

    const [applications, total] = await Promise.all([
      this.applications
        .find(query)
        .skip(skip)
        .sort({ createdAt: 'asc' })
        .populate([
          {
            path: 'job',
            model: 'Job',
            select: 'title companyName location url',
          },
        ])
        .limit(pageSize)
        .exec(),
      this.applications.countDocuments(query),
    ]);

    return {
      data: applications,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: string, user: string) {
    const app = await this.applications.findOne({
      _id: id,
      user,
      deletedAt: null,
    });
    return app;
  }

  async update(
    id: string,
    user: string,
    updateApplicationDto: UpdateApplicationDto,
  ) {
    const app = await this.applications.findOneAndUpdate(
      { _id: id, user, deletedAt: null },
      updateApplicationDto,
    );
    return app;
  }

  async remove(id: string, user: string) {
    const app = await this.applications.findOneAndUpdate(
      { _id: id, user, deletedAt: null },
      { deletedAt: new Date() },
      { new: true },
    );
    return app;
  }

  async startProcessingByUrl(url: string, jobDetails: Job) {
    const pendingApplications = await this.applications
      .find({
        jobUrl: url,
      })
      .populate([
        {
          path: 'user',
          model: 'User',
          select:
            'linkedinScrapedData firstName lastName email phone portfolioUrl linkedinUsername githubUsername additionalInstructions',
        },
      ]);

    const messages: IMessage[] = [];
    for (const app of pendingApplications) {
      messages.push({
        applicationId: app._id.toString(),
        jobDetails: {
          companyName: jobDetails.companyName,
          description: jobDetails.description,
          location: jobDetails.location,
          skills: jobDetails.skills,
          title: jobDetails.title,
        },
        applicantDetails: app.user,
        resume: app.generateResume,
        coverLetter: app.generateCoverLetter,
      });
    }

    for (const message of messages) {
      if (message.resume) {
        const callbackUrl =
          'http://localhost:3000/api/_internal/resume-segments?application-id=' +
          message.applicationId.toString();
        await this.sqsProducerService.sendMessage(
          {
            jobDetails: message.jobDetails,
            applicantDetails: message.applicantDetails,
            callbackUrl,
          },
          'resumeCreator',
          message.applicationId,
          message.applicationId,
        );
      }
      if (message.coverLetter) {
        const callbackUrl =
          'http://localhost:3000/api/_internal/cover-letter-segments?application-id=' +
          message.applicationId.toString();
        await this.sqsProducerService.sendMessage(
          {
            jobDetails: message.jobDetails,
            applicantDetails: message.applicantDetails,
            callbackUrl,
          },
          'coverLetterCreator',
          message.applicationId,
          message.applicationId,
        );
      }
    }
  }

  async storeDocumentLinks(
    applicationId: string,
    pdfFiles: {
      resumePdf: string | null;
      coverLetterPdf: string | null;
    },
  ) {
    const { resumePdf, coverLetterPdf } = pdfFiles;
    const application = await this.applications.findOneAndUpdate(
      { _id: applicationId },
      {
        appliedWith: {
          resume: resumePdf,
          coverLetter: coverLetterPdf,
        },
      },
    );
    if (!application) return;

    const numberOfDocuments = Object.values(pdfFiles).filter(
      (file) => file !== null,
    ).length;

    const userId = application.user;

    await this.usersService.recordMeteredUsage(userId, numberOfDocuments);
  }

  async storeResumeSegments(applicationId: string, segments: object) {
    await this.applications.updateOne(
      { _id: applicationId },
      { resumeRaw: segments },
    );
    await this.createPdf(applicationId);
  }

  async storeCoverLetterSegments(applicationId: string, segments: string) {
    await this.applications.updateOne(
      { _id: applicationId },
      { coverLetterRaw: segments },
    );
    await this.createPdf(applicationId);
  }

  async createPdf(applicationId: string) {
    const app = await this.applications
      .findById(applicationId)
      .populate<{ job: JobDocument; user: UserDocument }>([
        {
          path: 'job',
          model: 'Job',
          select: 'title companyName',
        },
        {
          path: 'user',
          model: 'User',
          select: 'firstName lastName email',
        },
      ]);
    if (!app) return;
    if (app.generateResume && !app.resumeRaw) return;
    if (app.generateCoverLetter && !app.coverLetterRaw) return;

    const messageBody = {
      callbackUrl:
        'http://localhost:3000/api/_internal/pdf-processed?application-id=' +
        applicationId.toString(),
      jobDetails: {
        title: app.job.title,
        companyName: app.job.companyName,
      },
      applicantDetails: {
        firstName: app.user.firstName,
        lastName: app.user.lastName,
        email: app.user.email,
      },
      path: `generated/users/${app.user._id.toString()}/applications/${applicationId}`,
      resume: app.generateResume ? app.resumeRaw : null,
      coverLetter: app.generateCoverLetter ? app.coverLetterRaw : null,
    };

    await this.sqsProducerService.sendMessage(
      messageBody,
      'pdfProcessor',
      applicationId,
      applicationId,
    );
  }

  async scrapingStarted(jobUrl: string) {
    await this.applications.updateMany(
      { jobUrl },
      { $set: { jobScrapingStarted: true } },
    );
  }

  async resumeProcessingStarted(applicationId: string) {
    await this.applications.updateOne(
      { _id: applicationId },
      { $set: { resumeStarted: true } },
    );
  }

  async coverLetterProcessingStarted(applicationId: string) {
    await this.applications.updateOne(
      { _id: applicationId },
      { $set: { coverLetterStarted: true } },
    );
  }
}

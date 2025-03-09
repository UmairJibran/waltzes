import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './schemas/application.schema';
import { Model } from 'mongoose';
import { SqsProducerService } from 'src/aws/sqs-producer/sqs-producer.service';
import { JobsService } from 'src/jobs/jobs.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name) private applications: Model<Application>,
    private readonly jobsService: JobsService,
    private readonly sqsProducerService: SqsProducerService,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
    user: string,
    baseUrl: string,
  ) {
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
    } else if (existingJob.status === 'done') {
      // TODO: send messages to resume and/or cover letter queues with data
    } else if (existingJob?.status === 'error') {
      await this.jobsService.initJob(createApplicationDto.jobUrl, { baseUrl });
    }

    const app = await this.applications.create({
      ...createApplicationDto,
      user,
      job: jobId,
    });

    return { applicationId: app._id };
  }

  async getApplication(applicationId: string) {
    const app = await this.applications.findById({
      _id: applicationId,
    });

    if (!app) {
      return null;
    }

    return {
      status: 'finished', // | 'processing' | 'finished',
      steps: {
        scraping: 'done', // "done" | 'processing' | 'pending',
        resume: 'done', // | 'processing' | 'pending',
        coverLetter: 'done', // | 'processing' | 'pending',
        pdf: 'done', // | 'processing' | 'pending',
      },
      downloadUrls: { resume: 'xyz', coverLetter: 'xyz' },
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

  // async startProcessingByUrl(url: string, jobDetails: Job) {
  //   const pendingApplications = await this.applications.find({
  //     jobUrl: url,
  //   });
  //   const messages: unknown[] = [];
  //   for (const app of pendingApplications) {
  //     messages.push({
  //       app,
  //       callbackUrl: '',
  //       jobDetails: {
  //         companyName: jobDetails.companyName,
  //         description: jobDetails.description,
  //         location: jobDetails.location,
  //         jobTitle: jobDetails.title,
  //         skills: jobDetails.skills,
  //       },
  //       applicantDetails: {},
  //     });
  //   }
  //   console.log(
  //     '🚀 ~ ApplicationsService ~ startProcessingByUrl ~ messages:',
  //     messages,
  //   );
  // }
}

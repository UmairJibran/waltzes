import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './schemas/job.schema';
import { Model } from 'mongoose';
import { SqsProducerService } from 'src/aws/sqs-producer/sqs-producer.service';
import { ApplicationsService } from 'src/applications/applications.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private jobs: Model<Job>,
    @Inject(forwardRef(() => ApplicationsService))
    private readonly applicationsService: ApplicationsService,
    private readonly sqsProducerService: SqsProducerService,
  ) {}

  async initJob(url: string, { baseUrl }: { baseUrl: string }) {
    const callbackUrl = new URL(baseUrl + '/api/_internal/job-scraper');
    callbackUrl.searchParams.append('job-url', url);
    await this.sqsProducerService.sendMessage(
      {
        jobUrl: url,
        callbackUrl: callbackUrl.toString(),
      },
      'jobScraper',
      url,
      url,
    );
    const createdJob = await this.jobs.create({ url, status: 'pending' });
    return createdJob;
  }

  async findByUrl(url: string) {
    return await this.jobs.findOne({ url });
  }

  findById(id: string) {
    return this.jobs.findById(id);
  }

  async updateFromWebhook(url: string, updateJobDto: UpdateJobDto) {
    const job = await this.findByUrl(url);
    if (!job) {
      return;
    }
    job.description = updateJobDto.description;
    job.title = updateJobDto.title ?? 'N/A';
    job.companyName = updateJobDto.companyName ?? 'N/A';
    job.location = updateJobDto.location ?? 'N/A';
    job.salary = updateJobDto.salary ?? 'N/A';
    job.skills = updateJobDto.skills;
    job.status = 'done';
    await job.save();
    await this.applicationsService.startProcessingByUrl(url, job);
  }
}

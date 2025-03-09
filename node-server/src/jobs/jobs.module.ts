import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './schemas/job.schema';
import { SqsProducerModule } from 'src/aws/sqs-producer/sqs-producer.module';
// import { ApplicationsModule } from 'src/applications/applications.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    SqsProducerModule,
    // ApplicationsModule,
  ],
  providers: [JobsService],
  exports: [JobsService, MongooseModule],
})
export class JobsModule {}

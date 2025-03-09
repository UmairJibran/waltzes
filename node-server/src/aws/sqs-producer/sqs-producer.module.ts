import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SqsProducerService } from './sqs-producer.service';
import { availableQueues } from './constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SQSClient } from '@aws-sdk/client-sqs';

@Module({
  imports: [
    ConfigModule,
    SqsModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const awsConfig: AwsConfig = await configService.getOrThrow('aws');
        return {
          consumers: [],
          producers: [
            {
              name: availableQueues.sendEmail,
              queueUrl: awsConfig.emailQueueUrl,
              region: awsConfig.awsRegion,
              sqs: new SQSClient({
                region: awsConfig.awsRegion,
                endpoint: awsConfig.endpoint,
              }),
            },
            {
              name: availableQueues.linkedinScraper,
              queueUrl: awsConfig.linkedinScraperQueueUrl,
              region: awsConfig.awsRegion,
              sqs: new SQSClient({
                region: awsConfig.awsRegion,
                endpoint: awsConfig.endpoint,
              }),
            },
            {
              name: availableQueues.jobScraper,
              queueUrl: awsConfig.jobScraperQueueUrl,
              region: awsConfig.awsRegion,
              sqs: new SQSClient({
                region: awsConfig.awsRegion,
                endpoint: awsConfig.endpoint,
              }),
            },
            {
              name: availableQueues.coverLetterCreator,
              queueUrl: awsConfig.coverLetterCreatorQueueUrl,
              region: awsConfig.awsRegion,
              sqs: new SQSClient({
                region: awsConfig.awsRegion,
                endpoint: awsConfig.endpoint,
              }),
            },
            {
              name: availableQueues.resumeCreator,
              queueUrl: awsConfig.resumeCreatorQueueUrl,
              region: awsConfig.awsRegion,
              sqs: new SQSClient({
                region: awsConfig.awsRegion,
                endpoint: awsConfig.endpoint,
              }),
            },
            {
              name: availableQueues.pdfProcessor,
              queueUrl: awsConfig.pdfProcessorQueueUrl,
              region: awsConfig.awsRegion,
              sqs: new SQSClient({
                region: awsConfig.awsRegion,
                endpoint: awsConfig.endpoint,
              }),
            },
            {
              name: availableQueues.stripeMetering,
              queueUrl: awsConfig.stripeMeterQueueUrl,
              region: awsConfig.awsRegion,
              sqs: new SQSClient({
                region: awsConfig.awsRegion,
                endpoint: awsConfig.endpoint,
              }),
            },
          ],
        };
      },
    }),
  ],
  providers: [SqsProducerService],
  exports: [SqsProducerService],
})
export class SqsProducerModule {}

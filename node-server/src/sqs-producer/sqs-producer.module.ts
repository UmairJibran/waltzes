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
        const awsConfig: {
          emailQueueUrl: string;
          linkedinScraperQueueUrl: string;
          stripeMeterQueueUrl: string;
          region: string;
          endpoint: string;
        } = await configService.getOrThrow('aws');
        return {
          consumers: [],
          producers: [
            {
              name: availableQueues.sendEmail,
              queueUrl: awsConfig.emailQueueUrl,
              region: awsConfig.region,
              sqs: new SQSClient({
                region: awsConfig.region,
                endpoint: awsConfig.endpoint,
              }),
            },
            {
              name: availableQueues.linkedinScraper,
              queueUrl: awsConfig.linkedinScraperQueueUrl,
              region: awsConfig.region,
              sqs: new SQSClient({
                region: awsConfig.region,
                endpoint: awsConfig.endpoint,
              }),
            },
            {
              name: availableQueues.stripeMetering,
              queueUrl: awsConfig.stripeMeterQueueUrl,
              region: awsConfig.region,
              sqs: new SQSClient({
                region: awsConfig.region,
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

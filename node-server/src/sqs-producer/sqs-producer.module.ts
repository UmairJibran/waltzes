import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SqsProducerService } from './sqs-producer.service';
import { availableQueues } from './constant';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
        } = await configService.getOrThrow('aws');
        return {
          consumers: [],
          producers: [
            {
              name: availableQueues.sendEmail,
              queueUrl: awsConfig.emailQueueUrl,
              region: awsConfig.region,
            },
            {
              name: availableQueues.linkedinScraper,
              queueUrl: awsConfig.linkedinScraperQueueUrl,
              region: awsConfig.region,
            },
            {
              name: availableQueues.stripeMetering,
              queueUrl: awsConfig.stripeMeterQueueUrl,
              region: awsConfig.region,
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

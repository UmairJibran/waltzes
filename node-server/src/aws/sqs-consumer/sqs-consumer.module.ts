import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SqsConsumerService } from './sqs-consumer.service';
import { availableQueues } from 'src/aws/sqs-producer/constant';
import { SQSClient } from '@aws-sdk/client-sqs';
import { SesModule } from '../ses/ses.module';

@Module({
  imports: [
    ConfigModule,
    SesModule,
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
          producers: [],
          consumers: [
            {
              name: availableQueues.sendEmail,
              queueUrl: awsConfig.emailQueueUrl,
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
  providers: [SqsConsumerService],
})
export class SqsConsumerModule {}

import type { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { availableQueues } from 'src/sqs-producer/constant';

@Injectable()
export class SqsConsumerService {
  @SqsMessageHandler(availableQueues.sendEmail, false)
  async handleEmailMessages(message: Message) {
    if (message && message.Body) {
      const { emailType, to } = JSON.parse(
        message.Body,
      ) as unknown as EmailQueueMessage;
      console.log('🚀 ~ SqsConsumerService ~ handleEmailMessages ~ to:', to);
      console.log(
        '🚀 ~ SqsConsumerService ~ handleEmailMessages ~ emailType:',
        emailType,
      );
    }
  }
}

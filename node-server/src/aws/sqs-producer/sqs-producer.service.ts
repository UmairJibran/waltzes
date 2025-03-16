import { randomBytes } from 'crypto';

import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { availableQueues } from './constant';

@Injectable()
export class SqsProducerService {
  constructor(private readonly sqsService: SqsService) {}

  async sendMessage(
    body: object,
    queueName: keyof typeof availableQueues,
    deduplicationId: string,
    groupId: string,
  ) {
    const message: string = JSON.stringify(body);

    try {
      const response = await this.sqsService.send(queueName, {
        body: message,
        id: randomBytes(16).toString('hex'),
        deduplicationId,
        groupId,
      });
    } catch (error) {
      console.log('error in producing message!', error);
    }
  }
}

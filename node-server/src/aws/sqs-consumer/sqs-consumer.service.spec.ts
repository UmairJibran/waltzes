import { Test, TestingModule } from '@nestjs/testing';
import { SqsConsumerService } from './sqs-consumer.service';

describe('SqsConsumerService', () => {
  let service: SqsConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqsConsumerService],
    }).compile();

    service = module.get<SqsConsumerService>(SqsConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

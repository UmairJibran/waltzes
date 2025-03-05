import { Test, TestingModule } from '@nestjs/testing';
import { SqsProducerService } from './sqs-producer.service';

describe('SqsProducerService', () => {
  let service: SqsProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqsProducerService],
    }).compile();

    service = module.get<SqsProducerService>(SqsProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

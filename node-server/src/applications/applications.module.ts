import { Module, forwardRef } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './schemas/application.schema';
import { SqsProducerModule } from 'src/aws/sqs-producer/sqs-producer.module';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    SqsProducerModule,
    forwardRef(() => JobsModule),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService, MongooseModule],
})
export class ApplicationsModule {}

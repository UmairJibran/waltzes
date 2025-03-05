import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ApplicationsModule } from './applications/applications.module';
import { SqsProducerService } from './aws/sqs-producer/sqs-producer.service';
import { SqsProducerModule } from './aws/sqs-producer/sqs-producer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqsConsumerService } from './aws/sqs-consumer/sqs-consumer.service';
import { SqsConsumerModule } from './aws/sqs-consumer/sqs-consumer.module';
import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mongoUrl: string = await configService.getOrThrow('mongoUrl');
        return {
          uri: mongoUrl,
        };
      },
    }),
    UsersModule,
    AuthModule,
    ApplicationsModule,
    SqsProducerModule,
    SqsConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService, SqsProducerService, SqsConsumerService],
  exports: [ConfigModule],
})
export class AppModule {}

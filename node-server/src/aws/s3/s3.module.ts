import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  imports: [ConfigModule, S3Client],
  providers: [
    S3Service,
    {
      provide: S3Client,
      useFactory: () => new S3Client({}),
    },
  ],
  exports: [S3Service],
})
export class S3Module {}

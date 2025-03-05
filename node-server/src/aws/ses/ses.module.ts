import { Module } from '@nestjs/common';
import { SesService } from './ses.service';
import { ConfigModule } from '@nestjs/config';
import { SESClient } from '@aws-sdk/client-ses';

@Module({
  imports: [ConfigModule, SESClient],
  providers: [
    SesService,
    {
      provide: SESClient,
      useFactory: () => new SESClient({}),
    },
  ],
  exports: [SesService],
})
export class SesModule {}

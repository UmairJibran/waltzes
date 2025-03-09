import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from 'src/auth/constants';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UpdateJobDto } from 'src/jobs/dto/update-job.dto';
import { UsersService } from 'src/users/users.service';
import { JobsService } from 'src/jobs/jobs.service';
import { ApplicationsService } from 'src/applications/applications.service';

@Controller('_internal')
export class InternalController {
  constructor(
    private readonly usersService: UsersService,
    private readonly applicationsService: ApplicationsService,
    private readonly jobsService: JobsService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('users/:userId/linkedin')
  async updateUserLinkedin(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId') userId: string,
    @Query('check-value') checkValue: string,
  ) {
    if (!userId || !checkValue) {
      return;
    }
    if (typeof userId !== 'string' || userId.length === 0) {
      return;
    }

    if (typeof checkValue !== 'string' || checkValue.length === 0) {
      return;
    }
    const updatedUser = await this.usersService.updateLinkedinFromWebhook(
      userId,
      updateUserDto,
      checkValue,
    );
    return updatedUser;
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('job-scraper')
  async storeJobDetails(
    @Body() jobDetailsDto: UpdateJobDto,
    @Query('job-url') jobUrl: string,
  ) {
    await this.jobsService.updateFromWebhook(jobUrl, jobDetailsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('resume-segments')
  async storeResumeRaw(
    @Body() resumeRaw: object,
    @Query('application-id') applicationId: string,
  ) {
    await this.applicationsService.storeResumeSegments(
      applicationId,
      resumeRaw,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('cover-letter-segments')
  async storeCoverLetterRaw(
    @Body() coverLetterRaw: object,
    @Query('application-id') applicationId: string,
  ) {
    await this.applicationsService.storeCoverLetterSegments(
      applicationId,
      coverLetterRaw,
    );
  }
}

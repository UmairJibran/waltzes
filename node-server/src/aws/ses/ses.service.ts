import { Injectable, Logger } from '@nestjs/common';
import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SesService {
  private readonly logger = new Logger(SesService.name);
  private sesClient: SESClient;

  constructor(private readonly configService: ConfigService) {
    const awsConfig: AwsConfig = this.configService.getOrThrow('aws');
    this.sesClient = new SESClient({
      region: awsConfig.awsRegion,
      ...(awsConfig.endpoint && { endpoint: awsConfig.endpoint }),
      credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
      },
    });
  }

  async sendTemplateEmail(
    to: string | [string],
    template: string,
    templateData: object,
    replyTo?: string | [string],
  ) {
    const awsConfig: AwsConfig = this.configService.getOrThrow('aws');
    const command = new SendTemplatedEmailCommand({
      Source: awsConfig.sesSourceEmail,
      Destination: {
        ToAddresses: Array.isArray(to) ? to : [to],
      },
      ReplyToAddresses: replyTo
        ? Array.isArray(replyTo)
          ? replyTo
          : [replyTo]
        : [],
      Template: template,
      TemplateData: JSON.stringify(templateData),
    });
    try {
      const response = await this.sesClient.send(command);
      if (response.$metadata.httpStatusCode === 200) {
        this.logger.log(`Email sent to ${to as string}`);
      } else {
        this.logger.error(`Failed to send email to ${to as string}`);
      }
    } catch (error) {
      this.logger.error(`Failed to send email to ${to as string}`);
      this.logger.error(
        `Error sending email: ${JSON.stringify(error, null, 2)}`,
      );
    }
  }
}

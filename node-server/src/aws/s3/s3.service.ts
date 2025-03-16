import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private s3Client: S3Client;
  private resourceBucket: string;

  constructor(private readonly configService: ConfigService) {
    const awsConfig: AwsConfig = this.configService.getOrThrow('aws');
    this.resourceBucket = awsConfig.s3ResourceBucketName;
    this.s3Client = new S3Client({
      region: awsConfig.awsRegion,
      ...(awsConfig.endpoint && { endpoint: awsConfig.endpoint }),
      forcePathStyle: true,
      credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
      },
    });
  }

  async getPreSignedUrl(
    key: string,
    {
      bucket = this.resourceBucket,
      operation = 'getObject',
      expiry = 3600,
    }: {
      bucket?: string;
      operation?: 'putObject' | 'getObject';
      expiry?: number;
    },
  ): Promise<string> {
    try {
      let command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });
      if (operation === 'putObject') {
        command = new PutObjectCommand({
          Bucket: bucket,
          Key: key,
        });
      }

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: expiry,
      });
      return url;
    } catch (error) {
      this.logger.error(`Failed to get pre-signed URL for ${operation}`);
      this.logger.error(
        `Error getting pre-signed URL: ${JSON.stringify(error, null, 2)}`,
      );
      throw error;
    }
  }
}

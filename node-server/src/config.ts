export default () => ({
  port: parseInt(process.env.PORT?.toString() || '', 10) || 3000,
  mongoUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  aws: {
    emailQueueUrl: process.env.EMAIL_QUEUE_URL || '',
    linkedinScraperQueueUrl: process.env.LINKEDIN_SCRAPER_QUEUE_URL || '',
    meterQueueUrl: process.env.METER_QUEUE_URL || '',
    awsRegion: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.AWS_ENDPOINT || 'http://localhost:9324',
    sesSourceEmail: process.env.SES_SOURCE_EMAIL,
    jobScraperQueueUrl: process.env.JOB_SCRAPER_QUEUE_URL || '',
    coverLetterCreatorQueueUrl:
      process.env.COVER_LETTER_CREATOR_QUEUE_URL || '',
    resumeCreatorQueueUrl: process.env.RESUME_CREATOR_QUEUE_URL || '',
    pdfProcessorQueueUrl: process.env.PDF_PROCESSOR_QUEUE_URL || '',
    s3ResourceBucketName: process.env.AWS_RES_BUCKET || '',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

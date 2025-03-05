export default () => ({
  port: parseInt(process.env.PORT?.toString() || '', 10) || 3000,
  mongoUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  aws: {
    emailQueueUrl: process.env.EMAIL_QUEUE_URL || '',
    linkedinScraperQueueUrl: process.env.LINKEDIN_SCRAPER_QUEUE_URL || '',
    stripeMeterQueueUrl: process.env.STRIPE_METER_QUEUE_URL || '',
    awsRegion: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.SQS_ENDPOINT || 'http://localhost:9324',
  },
});

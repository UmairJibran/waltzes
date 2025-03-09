interface BaseEmailQueueMessage {
  to: string;
  replyTo?: string;
}
interface TemplatedEmailQueueMessage extends BaseEmailQueueMessage {
  emailType: 'templated';
  template: string;
  templateData: object;
}

interface SimpleEmailQueueMessage extends BaseEmailQueueMessage {
  emailType: 'simple';
  subject: string;
  body: string;
}

type EmailQueueMessage = TemplatedEmailQueueMessage | SimpleEmailQueueMessage;

interface AwsConfig {
  accessKeyId: string;
  secretAccessKey: string;
  emailQueueUrl: string;
  linkedinScraperQueueUrl: string;
  stripeMeterQueueUrl: string;
  awsRegion: string;
  endpoint: string;
  sesSourceEmail: string;
  jobScraperQueueUrl: string;
  coverLetterCreatorQueueUrl: string;
  resumeCreatorQueueUrl: string;
  pdfProcessorQueueUrl: string;
}

interface IMessage {
  applicationId: string;
  jobDetails: object;
  applicantDetails: object;
  resume: boolean;
  coverLetter: boolean;
}

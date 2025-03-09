export class CreateApplicationDto {
  jobTitle: string;
  companyName: string;
  applicationStatus: 'applied' | 'interviewing' | 'rejected' | 'accepted';
  generateCoverLetter: boolean;
  generateResume: boolean;
  jobUrl: string;
  notes?: string;
  appliedAt: Date;
}

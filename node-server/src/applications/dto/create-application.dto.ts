export class CreateApplicationDto {
  applicationStatus: 'applied' | 'interviewing' | 'rejected' | 'accepted';
  generateCoverLetter: boolean;
  generateResume: boolean;
  jobUrl: string;
  notes?: string;
  appliedAt: Date;
}

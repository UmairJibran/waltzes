export class CreateApplicationDto {
  jobTitle: string;
  companyName: string;
  applicationStatus: 'applied' | 'interviewing' | 'rejected' | 'accepted';
  jobUrl: string;
  notes?: string;
  appliedAt: Date;
}

export type ApplicationStatus = 'applied' | 'interviewing' | 'rejected' | 'accepted';

export interface AppliedWith {
  resume: string | null;
  coverLetter: string | null;
}

export interface Application {
  _id: string;
  jobTitle: string;
  companyName: string;
  applicationStatus: ApplicationStatus;
  applyDate: number;
  createdAt: number;
  updatedAt: number;
  appliedWith: AppliedWith;
  jobUrl: string | null;
} 
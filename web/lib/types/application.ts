export type ApplicationStatus =
  | "applied"
  | "interviewing"
  | "rejected"
  | "accepted";

export interface AppliedWith {
  resume?: string | null;
  coverLetter?: string | null;
}

export interface Application {
  _id: string;
  applicationStatus: ApplicationStatus;
  appliedAt: number;
  createdAt: number;
  updatedAt: number;
  appliedWith?: AppliedWith;
  resumeRaw?: Record<string, any>;
  coverLetterRaw?: string;
  job: {
    url: string | null;
    title: string;
    companyName: string;
    location: string;
  };
}

export interface ReGenerateApplicationDocumentRequest {
  applicationId: string;
  documentType: "resume" | "coverLetter";
}

export interface UpdateDocumentRequest {
  applicationId: string;
  documentType: "resume" | "coverLetter";
  documentData: Record<string, any> | string;
}

export interface GenerateApplicationRequest {
  jobUrl: string;
  generateResume: boolean;
  generateCoverLetter: boolean;
}

export interface ApplyStatus {
  status: 'enqueue' | 'processing' | 'finished';
  steps: {
    scraping: 'done' | 'processing' | 'pending';
    resume?: 'done' | 'processing' | 'pending' | 'skipped';
    coverLetter?: 'done' | 'processing' | 'pending' | 'skipped';
    pdf: 'done' | 'processing' | 'pending';
  };
  downloadUrls?: {
    resume?: string;
    coverLetter?: string;
  };
}

export interface GenerateApplicationResponse {
  applicationId: string;
}

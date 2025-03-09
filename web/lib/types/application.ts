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
  job: {
    url: string | null;
    title: string;
    companyName: string;
    location: string;
  };
}

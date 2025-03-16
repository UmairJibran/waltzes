export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone?: string;
  portfolioUrl?: string;
  linkedinUsername?: string;
  githubUsername?: string;
  additionalInstructions?: string;
  avatar?: string;
  isPro?: boolean;
}

export type UpdateUserData = Omit<User, "id" | "email" | "role"> & {
  newPassword?: string;
};

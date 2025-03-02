export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  portfolioUrl?: string;
  linkedinUsername?: string;
  githubUsername?: string;
  additionalInstructions?: string;
}

export type UpdateUserData = Omit<User, 'id' | 'email'> & {
  newPassword?: string;
}; 
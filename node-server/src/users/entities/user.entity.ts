export class User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  portfolioUrl?: string;
  linkedinUsername?: string;
  githubUsername?: string;
  additionalInstructions?: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

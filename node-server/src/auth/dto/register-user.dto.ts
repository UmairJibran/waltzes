export class RegisterUserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  portfolioUrl?: string;
  linkedinUsername?: string;
  githubUsername?: string;
  additionalInstructions?: string;
}

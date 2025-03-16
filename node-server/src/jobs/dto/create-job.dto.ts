export class CreateJobDto {
  title: string;
  description: string;
  skills: string[];
  companyName: string;
  url: string;
  notes?: string;
  location?: string;
  status?: string;
  salary?: string;
}

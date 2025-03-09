export class Job {
  id?: string;
  title: string;
  companyName: string;
  description?: string;
  skills?: string[];
  url?: string;
  location?: string;
  salary?: string;
  status: 'enqueue' | 'scraping' | 'done' | 'error';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

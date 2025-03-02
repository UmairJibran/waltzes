import axios from 'axios';
import { LoginInput, RegisterInput } from './validations/auth';
import { Application, ApplicationStatus } from './types/application';
import { LinkedInData } from './types/linkedin';
import linkedinData from '@/app/(authenticated)/(dashboard-sub)/scraped/linkedin/data.json';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: async (data: LoginInput) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },
  register: async (data: RegisterInput) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
};

export const linkedinApi = {
  getData: async (): Promise<LinkedInData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return linkedinData.linkedin_data_raw;
  },
  updateData: async (data: LinkedInData): Promise<LinkedInData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return data;
  },
};

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

const MOCK_APPLICATIONS = Array.from({ length: 100 }, (_, i) => ({
  _id: `${i + 1}`,
  jobTitle: `Job Title ${i + 1}`,
  companyName: `Company#${i + 1}`,
  applicationStatus: ['applied', 'interviewing', 'rejected', 'accepted'][Math.floor(Math.random() * 4)] as ApplicationStatus,
  applyDate: Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  appliedWith: {
    resume: Math.random() > 0.5 ? 'https://www.orimi.com/pdf-test.pdf' : null,
    coverLetter: Math.random() > 0.5 ? 'https://www.orimi.com/pdf-test.pdf' : null,
  },
  jobUrl: Math.random() > 0.3 ? `https://example.com/job${i + 1}` : null,
}));

export const applicationsApi = {
  getAll: async (page = 1, pageSize = 50): Promise<PaginatedResponse<Application>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = MOCK_APPLICATIONS.slice(start, end);

    return {
      data: paginatedData,
      total: MOCK_APPLICATIONS.length,
      page,
      pageSize,
    };
  },
  getByStatus: async (status: ApplicationStatus, page = 1, pageSize = 50): Promise<PaginatedResponse<Application>> => {
    const result = await applicationsApi.getAll(1, MOCK_APPLICATIONS.length);
    const filteredData = result.data.filter(app => app.applicationStatus === status);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      data: filteredData.slice(start, end),
      total: filteredData.length,
      page,
      pageSize,
    };
  },
  updateStatus: async (applicationId: string, status: ApplicationStatus): Promise<Application> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const application = MOCK_APPLICATIONS.find(app => app._id === applicationId);

    if (!application) {
      throw new Error('Application not found');
    }

    application.applicationStatus = status;
    application.updatedAt = Date.now();

    return application;
  },
};

export default apiClient; 
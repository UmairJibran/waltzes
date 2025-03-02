import axios from 'axios';
import { LoginInput, RegisterInput } from './validations/auth';
import { Application, ApplicationStatus } from './types/application';

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

export const applicationsApi = {
  getAll: async (): Promise<Application[]> => {
    // Temporary mock data
    return [
      {
        _id: '1',
        jobTitle: 'Senior Frontend Developer',
        applicationStatus: 'applied',
        applyDate: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        appliedWith: { resume: null, coverLetter: null },
        jobUrl: 'https://example.com/job1',
      },
      {
        _id: '2',
        jobTitle: 'Full Stack Engineer',
        applicationStatus: 'interviewing',
        applyDate: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        appliedWith: { resume: 'https://resume.com/1', coverLetter: null },
        jobUrl: 'https://example.com/job2',
      },
      {
        _id: '3',
        jobTitle: 'React Developer',
        applicationStatus: 'rejected',
        applyDate: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        appliedWith: { resume: 'https://resume.com/1', coverLetter: 'https://cover.com/1' },
        jobUrl: 'https://example.com/job3',
      },
      {
        _id: '4',
        jobTitle: 'Software Engineer',
        applicationStatus: 'accepted',
        applyDate: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        appliedWith: { resume: 'https://resume.com/1', coverLetter: null },
        jobUrl: 'https://example.com/job4',
      },
    ];
  },
  getByStatus: async (status: ApplicationStatus): Promise<Application[]> => {
    const allApplications = await applicationsApi.getAll();
    return allApplications.filter(app => app.applicationStatus === status);
  },
};

export default apiClient; 
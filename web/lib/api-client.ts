import { LoginInput, RegisterInput } from './validations/auth';
import { LinkedInData } from './types/linkedin';
import { UpdateUserData, User } from './types/user';
import { Application, ApplicationStatus } from './types/application';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const authToken = JSON.parse(localStorage.getItem('auth-storage') || '{}')
    ?.state?.accessToken;

  const headers = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}

export const authApi = {
  async login(data: LoginInput): Promise<{ access_token: string }> {
    return fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async register(data: RegisterInput): Promise<void> {
    return fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export const userApi = {
  async getMe(): Promise<User> {
    return fetchWithAuth('/users/me');
  },

  async updateMe(data: UpdateUserData): Promise<User> {
    return fetchWithAuth('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

export const linkedinApi = {
  async getData(): Promise<LinkedInData> {
    const response = await fetchWithAuth('/users/me/linkedin');
    return response.linkedin_data_raw as unknown as LinkedInData;
  },
  async updateData(data: LinkedInData): Promise<LinkedInData> {
    const response = await fetchWithAuth('/users/me/linkedin', {
      method: 'PATCH',
      body: JSON.stringify({ linkedin_data_raw: data }),
    });
    return response.linkedin_data_raw as unknown as LinkedInData;
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
  applicationStatus: ['applied', 'interviewing', 'rejected', 'accepted'][
    Math.floor(Math.random() * 4)
  ] as ApplicationStatus,
  applyDate: Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  appliedWith: {
    resume: Math.random() > 0.5 ? 'https://www.orimi.com/pdf-test.pdf' : null,
    coverLetter:
      Math.random() > 0.5 ? 'https://www.orimi.com/pdf-test.pdf' : null,
  },
  jobUrl: Math.random() > 0.3 ? `https://example.com/job${i + 1}` : null,
}));

export const applicationsApi = {
  getAll: async (
    page = 1,
    pageSize = 50
  ): Promise<PaginatedResponse<Application>> => {
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
  getByStatus: async (
    status: ApplicationStatus,
    page = 1,
    pageSize = 50
  ): Promise<PaginatedResponse<Application>> => {
    const result = await applicationsApi.getAll(1, MOCK_APPLICATIONS.length);
    const filteredData = result.data.filter(
      app => app.applicationStatus === status
    );
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      data: filteredData.slice(start, end),
      total: filteredData.length,
      page,
      pageSize,
    };
  },
  updateStatus: async (
    applicationId: string,
    status: ApplicationStatus
  ): Promise<Application> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const application = MOCK_APPLICATIONS.find(
      app => app._id === applicationId
    );

    if (!application) {
      throw new Error('Application not found');
    }

    application.applicationStatus = status;
    application.updatedAt = Date.now();

    return application;
  },
};

export default API_URL;

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

export const applicationsApi = {
  getAll: async (
    page = 1,
    pageSize = 50
  ): Promise<PaginatedResponse<Application>> => {
    return fetchWithAuth(
      '/applications?' +
        new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
        }).toString()
    );
  },
  getByStatus: async (
    status: ApplicationStatus,
    page = 1,
    pageSize = 50
  ): Promise<PaginatedResponse<Application>> => {
    return fetchWithAuth(
      '/applications?' +
        new URLSearchParams({
          status,
          page: page.toString(),
          pageSize: pageSize.toString(),
        }).toString()
    );
  },
  updateStatus: async (
    applicationId: string,
    status: ApplicationStatus
  ): Promise<Application> => {
    return fetchWithAuth(`/applications/${applicationId}`, {
      method: 'PATCH',
      body: JSON.stringify({ applicationStatus: status }),
    });
  },
};

export default API_URL;

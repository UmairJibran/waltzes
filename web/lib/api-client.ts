import { LoginInput, RegisterInput } from "./validations/auth";
import { LinkedInData } from "./types/linkedin";
import { UpdateUserData, User } from "./types/user";
import { Application, ApplicationStatus } from "./types/application";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<
      string,
      | string
      | object
      | string[]
      | object[]
      | null
      | undefined
      | number
      | boolean
      | number[]
      | boolean[]
    >;
  };
  meta?: Record<
    string,
    | string
    | object
    | string[]
    | object[]
    | null
    | undefined
    | number
    | boolean
    | number[]
    | boolean[]
  >;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const authToken = JSON.parse(localStorage.getItem("auth-storage") || "{}")
    ?.state?.accessToken;

  const headers = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const result: ApiResponse<T> = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "API request failed");
  }

  if (result.data === undefined) {
    throw new Error("API response missing data");
  }

  return result.data;
}

export const authApi = {
  async login(data: LoginInput): Promise<{ access_token: string }> {
    return fetchWithAuth<{ access_token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async register(data: RegisterInput): Promise<void> {
    return fetchWithAuth<void>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

export const userApi = {
  async getMe(): Promise<User> {
    return fetchWithAuth<User>("/users/me");
  },

  async updateMe(data: UpdateUserData): Promise<User> {
    return fetchWithAuth<User>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};

export const linkedinApi = {
  async getData(): Promise<LinkedInData> {
    const response = await fetchWithAuth<{ linkedin_data_raw?: LinkedInData }>(
      "/users/me/linkedin"
    );
    if (response.linkedin_data_raw) {
      return response.linkedin_data_raw;
    }
    return response as unknown as LinkedInData;
  },

  async updateData(data: LinkedInData): Promise<LinkedInData> {
    const response = await fetchWithAuth<{ linkedin_data_raw?: LinkedInData }>(
      "/users/me/linkedin",
      {
        method: "PATCH",
        body: JSON.stringify({ linkedin_data_raw: data }),
      }
    );
    return response.linkedin_data_raw as LinkedInData;
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
    return fetchWithAuth<PaginatedResponse<Application>>(
      "/applications?" +
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
    return fetchWithAuth<PaginatedResponse<Application>>(
      "/applications?" +
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
    return fetchWithAuth<Application>(`/applications/${applicationId}`, {
      method: "PATCH",
      body: JSON.stringify({ applicationStatus: status }),
    });
  },
};

export default API_URL;

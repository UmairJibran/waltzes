import { ForgotPasswordInput, LoginInput, RegisterInput, ResetPasswordInput } from "./validations/auth";
import { LinkedInData } from "./types/linkedin";
import { UpdateUserData, User } from "./types/user";
import {
  Application,
  ApplicationStatus,
  GenerateApplicationRequest,
  ApplyStatus,
  GenerateApplicationResponse,
  ReGenerateApplicationDocumentRequest,
  UpdateDocumentRequest,
} from "@/lib/types/application";

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

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public details?: Record<
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
    >
  ) {
    super(message);
    this.name = "APIError";
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof APIError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

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
  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
    throw new APIError("Authentication required", 401);
  }

  const result: ApiResponse<T> = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "API request failed");
  }

  if (result.data === undefined) {
    return {} as T;
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
  
  async forgotPassword(data: ForgotPasswordInput): Promise<{ success: boolean }> {
    return fetchWithAuth<{ success: boolean }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  
  async resetPassword(data: ResetPasswordInput): Promise<{ success: boolean }> {
    return fetchWithAuth<{ success: boolean }>("/auth/reset-password", {
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

  async requestLatestData(): Promise<void> {
    await fetchWithAuth("/users/me/linkedin/request-refetch", {
      method: "POST",
    });
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

export const meterUsageApi = {
  async getData(): Promise<IUsageMeter[] | undefined> {
    const response = await fetchWithAuth<{ linkedin_data_raw?: LinkedInData }>(
      "/usage-meter"
    );

    return response as unknown as IUsageMeter[];
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

  generateApplication: async (
    data: GenerateApplicationRequest
  ): Promise<GenerateApplicationResponse> => {
    return fetchWithAuth<GenerateApplicationResponse>("/applications", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  reGenerateApplication: async (
    data: ReGenerateApplicationDocumentRequest
  ): Promise<GenerateApplicationResponse> => {
    return fetchWithAuth<ReGenerateApplicationDocumentRequest>(
      "/applications/recreate",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },
  updateDocument: async (
    data: UpdateDocumentRequest
  ): Promise<{ success: boolean }> => {
    return fetchWithAuth<{ success: boolean }>(
      "/applications/update-document",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },
  getApplicationStatus: async (applicationId: string): Promise<ApplyStatus> => {
    return fetchWithAuth<ApplyStatus>(`/applications/${applicationId}`, {
      method: "GET",
    });
  },
};

export default API_URL;

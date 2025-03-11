import { ApiResponse } from '../types/api';

export class APIError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public code?: string,
        public details?: Record<string, any>
    ) {
        super(message);
        this.name = 'APIError';
    }
}

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof APIError) {
        return error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred';
};

export const handleAPIResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
    const data: ApiResponse<T> = await response.json();

    if (!data.success) {
        throw new APIError(
            data.error?.message || 'An error occurred while processing your request',
            response.status,
            data.error?.code,
            data.error?.details
        );
    }

    return data;
}; 
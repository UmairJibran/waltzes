export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: Record<string, any>;
    };
    meta?: Record<string, any>;
}

export class ApiResponseBuilder {
    static success<T>(data: T, meta?: Record<string, any>): ApiResponse<T> {
        return {
            success: true,
            data,
            meta,
        };
    }

    static error(
        code: string,
        message: string,
        details?: Record<string, any>,
    ): ApiResponse<null> {
        return {
            success: false,
            error: {
                code,
                message,
                details,
            },
        };
    }
} 
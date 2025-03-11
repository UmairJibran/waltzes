export class APIError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public code?: string
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

export const handleAPIResponse = async (response: Response) => {
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new APIError(
            data.message || 'An error occurred while processing your request',
            response.status,
            data.code
        );
    }
    return response;
}; 
import { handleAPIResponse } from '../utils/errors';
import { ApiResponse } from '../types/api';

export interface AuthResponse {
    access_token: string;
    user: {
        id: string;
        email: string;
    };
}

interface LoginCredentials {
    email: string;
    password: string;
}

export const signIn = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    const apiResponse = await handleAPIResponse<AuthResponse>(response);
    return apiResponse.data!;
}; 
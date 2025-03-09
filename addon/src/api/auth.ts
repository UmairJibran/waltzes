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

    if (!response.ok) {
        throw new Error('Authentication failed');
    }

    return response.json();
}; 
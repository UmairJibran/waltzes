export interface AuthResponse {
    access_token: string;
    user: {
        id: string;
        email: string;
    };
}

export const signIn = async (redirectUrl: string): Promise<AuthResponse> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        access_token: "mock_access_token_123",
        user: {
            id: "1",
            email: "user@example.com"
        }
    };
}; 
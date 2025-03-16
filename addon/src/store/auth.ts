import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    email: string | null;
    setAuth: (token: string, email: string) => void;
    clearAuth: () => void;
    initializeFromStorage: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    accessToken: null,
    email: null,
    setAuth: async (token: string, email: string) => {
        await chrome.storage.local.set({
            auth: { token, email }
        });
        set({ isAuthenticated: true, accessToken: token, email });
    },
    clearAuth: async () => {
        await chrome.storage.local.remove('auth');
        set({ isAuthenticated: false, accessToken: null, email: null });
    },
    initializeFromStorage: async () => {
        const data = await chrome.storage.local.get('auth');
        if (data.auth) {
            set({
                isAuthenticated: true,
                accessToken: data.auth.token,
                email: data.auth.email
            });
        }
    }
})); 
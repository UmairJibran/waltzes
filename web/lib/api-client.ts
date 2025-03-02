import axios from 'axios';
import { LoginInput, RegisterInput } from './validations/auth';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: async (data: LoginInput) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },
  register: async (data: RegisterInput) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
};

export default apiClient; 
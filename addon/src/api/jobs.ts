import { useAuthStore } from '../store/auth';

export interface GenerateApplicationRequest {
    jobUrl: string;
    generateResume: boolean;
    generateCoverLetter: boolean;
}

export interface JobStatus {
    status: 'enqueue' | 'processing' | 'finished';
    steps: {
        scraping: 'done' | 'processing' | 'pending';
        resume?: 'done' | 'processing' | 'pending';
        coverLetter?: 'done' | 'processing' | 'pending';
        pdf: 'done' | 'processing' | 'pending';
    };
    downloadUrls?: {
        resume?: string;
        coverLetter?: string;
    };
}

export const generateApplication = async (data: GenerateApplicationRequest): Promise<{ applicationId: string }> => {
    const { accessToken } = useAuthStore.getState();

    if (!accessToken) {
        throw new Error('Authentication required');
    }

    const response = await fetch(`${process.env.API_URL}/applications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to generate application');
    }

    return response.json();
};

export const getApplicationStatus = async (applicationId: string): Promise<JobStatus> => {
    const { accessToken } = useAuthStore.getState();

    if (!accessToken) {
        throw new Error('Authentication required');
    }

    const response = await fetch(`${process.env.API_URL}/applications/${applicationId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch application status');
    }

    return response.json();
}; 
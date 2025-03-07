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

export const generateApplication = async (data: GenerateApplicationRequest): Promise<{ jobId: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { jobId: "mock_job_123" };
};

export const getJobStatus = async (jobId: string): Promise<JobStatus> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock different states based on time
    const now = Date.now();
    const phase = Math.floor((now / 1000) % 4);

    switch (phase) {
        case 0:
            return {
                status: 'enqueue',
                steps: {
                    scraping: 'processing',
                    resume: 'pending',
                    coverLetter: 'pending',
                    pdf: 'pending'
                }
            };
        case 1:
            return {
                status: 'processing',
                steps: {
                    scraping: 'done',
                    resume: 'processing',
                    coverLetter: 'processing',
                    pdf: 'pending'
                }
            };
        case 2:
            return {
                status: 'processing',
                steps: {
                    scraping: 'done',
                    resume: 'done',
                    coverLetter: 'done',
                    pdf: 'processing'
                }
            };
        default:
            return {
                status: 'finished',
                steps: {
                    scraping: 'done',
                    resume: 'done',
                    coverLetter: 'done',
                    pdf: 'done'
                },
                downloadUrls: {
                    resume: 'https://example.com/resume.pdf',
                    coverLetter: 'https://example.com/cover-letter.pdf'
                }
            };
    }
}; 
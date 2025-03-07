import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';
import { signIn } from '../api/auth';
import { generateApplication, getJobStatus, type JobStatus } from '../api/jobs';

const POLL_INTERVAL = 1000;

interface Props {
  onClose: () => void;
}

export const JobApplicationPopup: React.FC<Props> = ({ onClose }) => {
  const { isAuthenticated, setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    resume: false,
    coverLetter: false,
  });
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await signIn(process.env.LOGIN_URL || '');
      setAuth(response.access_token);
    } catch (error) {
      console.error('Login failed:', error);
    }
    setIsLoading(false);
  };

  const handleApply = async () => {
    if (!selectedOptions.resume && !selectedOptions.coverLetter) {
      alert('Please select at least one option');
      return;
    }

    setIsLoading(true);
    try {
      const response = await generateApplication({
        jobUrl: window.location.href,
        generateResume: selectedOptions.resume,
        generateCoverLetter: selectedOptions.coverLetter,
      });
      setJobId(response.jobId);
    } catch (error) {
      console.error('Application generation failed:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (jobId && jobStatus?.status !== 'finished') {
      interval = setInterval(async () => {
        try {
          const status = await getJobStatus(jobId);
          setJobStatus(status);
          if (status.status === 'finished') {
            clearInterval(interval);
          }
        } catch (error) {
          console.error('Failed to fetch job status:', error);
          clearInterval(interval);
        }
      }, POLL_INTERVAL);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [jobId, jobStatus?.status]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="neo-container max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-4">
          <h2 className="text-3xl font-black tracking-tight">Waltzes</h2>
          <button
            onClick={onClose}
            className="neo-button w-10 h-10 !p-0 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {!isAuthenticated ? (
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="neo-button w-full"
          >
            {isLoading ? 'Signing in...' : 'Sign in to Continue'}
          </button>
        ) : jobStatus ? (
          <div className="space-y-6">
            <div className="neo-container">
              <h3 className="font-bold text-xl mb-4">
                Status: {jobStatus.status}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      jobStatus.steps.scraping === 'done'
                        ? 'bg-green-500'
                        : jobStatus.steps.scraping === 'processing'
                        ? 'bg-yellow-500'
                        : 'bg-gray-300'
                    }`}
                  />
                  <span className="font-bold">Scraping Job Post</span>
                </div>
                {selectedOptions.resume && (
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        jobStatus.steps.resume === 'done'
                          ? 'bg-green-500'
                          : jobStatus.steps.resume === 'processing'
                          ? 'bg-yellow-500'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span className="font-bold">Generating Resume</span>
                  </div>
                )}
                {selectedOptions.coverLetter && (
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        jobStatus.steps.coverLetter === 'done'
                          ? 'bg-green-500'
                          : jobStatus.steps.coverLetter === 'processing'
                          ? 'bg-yellow-500'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span className="font-bold">Generating Cover Letter</span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      jobStatus.steps.pdf === 'done'
                        ? 'bg-green-500'
                        : jobStatus.steps.pdf === 'processing'
                        ? 'bg-yellow-500'
                        : 'bg-gray-300'
                    }`}
                  />
                  <span className="font-bold">Creating PDF</span>
                </div>
              </div>
            </div>
            {jobStatus.status === 'finished' && jobStatus.downloadUrls && (
              <div className="space-y-3">
                {jobStatus.downloadUrls.resume && (
                  <a
                    href={jobStatus.downloadUrls.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-button w-full block text-center"
                  >
                    Download Resume
                  </a>
                )}
                {jobStatus.downloadUrls.coverLetter && (
                  <a
                    href={jobStatus.downloadUrls.coverLetter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-button w-full block text-center"
                  >
                    Download Cover Letter
                  </a>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="neo-container">
              <h3 className="font-bold text-xl mb-2">Current Page</h3>
              <p className="text-gray-600">{document.title}</p>
              <p className="text-gray-600 truncate">{window.location.href}</p>
            </div>

            <div className="space-y-3">
              <label className="neo-container block cursor-pointer">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedOptions.resume}
                    onChange={(e) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        resume: e.target.checked,
                      }))
                    }
                    className="neo-checkbox"
                  />
                  <span className="font-bold text-lg">Resume (1 credit)</span>
                </div>
              </label>

              <label className="neo-container block cursor-pointer">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedOptions.coverLetter}
                    onChange={(e) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        coverLetter: e.target.checked,
                      }))
                    }
                    className="neo-checkbox"
                  />
                  <span className="font-bold text-lg">
                    Cover Letter (0.5 credit)
                  </span>
                </div>
              </label>
            </div>

            <button
              onClick={handleApply}
              disabled={isLoading}
              className="neo-button w-full"
            >
              {isLoading ? 'Generating...' : 'Generate Application'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

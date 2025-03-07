import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';
import { signIn } from '../api/auth';
import { generateApplication, getJobStatus, type JobStatus } from '../api/jobs';

const POLL_INTERVAL = 1000; // 1 second

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="neo-brutal-container bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black">Job Application Generator</h2>
          <button
            onClick={onClose}
            className="neo-brutal-button w-8 h-8 flex items-center justify-center text-2xl font-bold bg-white rounded"
          >
            ×
          </button>
        </div>

        {!isAuthenticated ? (
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="neo-brutal-button w-full bg-black text-white py-3 px-6 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in to Continue'}
          </button>
        ) : jobStatus ? (
          <div className="space-y-4">
            <h3 className="font-bold text-xl">Status: {jobStatus.status}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 neo-brutal-container p-3">
                <div
                  className={`h-3 w-3 rounded-full ${
                    jobStatus.steps.scraping === 'done'
                      ? 'bg-green-500'
                      : jobStatus.steps.scraping === 'processing'
                      ? 'bg-yellow-500'
                      : 'bg-gray-300'
                  }`}
                />
                <span className="font-medium">Scraping Job Post</span>
              </div>
              {selectedOptions.resume && (
                <div className="flex items-center space-x-3 neo-brutal-container p-3">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      jobStatus.steps.resume === 'done'
                        ? 'bg-green-500'
                        : jobStatus.steps.resume === 'processing'
                        ? 'bg-yellow-500'
                        : 'bg-gray-300'
                    }`}
                  />
                  <span className="font-medium">Generating Resume</span>
                </div>
              )}
              {selectedOptions.coverLetter && (
                <div className="flex items-center space-x-3 neo-brutal-container p-3">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      jobStatus.steps.coverLetter === 'done'
                        ? 'bg-green-500'
                        : jobStatus.steps.coverLetter === 'processing'
                        ? 'bg-yellow-500'
                        : 'bg-gray-300'
                    }`}
                  />
                  <span className="font-medium">Generating Cover Letter</span>
                </div>
              )}
              <div className="flex items-center space-x-3 neo-brutal-container p-3">
                <div
                  className={`h-3 w-3 rounded-full ${
                    jobStatus.steps.pdf === 'done'
                      ? 'bg-green-500'
                      : jobStatus.steps.pdf === 'processing'
                      ? 'bg-yellow-500'
                      : 'bg-gray-300'
                  }`}
                />
                <span className="font-medium">Creating PDF</span>
              </div>
            </div>
            {jobStatus.status === 'finished' && jobStatus.downloadUrls && (
              <div className="space-y-3 mt-6">
                {jobStatus.downloadUrls.resume && (
                  <a
                    href={jobStatus.downloadUrls.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-brutal-button block w-full bg-black text-white py-3 px-6 rounded text-center font-bold"
                  >
                    Download Resume
                  </a>
                )}
                {jobStatus.downloadUrls.coverLetter && (
                  <a
                    href={jobStatus.downloadUrls.coverLetter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-brutal-button block w-full bg-black text-white py-3 px-6 rounded text-center font-bold"
                  >
                    Download Cover Letter
                  </a>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="neo-brutal-container p-4">
              <h3 className="font-bold mb-2">Current Page</h3>
              <p className="text-gray-600 font-medium">{document.title}</p>
              <p className="text-gray-600 truncate font-medium">
                {window.location.href}
              </p>
            </div>

            <div className="space-y-3">
              <label className="neo-brutal-container flex items-center space-x-3 p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedOptions.resume}
                  onChange={(e) =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      resume: e.target.checked,
                    }))
                  }
                  className="neo-brutal-checkbox"
                />
                <span className="font-bold">Resume (1 credit)</span>
              </label>

              <label className="neo-brutal-container flex items-center space-x-3 p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedOptions.coverLetter}
                  onChange={(e) =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      coverLetter: e.target.checked,
                    }))
                  }
                  className="neo-brutal-checkbox"
                />
                <span className="font-bold">Cover Letter (0.5 credit)</span>
              </label>
            </div>

            <button
              onClick={handleApply}
              disabled={isLoading}
              className="neo-brutal-button w-full bg-black text-white py-3 px-6 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Application'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

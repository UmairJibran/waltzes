import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';
import {
  generateApplication,
  getApplicationStatus,
  type JobStatus,
} from '../api/jobs';
import { signIn } from '../api/auth';
import { StatusPanel } from './StatusPanel';
import { DownloadPanel } from './DownloadPanel';
import { OptionCheckbox } from './OptionCheckbox';

const POLL_INTERVAL = 1000;

interface Props {
  onClose: () => void;
}

export const JobApplicationPopup: React.FC<Props> = ({ onClose }) => {
  const { isAuthenticated, setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    resume: false,
    coverLetter: false,
  });
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await signIn({ email, password });
      setAuth(response.access_token, email);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async () => {
    setIsLoading(true);
    try {
      const response = await generateApplication({
        jobUrl: window.location.href,
        generateResume: selectedOptions.resume,
        generateCoverLetter: selectedOptions.coverLetter,
      });
      setApplicationId(response.applicationId);
    } catch (error) {
      console.error('Application generation failed:', error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (applicationId && jobStatus?.status !== 'finished') {
      interval = setInterval(async () => {
        try {
          const status = await getApplicationStatus(applicationId);
          setJobStatus(status);
          if (status.status === 'finished') {
            clearInterval(interval);
          }
        } catch (error) {
          console.error('Failed to fetch application status:', error);
          clearInterval(interval);
        } finally {
          if (isLoading) setIsLoading(false);
        }
      }, POLL_INTERVAL);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [applicationId, jobStatus?.status]);

  const isGenerateDisabled =
    isLoading || (!selectedOptions.resume && !selectedOptions.coverLetter);

  if (isLoading) {
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
          <div className="space-y-6">
            <div className="neo-container">
              <h3 className="font-bold text-xl mb-2 animate-pulse">
                Did you know that 90% of job applications are rejected before
                they even reach the hiring manager?
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="space-y-6">
            <p className="text-gray-600">
              Sign in to start generating your personalized job applications.
            </p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block font-bold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-4 border-black p-3 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block font-bold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-4 border-black p-3 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="neo-button w-full"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {!applicationId && (
              <div className="space-y-6">
                <div className="neo-container">
                  <h3 className="font-bold text-xl mb-2">
                    Current Page{' '}
                    <small className="text-gray-600 text-sm">
                      Page must be public for best results
                    </small>
                  </h3>
                  <p className="text-gray-600">{document.title}</p>
                  <p className="text-gray-600 truncate">
                    {window.location.href}
                  </p>
                </div>

                <div className="space-y-3">
                  <OptionCheckbox
                    checked={selectedOptions.resume}
                    onChange={(checked) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        resume: checked,
                      }))
                    }
                    label="Resume (1 credit)"
                  />
                  <OptionCheckbox
                    checked={selectedOptions.coverLetter}
                    onChange={(checked) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        coverLetter: checked,
                      }))
                    }
                    label="Cover Letter (0.5 credit)"
                  />
                </div>

                <button
                  onClick={handleApply}
                  disabled={isGenerateDisabled}
                  className="neo-button w-full"
                >
                  {isLoading ? 'Generating...' : 'Generate Application'}
                </button>
              </div>
            )}

            {jobStatus && (
              <>
                <StatusPanel
                  status={jobStatus}
                  selectedOptions={selectedOptions}
                />
                {jobStatus.status === 'finished' && jobStatus.downloadUrls && (
                  <DownloadPanel downloadUrls={jobStatus.downloadUrls} />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';
import { signIn } from '../api/auth';
import { generateApplication, getJobStatus, type JobStatus } from '../api/jobs';
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

  const isGenerateDisabled =
    isLoading || (!selectedOptions.resume && !selectedOptions.coverLetter);

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
          <div className="space-y-4">
            <p className="text-gray-600">
              Sign in to start generating your personalized job applications.
            </p>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="neo-button w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign in to Continue'}
            </button>
          </div>
        ) : jobStatus ? (
          <div className="space-y-6">
            <StatusPanel status={jobStatus} selectedOptions={selectedOptions} />
            {jobStatus.status === 'finished' && jobStatus.downloadUrls && (
              <DownloadPanel downloadUrls={jobStatus.downloadUrls} />
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
              <OptionCheckbox
                checked={selectedOptions.resume}
                onChange={(checked) =>
                  setSelectedOptions((prev) => ({ ...prev, resume: checked }))
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
      </div>
    </div>
  );
};

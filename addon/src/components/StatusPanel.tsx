import React from 'react';
import { JobStatus } from '../api/jobs';
import { StatusIndicator } from './StatusIndicator';

interface Props {
  status: JobStatus;
  selectedOptions: {
    resume: boolean;
    coverLetter: boolean;
  };
}

export const StatusPanel: React.FC<Props> = ({ status, selectedOptions }) => (
  <div className="neo-container">
    <h3 className="font-bold text-xl mb-4">Status: {status.status}</h3>
    <div className="space-y-3">
      <StatusIndicator
        status={status.steps.scraping}
        label="Scraping Job Post"
      />
      {selectedOptions.resume && (
        <StatusIndicator
          status={status.steps.resume || 'pending'}
          label="Generating Resume"
        />
      )}
      {selectedOptions.coverLetter && (
        <StatusIndicator
          status={status.steps.coverLetter || 'pending'}
          label="Generating Cover Letter"
        />
      )}
      <StatusIndicator status={status.steps.pdf} label="Creating PDF" />
    </div>
  </div>
);

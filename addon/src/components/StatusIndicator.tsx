import React from 'react';

type Status = 'done' | 'processing' | 'pending';

interface Props {
  status: Status;
  label: string;
}

export const StatusIndicator: React.FC<Props> = ({ status, label }) => (
  <div className="flex items-center space-x-3">
    <div
      className={`w-3 h-3 rounded-full ${
        status === 'done'
          ? 'bg-accent-success'
          : status === 'processing'
            ? 'bg-accent-warning'
            : 'bg-secondary-label'
      }`}
    />
    <span className="font-bold text-primary-text">{label}</span>
  </div>
);

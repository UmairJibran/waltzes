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
          ? 'bg-green-500'
          : status === 'processing'
            ? 'bg-yellow-500'
            : 'bg-gray-300'
      }`}
    />
    <span className="font-bold">{label}</span>
  </div>
);

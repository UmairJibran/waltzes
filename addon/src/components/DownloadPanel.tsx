import React from 'react';

interface Props {
  downloadUrls: {
    resume?: string;
    coverLetter?: string;
  };
}

export const DownloadPanel: React.FC<Props> = ({ downloadUrls }) => (
  <div className="space-y-3">
    {downloadUrls.resume && (
      <a
        href={downloadUrls.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="neo-button w-full block text-center"
      >
        Download Resume
      </a>
    )}
    {downloadUrls.coverLetter && (
      <a
        href={downloadUrls.coverLetter}
        target="_blank"
        rel="noopener noreferrer"
        className="neo-button w-full block text-center"
      >
        Download Cover Letter
      </a>
    )}
  </div>
);

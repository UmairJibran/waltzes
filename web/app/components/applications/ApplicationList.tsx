import { Application } from '@/lib/types/application';
import { format } from 'date-fns';
import { useState } from 'react';
import { ApplicationDialog } from './ApplicationDialog';

interface ApplicationListProps {
  applications: Application[];
}

const statusColors = {
  applied: 'bg-blue-500/10 text-blue-500',
  interviewing: 'bg-yellow-500/10 text-yellow-500',
  rejected: 'bg-red-500/10 text-red-500',
  accepted: 'bg-green-500/10 text-green-500',
};

export function ApplicationList({ applications }: ApplicationListProps) {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  return (
    <>
      <div className="w-full">
        <div className="rounded-md border">
          <div className="grid grid-cols-[1fr,100px,80px] gap-4 border-b bg-muted/50 p-2 text-sm font-medium">
            <div>Job Title</div>
            <div>Applied On</div>
            <div>Status</div>
          </div>
          <div className="divide-y">
            {applications.map(application => (
              <button
                key={application._id}
                className="w-full grid grid-cols-[1fr,100px,80px] items-center gap-4 p-2 hover:bg-muted/50 text-left"
                onClick={() => setSelectedApplication(application)}
              >
                <div className="flex flex-col">
                  <span className="font-medium truncate">
                    {application.jobTitle}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {format(application.applyDate, 'MMM d, yyyy')}
                </div>
                <div>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      statusColors[application.applicationStatus]
                    }`}
                  >
                    {application.applicationStatus}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <ApplicationDialog
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </>
  );
}

import { Application } from '@/lib/types/application';
import { format } from 'date-fns';
import { FileText, Link2 } from 'lucide-react';

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
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="grid grid-cols-[1fr,120px,120px,100px] gap-4 border-b bg-muted/50 p-4 font-medium">
          <div>Job Title</div>
          <div>Applied On</div>
          <div>Documents</div>
          <div>Status</div>
        </div>
        <div className="divide-y">
          {applications.map((application) => (
            <div
              key={application._id}
              className="grid grid-cols-[1fr,120px,120px,100px] items-center gap-4 p-4 hover:bg-muted/50"
            >
              <div className="flex flex-col">
                <span className="font-medium">{application.jobTitle}</span>
                {application.jobUrl && (
                  <a
                    href={application.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:underline"
                  >
                    <Link2 className="h-3 w-3" />
                    View Job
                  </a>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {format(application.applyDate, 'MMM d, yyyy')}
              </div>
              <div className="flex gap-2">
                {application.appliedWith.resume && (
                  <a
                    href={application.appliedWith.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <FileText className="h-4 w-4" />
                    Resume
                  </a>
                )}
                {application.appliedWith.coverLetter && (
                  <a
                    href={application.appliedWith.coverLetter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <FileText className="h-4 w-4" />
                    Cover Letter
                  </a>
                )}
              </div>
              <div>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    statusColors[application.applicationStatus]
                  }`}
                >
                  {application.applicationStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
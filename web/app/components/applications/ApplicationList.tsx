import { Application, ApplicationStatus } from '@/lib/types/application';
import { format } from 'date-fns';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ApplicationDialog } from './ApplicationDialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateApplicationStatus } from '@/hooks/use-applications';
import { cn } from '@/lib/utils';

interface ApplicationListProps {
  applications: Application[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

const statusColors = {
  applied: 'bg-blue-500/10 text-blue-500',
  interviewing: 'bg-yellow-500/10 text-yellow-500',
  rejected: 'bg-red-500/10 text-red-500',
  accepted: 'bg-green-500/10 text-green-500',
};

const STATUS_OPTIONS: ApplicationStatus[] = [
  'applied',
  'interviewing',
  'accepted',
  'rejected',
];

export function ApplicationList({
  applications,
  page,
  pageSize,
  total,
  onPageChange,
}: ApplicationListProps) {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateApplicationStatus();
  const totalPages = Math.ceil(total / pageSize);

  if (applications.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        No applications found, let&apos;s start applying!
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-2 px-3 text-left text-xs font-medium">
                  Job Title
                </th>
                <th className="py-2 px-3 text-left text-xs font-medium w-[250px]">
                  Company
                </th>
                <th className="py-2 px-3 text-left text-xs font-medium w-[100px]">
                  Applied On
                </th>
                <th className="py-2 px-3 text-left text-xs font-medium w-[150px]">
                  Status
                </th>
                <th className="py-2 px-3 text-center text-xs font-medium w-[60px]">
                  View
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {applications.map(application => (
                <tr key={application._id} className="hover:bg-muted/50">
                  <td className="py-1.5 px-3">
                    <span className="text-sm font-medium truncate block">
                      {application.job.title}
                    </span>
                  </td>
                  <td className="py-1.5 px-3">
                    <span className="text-xs text-muted-foreground">
                      {application.job.companyName}
                    </span>
                  </td>
                  <td className="py-1.5 px-3">
                    <span className="text-xs text-muted-foreground">
                      {format(application.appliedAt, 'MMM d, yyyy')}
                    </span>
                  </td>
                  <td className="py-1.5 px-3">
                    <Select
                      value={application.applicationStatus}
                      onValueChange={(value: ApplicationStatus) => {
                        updateStatus({
                          applicationId: application._id,
                          status: value,
                        });
                      }}
                      disabled={isUpdating}
                    >
                      <SelectTrigger
                        className={cn(
                          'h-7 w-[130px] text-xs',
                          statusColors[application.applicationStatus]
                        )}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map(status => (
                          <SelectItem
                            key={status}
                            value={status}
                            className="text-xs"
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-1.5 px-3 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setSelectedApplication(application)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {(page - 1) * pageSize + 1} to{' '}
              {Math.min(page * pageSize, total)} of {total} results
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      <ApplicationDialog
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </>
  );
}

'use client';

import { ApplicationList } from '@/app/components/applications/ApplicationList';
import { useApplications } from '@/hooks/use-applications';

export default function Page() {
  const { data: applications, isLoading } = useApplications('accepted');

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-full rounded bg-muted" />
          <div className="h-8 w-full rounded bg-muted" />
          <div className="h-8 w-full rounded bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl font-semibold">Accepted Applications</h1>
      <ApplicationList applications={applications || []} />
    </div>
  );
}

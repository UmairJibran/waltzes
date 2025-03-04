'use client';

import { ApplicationList } from '@/app/components/applications/ApplicationList';
import { useApplications } from '@/hooks/use-applications';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;
  const { data, isLoading } = useApplications({
    status: 'accepted',
    page: currentPage,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

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
      <ApplicationList
        applications={data?.data || []}
        page={data?.page || 1}
        pageSize={data?.pageSize || 50}
        total={data?.total || 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

'use client';

import { LinkedInForm } from '@/app/components/linkedin/LinkedInForm';
import { useLinkedIn } from '@/hooks/use-linkedin';

export default function Page() {
  const { data, isLoading, isUpdating, updateData } = useLinkedIn();

  if (!data) {
    return <div>No Data, please scrape first</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <LinkedInForm
        data={data}
        onSave={updateData}
        isSaving={isLoading || isUpdating}
      />
    </div>
  );
}

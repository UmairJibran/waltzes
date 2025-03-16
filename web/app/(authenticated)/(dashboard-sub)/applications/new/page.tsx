'use client';

import { NewApplication } from '@/app/components/applications/NewApplication';

export default function NewApplicationPage() {
  return (
    <div className="bg-background min-h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <NewApplication />
    </div>
  );
}

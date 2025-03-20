"use client";

import { BillingDetails } from "@/app/components/billing/BillingDetails";
import { useUser } from "@/hooks/use-user";

export default function AccountPage() {
  const { user, isLoading } = useUser(true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container py-8">
      <BillingDetails user={user} />
    </div>
  );
}

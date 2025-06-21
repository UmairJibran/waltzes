'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function SubscriptionDialog({
  user,
}: {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const subscribe = () => {
    const path = process.env.NEXT_PUBLIC_CHARGEBEE_LINK;
    if (!path) return;
    const url = new URL(path);
    url.searchParams.append('customer[first_name]', user.firstName);
    url.searchParams.append('customer[last_name]', user.lastName);
    url.searchParams.append('customer[email]', user.email);
    router.push(url.toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            You&apos;re on the free plan
          </DialogTitle>
          <DialogDescription className="pt-2 space-y-4">
            <p>
              Upgrade to a paid plan to unlock unlimited document generation and
              access advanced features.
            </p>

            <div className="flex items-center justify-center py-3">
              <div className="text-center">
                <span className="text-3xl font-bold text-green-600">
                  5 Free
                </span>
                <span className="block text-lg font-medium">
                  documents monthly
                </span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p className="mb-1">After subscribing:</p>
              <ul className="space-y-1">
                <li>• Get 5 free documents every month</li>
                <li>• Pay only 10¢ for each additional document</li>
                <li>• Cancel your subscription at any time</li>
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4">
          <Button className="w-full" onClick={subscribe}>
            Subscribe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
    url.searchParams.append("customer[first_name]", user.firstName);
    url.searchParams.append("customer[last_name]", user.lastName);
    url.searchParams.append("customer[email]", user.email);
    router.push(url.toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col w-auto h-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            You&apos;re on the free plan
          </DialogTitle>
          <DialogDescription>
            Upgrade to a paid plan to unlock unlimited document generation and
            access advanced features.
            <br />
            <span className="text-muted-foreground">
              After subscribing, you will get 5 free documents every month. You
              will be charged $1 for each additional document generated. You can
              cancel your subscription at any time.
            </span>
            <div className="flex flex-col gap-6 flex-1 overflow-hidden">
              <div className="flex flex-col gap-2">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">$1</span>
                    <span className="text-muted-foreground">/document</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" className="w-full" onClick={subscribe}>
              Subscribe
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

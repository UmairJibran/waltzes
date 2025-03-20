"use client";

import { LinkedInForm } from "@/app/components/linkedin/LinkedInForm";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { useLinkedIn } from "@/hooks/use-linkedin";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { useState } from "react";
import { getErrorMessage } from "@/lib/api-client";
import { toast } from "@/components/ui/use-toast";

export default function Page() {
  const [showLinkedInWarning, setShowLinkedInWarning] = useState(false);
  const {
    data,
    isLoading,
    isUpdating,
    updateData,
    isRequesting,
    refetchLatestFromLinkedIn,
    requestLatestFromLinkedinError,
    requestLatestFromLinkedinHasError,
  } = useLinkedIn();

  if (isLoading || isRequesting || isUpdating) {
    return <Loader className="m-auto animate-spin" />;
  }

  if (requestLatestFromLinkedinHasError) {
    toast({
      title: "Error",
      description: getErrorMessage(requestLatestFromLinkedinError),
      variant: "destructive",
    });
  }

  if (!data) {
    return <div>No data found</div>;
  }

  const requestLatestData = () => {
    setShowLinkedInWarning(true);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-5xl mx-auto py-4">
      <LinkedInForm
        data={data}
        onSave={updateData}
        isSaving={isLoading || isUpdating}
        requestLatestData={requestLatestData}
      />
      <Dialog open={showLinkedInWarning} onOpenChange={setShowLinkedInWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Warning</DialogTitle>
            <DialogDescription>
              Fetching the latest data from LinkedIn will overwrite any unsaved
              changes. Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowLinkedInWarning(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowLinkedInWarning(false);
                refetchLatestFromLinkedIn();
              }}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

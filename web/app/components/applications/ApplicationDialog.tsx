import { Application, ApplicationStatus } from "@/lib/types/application";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useUpdateApplicationStatus } from "@/hooks/use-applications";
import { PDFViewer } from "./PDFViewer";
import { DialogDescription } from "@radix-ui/react-dialog";

interface ApplicationDialogProps {
  application: Application | null;
  onClose: () => void;
}

const STATUS_OPTIONS: ApplicationStatus[] = [
  "applied",
  "interviewing",
  "accepted",
  "rejected",
];

export function ApplicationDialog({
  application,
  onClose,
}: ApplicationDialogProps) {
  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatus | null>(null);
  const { mutate: updateStatus, isPending } = useUpdateApplicationStatus();

  if (!application) return null;

  const handleStatusUpdate = () => {
    if (!selectedStatus || selectedStatus === application.applicationStatus)
      return;
    updateStatus(
      { applicationId: application._id, status: selectedStatus },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={!!application} onOpenChange={() => onClose()}>
      <DialogContent className="w-[90vw] max-w-[90%] md:max-w-[80%] lg:max-w-[80%] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{application.job.title}</DialogTitle>
          <DialogDescription>{application.job.companyName}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 flex-1 overflow-hidden">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Application Details</p>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-muted-foreground">Applied on:</span>{" "}
                  {format(application.appliedAt, "MMMM d, yyyy")}
                </p>
                {application.job.url && (
                  <p>
                    <a
                      href={application.job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm hover:underline text-blue-500"
                    >
                      <Link2 className="h-4 w-4" />
                      View Original Job Post
                    </a>
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              <div className="flex items-center gap-2 flex-col">
                <Select
                  value={selectedStatus || application.applicationStatus}
                  onValueChange={(value: ApplicationStatus) =>
                    setSelectedStatus(value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleStatusUpdate}
                  disabled={
                    !selectedStatus ||
                    selectedStatus === application.applicationStatus ||
                    isPending
                  }
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Status
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            {application?.appliedWith?.resume ||
            application?.appliedWith?.coverLetter ? (
              <div className="grid grid-cols-2 gap-4 h-full">
                {application.appliedWith.resume && (
                  <div className="flex flex-col h-full">
                    <p className="text-sm font-medium mb-2">Resume</p>
                    <div className="flex-1 overflow-hidden rounded-md border">
                      <PDFViewer url={application.appliedWith.resume} />
                    </div>
                  </div>
                )}
                {application.appliedWith.coverLetter && (
                  <div className="flex flex-col h-full">
                    <p className="text-sm font-medium mb-2">Cover Letter</p>
                    <div className="flex-1 overflow-hidden rounded-md border">
                      <PDFViewer url={application.appliedWith.coverLetter} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No documents attached</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

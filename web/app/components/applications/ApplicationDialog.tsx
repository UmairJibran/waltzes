import { Application, ApplicationStatus } from "@/lib/types/application";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { Link2, Loader2, ExternalLink, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  useReGenerateApplication,
  useUpdateApplicationStatus,
} from "@/hooks/use-applications";
import { PDFViewer } from "./PDFViewer";
import { DialogDescription } from "@radix-ui/react-dialog";
import { toast } from "@/components/ui/use-toast";

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

export function RecreateButton({
  exists,
  label,
  type,
  applicationId,
}: {
  exists: boolean;
  label: string;
  type: "resume" | "coverLetter";
  applicationId: string;
}) {
  const { mutate: reGenerateApplication, isSuccess } =
    useReGenerateApplication();

  if (isSuccess) {
    toast({
      title: "Recreated successfully",
      description: `Your ${label} has been requested for recreation, please check back in a few minutes.`,
      variant: "default",
    });
  }

  return (
    <>
      <div className="m-0 flex">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  reGenerateApplication({
                    applicationId,
                    documentType: type,
                  });
                }}
                variant="link"
                className="text-blue-500 flex items-start gap-1 text-md"
              >
                {exists ? "Recreate" : "Create"} <RefreshCcw size={12} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Recreation will overwrite the existing {label}. And will incur a
              charge of 1 credit.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}

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
                <div className="flex flex-col h-full">
                  <p className="text-sm font-medium mb-2 flex items-center gap-1">
                    Resume
                  </p>
                  <RecreateButton
                    exists={!!application.appliedWith.resume}
                    label="Resume"
                    type="resume"
                    applicationId={application._id}
                  />
                  {application.appliedWith.resume && (
                    <>
                      <a
                        href={application.appliedWith.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 flex items-center gap-1"
                      >
                        View in new tab <ExternalLink size={12} />
                      </a>
                      <div className="flex-1 overflow-hidden rounded-md border">
                        <PDFViewer url={application.appliedWith.resume} />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-col h-full">
                  <p className="text-sm font-medium mb-2 flex items-center gap-1">
                    Cover Letter
                  </p>
                  <RecreateButton
                    exists={!!application.appliedWith.coverLetter}
                    label="Cover Letter"
                    applicationId={application._id}
                    type="coverLetter"
                  />
                  {application.appliedWith.coverLetter && (
                    <>
                      <a
                        href={application.appliedWith.coverLetter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 flex items-center gap-1"
                      >
                        View in new tab <ExternalLink size={12} />
                      </a>
                      <div className="flex-1 overflow-hidden rounded-md border">
                        <PDFViewer url={application.appliedWith.coverLetter} />
                      </div>
                    </>
                  )}
                </div>
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

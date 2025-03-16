import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, LoaderCircle, CheckCircle, Circle } from 'lucide-react';
import { useGetApplicationStatus } from '@/hooks/use-applications';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';

interface ApplicationProcessingDialogProps {
  applicationId: string;
}
export function ApplicationProcessingDialog({
  applicationId,
}: ApplicationProcessingDialogProps) {
  const router = useRouter();
  const { data: application, isLoading } =
    useGetApplicationStatus(applicationId);

  if (isLoading) return <div>Loading...</div>;

  const getStatusTitle = () => {
    return application?.status.toUpperCase();
  };

  const getStatusDescription = () => {
    switch (application?.status) {
      case 'enqueue':
        return 'Your application has been queued for processing.';
      case 'processing':
        return 'Your application is currently being processed.';
      case 'finished':
        return 'Your application has been processed successfully.';
    }
  };

  const getIconByStatus = () => {
    switch (application?.status) {
      case 'enqueue':
        return <LoaderCircle className="w-4 h-4 animate-spin" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'finished':
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getIconByStepStatus = (stepStatus: string | undefined) => {
    switch (stepStatus) {
      case 'processing':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'done':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={!!application}>
      <DialogContent className="flex flex-col w-auto h-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusTitle()} {getIconByStatus()}
          </DialogTitle>
          <DialogDescription>{getStatusDescription()}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 flex-1 overflow-hidden">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div>{getIconByStepStatus(application?.steps.scraping)}</div>
              <div>Job Details</div>
            </div>
            {application?.steps.resume !== 'skipped' && (
              <div className="flex items-center gap-2">
                <div>{getIconByStepStatus(application?.steps.resume)}</div>
                <div>Resume</div>
              </div>
            )}
            {application?.steps.coverLetter !== 'skipped' && (
              <div className="flex items-center gap-2">
                <div>{getIconByStepStatus(application?.steps.coverLetter)}</div>
                <div>Cover Letter</div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div>{getIconByStepStatus(application?.steps.pdf)}</div>
              <div>PDF</div>
            </div>
          </div>

          {getStatusTitle() === 'FINISHED' && (
            <div className="flex gap-2 justify-around">
              {application?.steps.resume !== 'skipped' && (
                <Button
                  variant="outline"
                  onClick={() => {
                    const resumeUrl = application?.downloadUrls?.resume;
                    if (resumeUrl) {
                      router.push(resumeUrl);
                    }
                  }}
                >
                  Download Resume
                </Button>
              )}
              {application?.steps.coverLetter !== 'skipped' && (
                <Button
                  variant="outline"
                  onClick={() => {
                    const coverLetterUrl =
                      application?.downloadUrls?.coverLetter;
                    if (coverLetterUrl) {
                      router.push(coverLetterUrl);
                    }
                  }}
                >
                  Download Cover Letter
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

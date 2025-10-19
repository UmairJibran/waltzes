"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateDocument } from "@/hooks/use-applications";
import { getErrorMessage } from "@/lib/api-client";

interface DocumentEditorProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
  documentType: "resume" | "coverLetter";
  documentData: Record<string, any> | string;
}

export function DocumentEditor({
  isOpen,
  onClose,
  applicationId,
  documentType,
  documentData,
}: DocumentEditorProps) {
  const [editedData, setEditedData] = useState(
    typeof documentData === "string"
      ? documentData
      : JSON.stringify(documentData, null, 2)
  );
  const { mutateAsync: updateDocument, isPending } = useUpdateDocument();

  const handleSave = async () => {
    try {
      let parsedData: Record<string, any> | string = editedData;

      // Try to parse as JSON if it's a resume (object)
      if (documentType === "resume") {
        try {
          parsedData = JSON.parse(editedData);
        } catch (e) {
          toast({
            title: "Invalid JSON",
            description: "Please enter valid JSON for the resume data.",
            variant: "destructive",
          });
          return;
        }
      }

      await updateDocument({
        applicationId,
        documentType,
        documentData: parsedData,
      });

      toast({
        title: "Document updated",
        description: `Your ${
          documentType === "resume" ? "resume" : "cover letter"
        } has been updated and the PDF is being regenerated.`,
        variant: "default",
      });

      onClose();
    } catch (error) {
      console.error("Error updating document:", error);
      toast({
        title: "Error",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            Edit {documentType === "resume" ? "Resume" : "Cover Letter"}
          </DialogTitle>
          <DialogDescription>
            {documentType === "resume"
              ? "Edit the JSON data for your resume. The PDF will be automatically regenerated."
              : "Edit the text for your cover letter. The PDF will be automatically regenerated."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Textarea
            value={editedData}
            onChange={(e) => setEditedData(e.target.value)}
            className="h-full min-h-[400px] font-mono text-sm"
            placeholder={
              documentType === "resume"
                ? "Enter resume data as JSON..."
                : "Enter cover letter text..."
            }
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

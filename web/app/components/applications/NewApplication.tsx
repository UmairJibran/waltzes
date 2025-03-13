import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { getErrorMessage } from '@/lib/api-client';
import { useGenerateApplication } from '@/hooks/use-applications';
import { ApplicationProcessingDialog } from './ApplicationProcessingDialog';

const newApplySchema = z
  .object({
    jobUrl: z.string().min(1, 'Job URL is required').url('Invalid URL'),
    generateResume: z.boolean(),
    generateCoverLetter: z.boolean(),
  })
  .refine(data => data.generateResume || data.generateCoverLetter, {
    message: 'You must select at least one document to generate',
    path: ['generateResume'],
  });

type NewApplyInput = z.infer<typeof newApplySchema>;

export function NewApplication() {
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewApplyInput>({
    resolver: zodResolver(newApplySchema),
    defaultValues: {
      generateResume: true,
      generateCoverLetter: false,
    },
  });

  const { mutateAsync: generateApplication, isPending: isGenerating } =
    useGenerateApplication();

  const handleApply = async (data: NewApplyInput) => {
    try {
      const response = await generateApplication(data);
      setApplicationId(response);
    } catch (error) {
      toast({
        title: 'Error',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    }
  };

  if (applicationId) {
    return <ApplicationProcessingDialog applicationId={applicationId} />;
  }

  return (
    <>
      <div className="w-full max-w-2xl m-auto">
        <form
          className="w-full space-y-6 p-6 md:p-8"
          onSubmit={handleSubmit(handleApply)}
        >
          <div className="grid gap-3 w-full">
            <Label htmlFor="job-url">Job URL</Label>
            <Input
              id="job-url"
              className="w-full"
              placeholder="https://example.com"
              {...register('jobUrl')}
            />
            {errors.jobUrl && (
              <p className="text-sm text-red-500">{errors.jobUrl.message}</p>
            )}
          </div>
          <div className="flex gap-3 justify-center">
            <div className="flex items-center gap-2">
              <Controller
                control={control}
                name="generateResume"
                render={({ field }) => (
                  <Checkbox
                    id="requires-resume"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="requires-resume">
                Generate Resume (1 credit)
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Controller
                control={control}
                name="generateCoverLetter"
                render={({ field }) => (
                  <Checkbox
                    id="requires-cover-letter"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="requires-cover-letter">
                Generate Cover Letter (1 credit)
              </Label>
            </div>
          </div>
          {errors.generateResume && (
            <p className="text-sm text-red-500 text-center">
              {errors.generateResume.message}
            </p>
          )}

          <small className="text-muted-foreground gap-2 flex flex-col">
            <strong>
              For best results, please provide a job description or job posting
              URL that is publicly available.
            </strong>
          </small>

          <Button type="submit" className="w-full" disabled={isGenerating}>
            {isGenerating ? 'Creating application...' : 'Create Application'}
          </Button>
        </form>
      </div>
    </>
  );
}

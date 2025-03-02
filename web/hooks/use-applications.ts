import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { applicationsApi } from '@/lib/api-client';
import { ApplicationStatus } from '@/lib/types/application';

interface UpdateStatusInput {
  applicationId: string;
  status: ApplicationStatus;
}

export function useApplications(status?: ApplicationStatus) {
  return useQuery({
    queryKey: ['applications', status],
    queryFn: () => (status ? applicationsApi.getByStatus(status) : applicationsApi.getAll()),
  });
}


export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, status }: UpdateStatusInput) =>
      applicationsApi.updateStatus(applicationId, status),
    onSuccess: () => {
      // Invalidate all application queries to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
} 
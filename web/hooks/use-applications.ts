import { useQuery } from '@tanstack/react-query';
import { applicationsApi } from '@/lib/api-client';
import { ApplicationStatus } from '@/lib/types/application';

export function useApplications(status?: ApplicationStatus) {
  return useQuery({
    queryKey: ['applications', status],
    queryFn: () => (status ? applicationsApi.getByStatus(status) : applicationsApi.getAll()),
  });
} 
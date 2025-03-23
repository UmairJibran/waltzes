import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applicationsApi } from "@/lib/api-client";
import {
  ApplicationStatus,
  GenerateApplicationRequest,
} from "@/lib/types/application";

interface UpdateStatusInput {
  applicationId: string;
  status: ApplicationStatus;
}

interface UseApplicationsOptions {
  status?: ApplicationStatus;
  page?: number;
  pageSize?: number;
}

export function useApplications({
  status,
  page = 1,
  pageSize = 50,
}: UseApplicationsOptions = {}) {
  return useQuery({
    queryKey: ["applications", { status, page, pageSize }],
    queryFn: () =>
      status
        ? applicationsApi.getByStatus(status, page, pageSize)
        : applicationsApi.getAll(page, pageSize),
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, status }: UpdateStatusInput) =>
      applicationsApi.updateStatus(applicationId, status),
    onSuccess: () => {
      // Invalidate all application queries to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useGenerateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: GenerateApplicationRequest) => {
      const response = await applicationsApi.generateApplication(data);
      return response.applicationId;
    },
    onSuccess: (applicationId: string) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      return applicationId;
    },
  });
}

export function useGetApplicationStatus(applicationId: string) {
  return useQuery({
    queryKey: ["applicationStatus", { applicationId }],
    queryFn: () => applicationsApi.getApplicationStatus(applicationId),
    refetchInterval: 2000,
  });
}

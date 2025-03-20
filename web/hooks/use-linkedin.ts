"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { linkedinApi } from "@/lib/api-client";
import { LinkedInData } from "@/lib/types/linkedin";

export function useLinkedIn() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["linkedin"],
    queryFn: linkedinApi.getData,
  });

  const { mutate: updateData, isPending: isUpdating } = useMutation({
    mutationFn: (data: LinkedInData) => linkedinApi.updateData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkedin"] });
    },
  });

  const {
    mutate: refetchLatestFromLinkedIn,
    isPending: isRequesting,
    error: requestLatestFromLinkedinError,
    isError: requestLatestFromLinkedinHasError,
  } = useMutation({
    mutationFn: linkedinApi.requestLatestData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkedin"] });
    },
  });

  return {
    data,
    isLoading,
    updateData,
    isUpdating,
    isRequesting,
    refetchLatestFromLinkedIn,
    requestLatestFromLinkedinError,
    requestLatestFromLinkedinHasError,
  };
}

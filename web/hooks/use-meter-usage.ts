import { meterUsageApi } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export function useMeterUsage() {
  const { data, isLoading } = useQuery({
    queryKey: ["meter-usage"],
    queryFn: meterUsageApi.getData,
  });

  return {
    data,
    isFetching: isLoading,
  };
}

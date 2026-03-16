import { useQuery } from "@tanstack/react-query";
import { fetchStatus } from "../api/status";
import { env } from "../env"

export const STATUS_QUERY_KEY = ['status'] as const;

export const useServerStatus = () => {
  return useQuery({
    queryKey: STATUS_QUERY_KEY,
    queryFn: fetchStatus,
    refetchInterval: env.POLL_INTERVAL,
  });
};
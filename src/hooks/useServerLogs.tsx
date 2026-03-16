import { useQuery } from "@tanstack/react-query";
import { fetchServerLogs } from "../api/logs";

export const logQueryKey = (serverName: string) => ["log", serverName] as const;

export const useServerLogs = (serverName: string) => {
  return useQuery({
    queryKey: logQueryKey(serverName ?? ""),
    queryFn: () => fetchServerLogs(serverName!),
    enabled: serverName !== null,
  });
};

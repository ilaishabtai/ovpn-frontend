import type { LogResponse } from "../models/logs";
import { httpClient } from "./client";

export const fetchServerLogs = async (serverName: string): Promise<LogResponse> => {
  const { data } = await httpClient.get(`/logs/${serverName}`);
  return data;
};

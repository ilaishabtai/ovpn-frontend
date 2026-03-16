import type { StatusResponse } from "../models/server";
import { httpClient } from "./client";

export const fetchStatus = async (): Promise<StatusResponse> => {
  const { data } = await httpClient.get<StatusResponse>("/status");
  return data;
};

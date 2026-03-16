import type { Client } from "./client";

export interface Server {
  name: string;
  host: string;
  port: number;
  is_online: boolean;
  clients: Record<string, Client>;
  linked_servers: string[] | null;
}

export type StatusResponse = Record<string, Server>;

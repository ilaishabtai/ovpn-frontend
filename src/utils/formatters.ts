import type { Server } from "../models/server";
import type { Client } from "../models/client";

export function flattenClients(
  servers: Record<string, Server>,
): Array<Client & { serverName: string }> {
  return Object.values(servers).flatMap((server) =>
    Object.values(server.clients).map((client) => ({
      ...client,
      serverName: server.name,
    })),
  );
}

export function totalUpload(server: Server): number {
  return Object.values(server.clients).reduce(
    (acc, c) => acc + Number(c.upload_mbps),
    0,
  );
}

export function totalDownload(server: Server): number {
  return Object.values(server.clients).reduce(
    (acc, c) => acc + Number(c.download_mbps),
    0,
  );
}

export function connectionDuration(connectedSince: string | null): string {
  if (!connectedSince) return "—";
  const start = new Date(connectedSince).getTime();
  const diffMs = Date.now() - start;
  if (isNaN(diffMs) || diffMs < 0) return "—";

  const totalSec = Math.floor(diffMs / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function countOnlineServers(servers: Record<string, Server>): {
  online: number;
  total: number;
} {
  const all = Object.values(servers);
  return { online: all.filter((s) => s.is_online).length, total: all.length };
}

export function countActiveClients(servers: Record<string, Server>): {
  active: number;
  total: number;
} {
  const all = flattenClients(servers);
  return {
    active: all.filter((c) => c.state === "active").length,
    total: all.length,
  };
}

import type { Server } from '../models/server';
import type { Client } from '../models/client';
/** Extract all clients across all servers as a flat list with their server name attached */
export function flattenClients(
  servers: Record<string, Server>
): Array<Client & { serverName: string }> {
  return Object.values(servers).flatMap((server) =>
    Object.values(server.clients).map((client) => ({
      ...client,
      serverName: server.name,
    }))
  );
}

/** Sum upload_mbps of all clients of a server */
export function totalUpload(server: Server): number {
  return Object.values(server.clients).reduce((acc, c) => acc + Number(c.upload_mbps), 0);
}

/** Sum download_mbps of all clients of a server */
export function totalDownload(server: Server): number {
  return Object.values(server.clients).reduce((acc, c) => acc + Number(c.download_mbps), 0);
}

/** Format bytes to a human-readable string */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

/** Format an ISO / datetime string to a readable time */
export function formatDateTime(dt: string | null): string {
  if (!dt) return '—';
  return new Date(dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

/** Calculate connection duration from connected_since string */
export function connectionDuration(connectedSince: string | null): string {
  if (!connectedSince) return '—';
  const start = new Date(connectedSince).getTime();
  const diffMs = Date.now() - start;
  if (isNaN(diffMs) || diffMs < 0) return '—';

  const totalSec = Math.floor(diffMs / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

/** Count online servers */
export function countOnlineServers(servers: Record<string, Server>): { online: number; total: number } {
  const all = Object.values(servers);
  return { online: all.filter((s) => s.is_online).length, total: all.length };
}

/** Count active clients across all servers */
export function countActiveClients(servers: Record<string, Server>): { active: number; total: number } {
  const all = flattenClients(servers);
  return { active: all.filter((c) => c.state === 'active').length, total: all.length };
}

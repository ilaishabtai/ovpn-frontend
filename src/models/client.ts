export type ClientState = "active" | "inactive" | "pending";

export interface Client {
  name: string;
  state: ClientState;
  real_ip: string | null;
  virtual_ip: string | null;
  bytes_in: number;
  bytes_out: number;
  upload_mbps: number;
  download_mbps: number;
  connected_since: string | null;
  last_poll: number;
}

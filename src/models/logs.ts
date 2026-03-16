export interface LogLine {
  timestamp: string;
  message: string;
}

export interface LogResponse {
  server_name: string;
  lines: LogLine[];
}

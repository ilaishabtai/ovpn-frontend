import { TableRow, TableCell, Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { StatusLight } from "../common/StatusLight";
import { connectionDuration } from "../../utils/formatters";
import type { Client } from "../../models/client";

interface Props {
  client: Client;
  showServer?: boolean;
  serverName?: string;
}

export function ClientRow({ client, showServer, serverName }: Props) {
  return (
    <TableRow hover sx={{ "&:last-child td": { border: 0 } }}>
      <TableCell sx={{ py: 2 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, marginLeft: 4 }}
        >
          <StatusLight status={client.state} />
        </Box>
      </TableCell>

      <TableCell sx={{ py: 0.75 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" fontWeight={400} fontSize={14}>
            {client.name}
          </Typography>
        </Box>
      </TableCell>

      {showServer && (
        <TableCell sx={{ py: 0.75 }}>
          <Typography variant="body2" color="text.secondary" fontSize={14}>
            {serverName}
          </Typography>
        </TableCell>
      )}

      <TableCell sx={{ py: 0.75 }}>
        <Typography
          variant="body2"
          fontFamily="monospace"
          color="primary.main"
          fontSize={14}
        >
          {client.virtual_ip ?? "—"}
        </Typography>
      </TableCell>

      <TableCell sx={{ py: 0.75 }}>
        <Typography
          variant="body2"
          fontFamily="monospace"
          color="text.secondary"
          fontSize={14}
        >
          {client.real_ip ?? "—"}
        </Typography>
      </TableCell>

      <TableCell sx={{ py: 0.75 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ArrowUpwardIcon sx={{ fontSize: 16, color: "#38bdf8" }} />
          <Typography variant="body2">
            {Number(client.upload_mbps).toFixed(2)}
          </Typography>
        </Box>
      </TableCell>

      <TableCell sx={{ py: 0.75 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ArrowDownwardIcon sx={{ fontSize: 16, color: "#38bdf8" }} />
          <Typography variant="body2">
            {Number(client.download_mbps).toFixed(2)}
          </Typography>
        </Box>
      </TableCell>

      <TableCell sx={{ py: 0.75 }}>
        <Typography variant="body2" color="text.secondary">
          {connectionDuration(client.connected_since)}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

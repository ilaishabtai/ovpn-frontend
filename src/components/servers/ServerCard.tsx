import { Paper, Typography, Box, Divider } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { StatusLight } from "../common/StatusLight";
import { totalUpload, totalDownload } from "../../utils/formatters";
import type { Server } from "../../models/server";

interface Props {
  server: Server;
}

export function ServerCard({ server }: Props) {
  const clientCount = Object.keys(server.clients).length;
  const up = totalUpload(server).toFixed(2);
  const down = totalDownload(server).toFixed(2);

  return (
    <Paper
      sx={{
        p: 2.5,
        minWidth: 400,
        maxWidth: 380,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        borderTop: `3px solid ${server.is_online ? "#00ff5e" : "#ff002b"}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{ minWidth: 0, marginRight: 18 }}>
          <Typography fontSize={24} fontWeight={600} noWrap>
            {server.name}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontSize: 14,
            }}
          >
            {server.host} : {server.port}
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          title="Clients"
        >
          <StatusLight status={server.is_online} size={15} />
        </Box>
      </Box>

      <Divider />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ArrowUpwardIcon sx={{ fontSize: 20, color: "#38bdf8" }} />
          <Typography variant="caption" color="text.secondary" fontSize={12}>
            <Box
              component="span"
              fontWeight={400}
              color="text.primary"
              fontSize={15}
            >
              {up}
            </Box>{" "}
            Mbps
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ArrowDownwardIcon sx={{ fontSize: 20, color: "#38bdf8" }} />
          <Typography variant="caption" color="text.secondary" fontSize={12}>
            <Box
              component="span"
              fontWeight={400}
              color="text.primary"
              fontSize={15}
            >
              {down}
            </Box>{" "}
            Mbps
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              marginLeft: 8,
            }}
            title="Clients"
          >
            <PeopleIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary" fontSize={14}>
              {clientCount} client{clientCount !== 1 ? "s" : ""}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

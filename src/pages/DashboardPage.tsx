import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import DnsIcon from "@mui/icons-material/Dns";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { PageError } from "../components/page_mode/PageError";
import { PageLoading } from "../components/page_mode/PageLoading";
import { useServerStatus } from "../hooks/UseServerStatus";
import { StatCard } from "../components/common/StatCard";
import { ServerCardsRow } from "../components/servers/ServerCardsRow";
import { ClientsTable } from "../components/clients/ClientsTable";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  countActiveClients,
  countOnlineServers,
  flattenClients,
} from "../utils/formatters";

export const DashboardPage = () => {
  const { data, isLoading, isError } = useServerStatus();

  const allClients = useMemo(() => (data ? flattenClients(data) : []), [data]);

  const lastPollDisplay = useMemo(() => {
    if (!data) return "—";
    const latest = Object.values(data)
      .flatMap((s) => Object.values(s.clients))
      .reduce<number | null>(
        (max, c) => (c.last_poll > (max ?? 0) ? c.last_poll : max),
        null,
      );
    return latest ? new Date(latest * 1000).toLocaleTimeString() : "—";
  }, [data]);

  if (isLoading) return <PageLoading />;
  if (isError || !data) return <PageError />;
  const servers = Object.values(data);
  const { online: onlineServers, total: totalServers } =
    countOnlineServers(data);
  const { active: activeClients, total: totalClients } =
    countActiveClients(data);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <DashboardIcon sx={{ fontSize: 25 }} />
        <Typography variant="h5" fontWeight={700}>
          Dashboard
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <StatCard
          label="Last Poll"
          value={lastPollDisplay}
          icon={<AccessTimeIcon />}
          color="#3895ff"
        />
        <StatCard
          label="Online Servers"
          value={`${onlineServers} / ${totalServers}`}
          icon={<DnsIcon />}
          color="#3895ff"
        />
        <StatCard
          label="Active Clients"
          value={`${activeClients} / ${totalClients}`}
          icon={<PeopleIcon />}
          color="#3895ff"
        />
      </Box>

      <Box>
        <Box sx={{ mt: 1 }}>
          <ServerCardsRow servers={servers} />
        </Box>
      </Box>

      <Box>
        <Box sx={{ mt: 1 }}>
          <ClientsTable clients={allClients} maxHeight={475} />
        </Box>
      </Box>
    </Box>
  );
};

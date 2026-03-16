import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useServerStatus } from "../hooks/UseServerStatus";
import { PageError } from "../components/page_mode/PageError";
import { PageLoading } from "../components/page_mode/PageLoading";
import { ClientsTable } from "../components/clients/ClientsTable";
import { flattenClients } from "../utils/formatters";
import type { ClientState } from "../models/client";
import { People } from "@mui/icons-material";

type BandwidthFilter =
  | "none"
  | "upload_asc"
  | "upload_desc"
  | "download_asc"
  | "download_desc";

export function ClientsPage() {
  const { data, isLoading, isError } = useServerStatus();

  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState<ClientState | "ALL">("ALL");
  const [bwFilter, setBwFilter] = useState<BandwidthFilter>("none");

  const allClients = useMemo(() => (data ? flattenClients(data) : []), [data]);

  const filtered = useMemo(() => {
    let list = allClients;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }

    if (stateFilter !== "ALL") {
      list = list.filter((c) => c.state === stateFilter);
    }

    if (bwFilter !== "none") {
      list = [...list].sort((a, b) => {
        if (bwFilter === "upload_asc")
          return Number(a.upload_mbps) - Number(b.upload_mbps);
        if (bwFilter === "upload_desc")
          return Number(b.upload_mbps) - Number(a.upload_mbps);
        if (bwFilter === "download_asc")
          return Number(a.download_mbps) - Number(b.download_mbps);
        if (bwFilter === "download_desc")
          return Number(b.download_mbps) - Number(a.download_mbps);
        return 0;
      });
    }

    return list;
  }, [allClients, search, stateFilter, bwFilter]);

  if (isLoading) return <PageLoading />;
  if (isError || !data) return <PageError />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <People sx={{ fontSize: 25 }} />
        <Typography variant="h5" fontWeight={700}>
          Clients
        </Typography>
      </Box>

      <Stack direction="row" gap={2} flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Search by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 220 }}
        />

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={stateFilter}
            label="Status"
            onChange={(e) =>
              setStateFilter(e.target.value as ClientState | "ALL")
            }
          >
            <MenuItem value="ALL">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Sort by Bandwidth</InputLabel>
          <Select
            value={bwFilter}
            label="Sort by Bandwidth"
            onChange={(e) => setBwFilter(e.target.value as BandwidthFilter)}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="upload_desc">Upload ↓ High first</MenuItem>
            <MenuItem value="upload_asc">Upload ↑ Low first</MenuItem>
            <MenuItem value="download_desc">Download ↓ High first</MenuItem>
            <MenuItem value="download_asc">Download ↑ Low first</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <ClientsTable clients={filtered} maxHeight="calc(100vh - 280px)" />
    </Box>
  );
}

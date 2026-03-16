import { Box } from "@mui/material";
import { ServerCard } from "./ServerCard";
import type { Server } from "../../models/server";

interface Props {
  servers: Server[];
}

export function ServerCardsRow({ servers }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        pb: 1,
        "&::-webkit-scrollbar": { height: 4 },
        "&::-webkit-scrollbar-track": { background: "transparent" },
        "&::-webkit-scrollbar-thumb": {
          background: "rgb(90, 90, 90)",
          borderRadius: 5,
        },
      }}
    >
      {servers.map((server) => (
        <ServerCard key={server.name} server={server} />
      ))}
    </Box>
  );
}

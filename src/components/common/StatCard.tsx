import { Paper, Typography, Box } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  label: string;
  value: string;
  icon: ReactNode;
  color?: string;
}

export function StatCard({ label, value, icon, color = "#3895ff" }: Props) {
  return (
    <Paper
      sx={{
        minWidth: 538,
        maxWidth: 680,
        p: 2,
        display: "flex",
        alignItems: "ledt",
        gap: 2,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <Box
        sx={{
          color: color,
          display: "flex",
          marginTop: 3,
          "& svg": { fontSize: 30 },
        }}
      >
        {icon}
      </Box>
      <Box>
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
          {label}
        </Typography>
        <Typography fontSize={30} fontWeight={700} color="text.primary">
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}

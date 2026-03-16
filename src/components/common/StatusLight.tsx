import { Box, keyframes } from "@mui/material";
import type { ClientState } from "../../models/client";

const pulseAnim = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(1.5); }
`;

interface Props {
  status: boolean | ClientState;
  size?: number;
}

function resolveColor(status: boolean | ClientState): string {
  if (typeof status === "boolean") return status ? "#22c55e" : "#ef4444";
  switch (status) {
    case "active":
      return "#22c55e";
    case "pending":
      return "#f59e0b";
    case "inactive":
      return "#ef4444";
  }
}

export function StatusLight({ status, size = 10 }: Props) {
  const color = resolveColor(status);

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}`,
        animation: `${pulseAnim} 4s ease-in-out infinite`,
      }}
    />
  );
}

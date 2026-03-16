import { Box, Typography, CircularProgress } from "@mui/material";
import type { LogLine } from "../../models/logs";

interface Props {
  serverName: string;
  lines: LogLine[];
  isLoading: boolean;
  isError: boolean;
}

export function LogTerminal({ serverName, lines, isLoading, isError }: Props) {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(27, 20, 27)",
        border: "1.5px solid rgba(255, 255, 255, 0.15)",
        borderRadius: 1,
        overflow: "hidden",
        fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1,
          backgroundColor: "rgb(34, 34, 34)",
        }}
      >
        {["#ff453b", "#ffbd2e", "#28ca41"].map((c) => (
          <Box
            key={c}
            sx={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              backgroundColor: c,
            }}
          />
        ))}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ ml: 1.5, fontFamily: "inherit", color: "#c4c4c4" }}
        >
          /var/log/openvpn/{serverName} — last 50 lines
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          minHeight: 300,
          maxHeight: 520,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 0, 0, 0.1)",
            borderRadius: 2,
          },
        }}
      >
        {isLoading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <CircularProgress size={14} />
            <Typography
              variant="caption"
              color="text.secondary"
              fontFamily="inherit"
            >
              Fetching logs…
            </Typography>
          </Box>
        )}

        {isError && (
          <Typography variant="caption" color="error.main" fontFamily="inherit">
            Failed to fetch logs for {serverName}
          </Typography>
        )}

        {!isLoading &&
          !isError &&
          lines.map((line, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                gap: 1.5,
                mb: 0.5,
                lineHeight: 1.7,
                fontSize: 12,
              }}
            >
              <Typography
                component="span"
                sx={{
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: "inherit",
                  fontSize: 11,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {line.timestamp}
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontFamily: "inherit",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#e2e8f0",
                  flexShrink: 0,
                  width: 46,
                }}
              >
                [{"d"}]
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontFamily: "inherit",
                  fontSize: 11,
                  color: "rgba(226,232,240,0.8)",
                  wordBreak: "break-word",
                }}
              >
                {line.message}
              </Typography>
            </Box>
          ))}

        {!isLoading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Typography
              component="span"
              sx={{ color: "#cacaca", fontFamily: "inherit", fontSize: 12 }}
            >
              user@ubuntu-badger:/ $
            </Typography>
            <Box
              sx={{
                width: 8,
                height: 14,
                backgroundColor: "#cacaca",
                animation: "blink 1s step-start infinite",
                "@keyframes blink": {
                  "0%,100%": { opacity: 1 },
                  "50%": { opacity: 0 },
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export function PageError({ message }: { message?: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        gap: 1.5,
        color: "error.main",
      }}
    >
      <ErrorOutlineIcon style={{ fontSize: 30, color: "#ff002b" }} />
      <Typography fontSize={25} color="#ff002b">
        {message ?? "Something went wrong"}
      </Typography>
    </Box>
  );
}

import { Box, CircularProgress } from "@mui/material";

export function PageLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <CircularProgress style={{ fontSize: 100, color: "#ff002b" }} />
    </Box>
  );
}

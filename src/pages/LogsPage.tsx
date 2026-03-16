import { useState } from 'react';
import {
  Box, Typography, ToggleButton, ToggleButtonGroup,
  Button, Stack,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useServerStatus } from '../hooks/UseServerStatus';
import { useServerLogs } from '../hooks/useServerLogs';
import { PageError } from '../components/page_mode/PageError';
import { PageLoading } from '../components/page_mode/PageLoading';
import { LogTerminal } from '../components/logs/LogTerminal';
import { StatusLight } from '../components/common/StatusLight';
import { Terminal } from '@mui/icons-material';

export function LogsPage() {
  const { data: statusData, isLoading, isError } = useServerStatus();
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  const {
    data: logData,
    isFetching: logFetching,
    isError: logError,
    refetch,
  } = useServerLogs(selectedServer);

  if (isLoading) return <PageLoading />;
  if (isError || !statusData) return <PageError />;

  const servers = Object.values(statusData);

  const handleServerChange = (_: React.MouseEvent, value: string | null) => {
    if (value !== null) setSelectedServer(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Terminal sx={{ fontSize: 25 }} />
        <Typography variant="h5" fontWeight={700}>
          Logs
        </Typography>
      </Box>


      {/* Server selector */}
      <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap">
        <ToggleButtonGroup
          value={selectedServer}
          exclusive
          onChange={handleServerChange}
          size="small"
          sx={{
            flexWrap: 'wrap',
            gap: 0.5,
            '& .MuiToggleButton-root': {
              borderRadius: '8px !important',
              border: '1px solid rgba(255,255,255,0.1) !important',
              px: 2,
              py: 0.75,
              textTransform: 'none',
              fontSize: 13,
              '&.Mui-selected': {
                backgroundColor: 'rgba(56,189,248,0.12)',
                color: 'primary.main',
                borderColor: 'rgba(56,189,248,0.35) !important',
              },
            },
          }}
        >
          {servers.map((server) => (
            <ToggleButton key={server.name} value={server.name}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StatusLight status={server.is_online} size={7} />
                {server.name}
              </Box>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {selectedServer && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<RefreshIcon fontSize="small" />}
            onClick={() => refetch()}
            disabled={logFetching}
          >
            Refresh
          </Button>
        )}
      </Stack>

      {/* Terminal */}
      {!selectedServer ? (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: 2,
            color: 'text.secondary',
          }}
        >
          <Typography>Select a server above to view its logs</Typography>
        </Box>
      ) : (
        <LogTerminal
          serverName={selectedServer}
          lines={logData?.lines ?? []}
          isLoading={logFetching}
          isError={logError}
        />
      )}
    </Box>
  );
}

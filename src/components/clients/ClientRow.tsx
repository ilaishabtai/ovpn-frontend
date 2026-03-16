import { TableRow, TableCell, Box, Typography, Chip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { StatusLight } from '../common/StatusLight';
import { connectionDuration } from '../../utils/formatters';
import type { Client } from '../../models/client';

const STATE_CHIP: Record<string, { label: string; color: 'success' | 'warning' | 'default' }> = {
  ACTIVE:   { label: 'Active',   color: 'success' },
  PENDING:  { label: 'Pending',  color: 'warning' },
  INACTIVE: { label: 'Inactive', color: 'default' },
};

interface Props {
  client: Client;
  showServer?: boolean;
  serverName?: string;
}

export function ClientRow({ client, showServer, serverName }: Props) {
  const chip = STATE_CHIP[client.state] ?? STATE_CHIP.INACTIVE;

  return (
    <TableRow
      hover
      sx={{ '&:last-child td': { border: 0 } }}
    >
      {/* Name + light */}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StatusLight status={client.state} />
          <Typography variant="body2" fontWeight={600}>{client.name}</Typography>
        </Box>
      </TableCell>

      {showServer && (
        <TableCell>
          <Typography variant="body2" color="text.secondary">{serverName}</Typography>
        </TableCell>
      )}

      <TableCell>
        <Typography variant="body2" fontFamily="monospace" color="primary.main">
          {client.virtual_ip ?? '—'}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {client.real_ip ?? '—'}
        </Typography>
      </TableCell>

      {/* <TableCell>
        <Chip
          label={chip.label}
          color={chip.color}
          size="small"
          variant="outlined"
        />
      </TableCell> */}

      {/* Upload */}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowUpwardIcon sx={{ fontSize: 12, color: '#22c55e' }} />
          <Typography variant="body2">{Number(client.upload_mbps).toFixed(2)}</Typography>
        </Box>
      </TableCell>

      {/* Download */}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowDownwardIcon sx={{ fontSize: 12, color: '#38bdf8' }} />
          <Typography variant="body2">{Number(client.download_mbps).toFixed(2)}</Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {connectionDuration(client.connected_since)}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

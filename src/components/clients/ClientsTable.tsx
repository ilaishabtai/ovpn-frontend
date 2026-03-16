// import {
//   Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, Typography, Box,
// } from '@mui/material';
// import { ClientRow } from './ClientRow';
// import type { Server } from '../../models/server';
// import type { Client } from '../../models/client';

// interface FlatClient extends Client {
//   serverName: string;
// }

// interface Props {
//   /** Grouped mode: receives servers and renders a divider row per server */
//   servers?: Server[];
//   /** Flat mode: receives a flat pre-filtered list + shows server column */
//   clients?: FlatClient[];
//   maxHeight?: number | string;
// }

// // Change the column arrays - empty string for State header
// const COLUMNS_GROUPED = ['', 'Client', 'Virtual IP', 'Real IP', '↑ Upload', '↓ Download (mbps)', 'Duration'];
// const COLUMNS_FLAT    = ['', 'Client', 'Server', 'Virtual IP', 'Real IP', '↑ Upload', '↓ Download (mbps)', 'Duration'];

// function ServerGroupRow({ serverName }: { serverName: string }) {
//   return (
//     <TableRow sx={{ backgroundColor: 'rgba(56,189,248,0.04)' }}>
//       <TableCell colSpan={9} sx={{ py: 0.75, borderBottom: '1px solid rgba(56,189,248,0.15)' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Box sx={{ width: 3, height: 14, borderRadius: 1, backgroundColor: 'primary.main' }} />
//           <Typography variant="caption" fontWeight={700} color="primary.main" letterSpacing="0.08em">
//             {serverName.toUpperCase()}
//           </Typography>
//         </Box>
//       </TableCell>
//     </TableRow>
//   );
// }

// export function ClientsTable({ servers, clients, maxHeight = 340 }: Props) {
//   const isGrouped = Boolean(servers);
//   const columns = isGrouped ? COLUMNS_GROUPED : COLUMNS_FLAT;

//   return (
//     <TableContainer
//       component={Paper}
//       sx={{ maxHeight, '&::-webkit-scrollbar': { width: 4 }, '&::-webkit-scrollbar-thumb': { background: 'rgb(90, 90, 90)', borderRadius: 2 } }}
//     >
//       <Table stickyHeader size="small">
//         <TableHead>
//           <TableRow>
//             {columns.map((col) => (
//               <TableCell key={col}>{col}</TableCell>
//             ))}
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {isGrouped && servers!.map((server) => {
//             const activeClients = Object.values(server.clients).filter((c) => c.state === 'active');
//             if (activeClients.length === 0) return null;
//             return (
//               <Box component="tbody" key={server.name} sx={{ display: 'contents' }}>
//                 <ServerGroupRow serverName={server.name} /> 
//                 {activeClients.map((client) => (
//                   <ClientRow key={client.name} client={client} />
//                 ))}
//               </Box>
//             );
//           })}

//           {!isGrouped && clients!.map((client) => (
//             <ClientRow
//               key={`${client.serverName}-${client.name}`}
//               client={client}
//               showServer
//               serverName={client.serverName}
//             />
//           ))}

//           {isGrouped && servers!.every((s) => Object.values(s.clients).every((c) => c.state !== 'active')) && (
//             <TableRow>
//               <TableCell colSpan={7} align="center" sx={{ py: 4, color: 'text.secondary' }}>
//                 No active clients
//               </TableCell>
//             </TableRow>
//           )}
//           {!isGrouped && clients!.length === 0 && (
//             <TableRow>
//               <TableCell colSpan={8} align="center" sx={{ py: 4, color: 'text.secondary' }}>
//                 No clients match your filters
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box,
} from '@mui/material';
import { ClientRow } from './ClientRow';
import type { Server } from '../../models/server';
import type { Client } from '../../models/client';

interface FlatClient extends Client {
  serverName: string;
}

interface Props {
  servers?: Server[];
  clients?: FlatClient[];
  maxHeight?: number | string;
}

const COLUMNS_GROUPED = ['', 'Name', 'Virtual IP', 'Real IP', 'Upload (mbps)', 'Download (mbps)', 'Duration'];
const COLUMNS_FLAT    = ['', 'Name', 'Server', 'Virtual IP', 'Real IP', 'Upload (mbps)', 'Download (mbps)', 'Duration'];

function ServerGroupRow({ serverName }: { serverName: string }) {
  return (
    <TableRow sx={{ backgroundColor: 'rgba(56,189,248,0.04)' }}>
      <TableCell colSpan={9} sx={{ py: 0.75, borderBottom: '1px solid rgba(56,189,248,0.15)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 3, height: 14, borderRadius: 1, backgroundColor: 'primary.main' }} />
          <Typography variant="caption" fontWeight={700} color="primary.main" letterSpacing="0.08em">
            {serverName.toUpperCase()}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export function ClientsTable({ servers, clients, maxHeight = 340 }: Props) {
  const isGrouped = Boolean(servers);
  const columns = isGrouped ? COLUMNS_GROUPED : COLUMNS_FLAT;

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight,
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { background: 'rgb(90, 90, 90)', borderRadius: 2 },
      }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col} sx={{ py: 1.25, fontWeight: 700 }}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {isGrouped && servers!.map((server) => {
            const activeClients = Object.values(server.clients).filter((c) => c.state === 'active');
            if (activeClients.length === 0) return null;
            return (
              <Box component="tbody" key={server.name} sx={{ display: 'contents' }}>
                <ServerGroupRow serverName={server.name} />
                {activeClients.map((client) => (
                  <ClientRow key={client.name} client={client} />
                ))}
              </Box>
            );
          })}

          {!isGrouped && clients!.map((client) => (
            <ClientRow
              key={`${client.serverName}-${client.name}`}
              client={client}
              showServer
              serverName={client.serverName}
            />
          ))}

          {isGrouped && servers!.every((s) => Object.values(s.clients).every((c) => c.state !== 'active')) && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                No active clients
              </TableCell>
            </TableRow>
          )}
          {!isGrouped && clients!.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                No clients match your filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

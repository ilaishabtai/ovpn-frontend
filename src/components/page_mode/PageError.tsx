import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function PageError({ message }: { message?: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', gap: 1.5, color: 'error.main' }}>
      <ErrorOutlineIcon style={{ fontSize: 30 , color: '#ff002b'}} />
      <Typography fontSize={25} color='#ff002b'>{message ?? 'Something went wrong'}</Typography>
    </Box>
  );
}

    // <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh', gap: 2, color: 'error.main' }}>
    //   {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
    //     <ErrorOutlineIcon style={{ fontSize: 30, color: '#ff002b' }} />
    //     <Typography fontSize={25} color='#ff002b'>{message ?? 'Something went wrong'}</Typography>
    //   </Box> */}
    //           <Typography fontSize={25} color='#ff002b'>{message ?? 'Something went wrong'}</Typography>
    //           <Button
    //       variant="contained"
    //       startIcon={<RefreshIcon sx={{ fontSize: '16px !important' }} />}
    //       onClick={() => window.location.reload()}
    //       sx={{
    //         background: 'linear-gradient(135deg, #ff002b 0%, #ff002b 100%)',
    //         color: '#fff',
    //         fontSize: '13px',
    //         fontWeight: 600,
    //         textTransform: 'none',
    //         borderRadius: '10px',
    //         px: 2.5,
    //         py: 1,
    //         letterSpacing: '0.01em',
    //         boxShadow: '0 4px 16px rgba(255, 71, 87, 0.35)',
    //         border: '1px solid rgba(255,255,255,0.1)',
    //         transition: 'all 0.2s ease',
    //         '&:hover': {
    //           background: 'linear-gradient(135deg, #ff6b7a 0%, #e74c3c 100%)',
    //           boxShadow: '0 6px 20px rgba(255, 71, 87, 0.5)',
    //           transform: 'translateY(-1px)',
    //         },  
    //         '&:active': {
    //           transform: 'translateY(0)',
    //         },
    //       }}
    //     >
    //       Try Again
    //     </Button>
    //   <Button
    //     variant="outlined"
    //     color="error"
    //     startIcon={<RefreshIcon />}
    //     onClick={() => window.location.reload()}
    //   >
    //     Try again
    //   </Button>
    // </Box>
//   );
// }

            // <Button
            //   variant="contained"
            //   startIcon={<RefreshIcon sx={{ fontSize: '16px !important' }} />}
            //   onClick={() => window.location.reload()}
            //   sx={{
            //     background: 'linear-gradient(135deg, #ff4757 0%, #c0392b 100%)',
            //     color: '#fff',
            //     fontSize: '13px',
            //     fontWeight: 600,
            //     textTransform: 'none',
            //     borderRadius: '10px',
            //     px: 2.5,
            //     py: 1,
            //     letterSpacing: '0.01em',
            //     boxShadow: '0 4px 16px rgba(255, 71, 87, 0.35)',
            //     border: '1px solid rgba(255,255,255,0.1)',
            //     transition: 'all 0.2s ease',
            //     '&:hover': {
            //       background: 'linear-gradient(135deg, #ff6b7a 0%, #e74c3c 100%)',
            //       boxShadow: '0 6px 20px rgba(255, 71, 87, 0.5)',
            //       transform: 'translateY(-1px)',
            //     },
            //     '&:active': {
            //       transform: 'translateY(0)',
            //     },
            //   }}
            // >
            //   Try Again
            // </Button>

// <Box sx={{ p: '28px 32px 32px' }}>
//           {/* Icon + Title row */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
//             <Box sx={{
//               width: 36,
//               height: 36,
//               borderRadius: '10px',
//               background: 'rgba(255, 71, 87, 0.15)',
//               border: '1px solid rgba(255, 71, 87, 0.3)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               flexShrink: 0,
//             }}>
//               <ErrorOutlineIcon sx={{ fontSize: 20, color: '#ff4757' }} />
//             </Box>
//             <Typography sx={{
//               fontSize: '16px',
//               fontWeight: 600,
//               color: '#ffffff',
//               letterSpacing: '-0.01em',
//             }}>
//               Something went wrong
//             </Typography>
//           </Box>

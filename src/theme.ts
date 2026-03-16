import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#181818',
      paper: '#201f1f',
    },
    primary: {
      main: '#cfcfcf', // sky-400
    },
    success: {
      main: '#09eb5c',
    },
    error: {
      main: 'rgb(255, 45, 45)',
    },
    warning: {
      main: '#f59e0b',
    },
    divider: 'rgba(255,255,255,0.07)',
    text: {
      primary: '#e2e8f0',
      secondary: '#646c77',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    fontSize: 13,
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(255,255,255,0.07)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255,255,255,0.06)',
          padding: '10px 16px',
        },
        head: {
          color: '#64748b',
          fontWeight: 600,
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontSize: 11 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { fontSize: 13 },
      },
    },
  },
});

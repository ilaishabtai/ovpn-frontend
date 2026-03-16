import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TerminalIcon from "@mui/icons-material/Terminal";
import ShieldIcon from "@mui/icons-material/Shield";
import { People } from "@mui/icons-material";

const DRAWER_WIDTH = 220;

const NAV_ITEMS = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon fontSize="small" /> },
  { label: "Clients", path: "/clients", icon: <People fontSize="small" /> },
  { label: "Logs", path: "/logs", icon: <TerminalIcon fontSize="small" /> },
];

interface Props {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            backgroundColor: "background.paper",
            borderRight: "1px solid rgba(255,255,255,0.07)",
          },
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              backgroundColor: "rgba(56,189,248,0.1)",
              border: "1px solid rgba(56,189,248,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldIcon sx={{ fontSize: 24, color: "primary.main" }} />
          </Box>
          <Box>
            <Typography
              variant="body2"
              fontWeight={800}
              color="primary.main"
              letterSpacing="0.08em"
            >
              OVPN Monitor
            </Typography>
          </Box>
        </Box>

        <Divider />

        <List sx={{ px: 1, pt: 1 }}>
          {NAV_ITEMS.map(({ label, path, icon }) => {
            const active = pathname === path;
            return (
              <ListItemButton
                key={path}
                component={Link}
                to={path}
                selected={active}
                sx={{
                  borderRadius: 2.5,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(212, 212, 212, 0.1)",
                    "& .MuiListItemIcon-root": { color: "primary.main" },
                    "& .MuiListItemText-primary": {
                      color: "primary.main",
                      fontWeight: 700,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 26,
                    color: active ? "primary.main" : "text.secondary",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>

      <Box component="main" sx={{ flex: 1, overflow: "auto", p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

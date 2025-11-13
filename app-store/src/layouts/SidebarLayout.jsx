import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Tooltip,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AppsIcon from "@mui/icons-material/Apps";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useLayout } from "../providers/LayoutContext";

const drawerWidth = 260;
const collapsedWidth = 80;

export default function SidebarLayout() {
  const { isSidebarOpen, toggleSidebar, themeMode, toggleTheme } = useLayout();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Apps", icon: <AppsIcon />, path: "/apps" },
    { text: "Stats", icon: <BarChartIcon />, path: "/stats" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    { text: "Profile", icon: <AccountCircle />, path: "/profile" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* 🔹 AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: isDark
            ? "linear-gradient(90deg,#021f1f,#0a6c6c)"
            : "linear-gradient(90deg,#053735,#0e4b48)",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              noWrap
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                fontWeight: 600,
                "&:hover": { opacity: 0.8 },
              }}
            >
              App Store
            </Typography>
          </Box>

          <IconButton color="inherit" onClick={toggleTheme}>
            {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 🔹 Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          position: "fixed",
          height: "100vh",
          width: isSidebarOpen ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: "width 0.3s ease",
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            height: "100vh",
            backgroundColor: isDark ? "#1a1a1a" : "#f9fafb",
            color: isDark ? "#e0e0e0" : "#111",
            overflowX: "hidden",
            transition: "width 0.3s ease, background-color 0.3s ease",
            borderRight: isDark ? "1px solid #333" : "1px solid #e0e0e0",
          },
        }}
      >
        <Toolbar />
        <List sx={{ mt: 2 }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Tooltip
                key={item.text}
                title={!isSidebarOpen ? item.text : ""}
                placement="right"
                arrow
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    mb: 0.5,
                    backgroundColor: active
                      ? isDark
                        ? "rgba(10,158,168,0.25)"
                        : "#0a9ea820"
                      : "transparent",
                    color: active
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: isDark
                        ? "rgba(10,158,168,0.15)"
                        : "#0a9ea810",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: active
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                      minWidth: 40,
                      justifyContent: "center",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: isSidebarOpen ? 1 : 0,
                      ml: isSidebarOpen ? 1 : -3,
                      whiteSpace: "nowrap",
                      transition: "all 0.3s ease",
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      </Drawer>

      {/* 🔹 Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          minHeight: "100vh",
          transition:
            "margin-left 0.3s ease, width 0.3s ease, background-color 0.3s ease",
          ml: `${isSidebarOpen ? drawerWidth : collapsedWidth}px`,
          width: `calc(100% - ${isSidebarOpen ? drawerWidth : collapsedWidth}px)`,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

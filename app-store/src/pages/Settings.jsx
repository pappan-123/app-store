// src/pages/Settings.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  Button,
  Skeleton,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";

export default function Settings() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const navigate = useNavigate();
  const { logout, fetchUserProfile, authToken, userDetails } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // -----------------------------------
  // Fetch full profile from backend
  // -----------------------------------
  useEffect(() => {
    const loadData = async () => {
      if (userDetails?.userName && authToken) {
        const data = await fetchUserProfile(userDetails.userName, authToken);
        setProfile(data);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="text" height={45} width="30%" />
        <Skeleton variant="rectangular" height={180} sx={{ mt: 2 }} />
        <Skeleton variant="rectangular" height={120} sx={{ mt: 2 }} />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>No profile data found.</Typography>
      </Box>
    );
  }

  const role = profile.roles?.[0] || {};
  const profilePic =
    profile.profilePic && `data:image/png;base64,${profile.profilePic}`;

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        color: theme.palette.text.primary,
      }}
    >
      <style>
        {`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: theme.palette.primary.main,
          mb: 4,
          animation: "fadeSlide 0.6s ease",
        }}
      >
        Settings
      </Typography>

      {/* ---------------------- Account Info ---------------------- */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          mb: 4,
          backgroundColor: isDark ? "#1e1e1e" : "#fff",
          animation: "fadeSlide 0.6s ease",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            mb: 2,
          }}
        >
          Account Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={2}>
            <Avatar
              src={profilePic}
              sx={{
                width: 85,
                height: 85,
                borderRadius: 2,
                bgcolor: theme.palette.primary.main,
                color: "#fff",
              }}
            >
              {!profilePic && profile.userName?.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>

          <Grid item xs={12} sm={10}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {role.roleName || "User"}
            </Typography>

            {/* Username */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <AccountCircleIcon fontSize="small" />
              {profile.userName}
            </Typography>

            {/* User ID */}
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 0.5,
              }}
            >
              <BadgeIcon fontSize="small" />
              User ID: {profile.userId}
            </Typography>

            {/* Trading Partner */}
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 0.5,
              }}
            >
              <BusinessIcon fontSize="small" />
              Trading Partner: {profile.tradingPartnerId}
            </Typography>

            {/* Role ID */}
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 0.5,
              }}
            >
              <GroupIcon fontSize="small" /> Role ID: {role.roleId}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* ---------------------- Session Section ---------------------- */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: isDark ? "#1e1e1e" : "#fff",
          animation: "fadeSlide 0.6s ease",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            mb: 2,
          }}
        >
          Session
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AccountCircleIcon
              sx={{ color: theme.palette.primary.main, fontSize: 35 }}
            />
            <Typography variant="body1">
              Signed in as {profile.userName}
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              fontWeight: 600,
              textTransform: "none",
              background: isDark
                ? "linear-gradient(90deg,#5c1a1a,#a82323)"
                : "linear-gradient(90deg,#a80808,#d32f2f)",
              "&:hover": {
                background: isDark ? "#751c1c" : "#b71c1c",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

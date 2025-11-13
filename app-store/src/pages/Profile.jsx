// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Skeleton,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAuth } from "../providers/AuthProvider";

// Animation (Fade + Slide)
const animatedStyle = {
  animation: "fadeSlide 0.6s ease",
};

export default function Profile() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { fetchUserProfile, authToken, userDetails } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  // Fetch full profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      if (userDetails?.userName && authToken) {
        const data = await fetchUserProfile(userDetails.userName, authToken);
        setProfile(data);
      }
      setLoading(false);
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="circular" width={90} height={90} />
        <Skeleton height={40} width="40%" sx={{ mt: 2 }} />
        <Skeleton height={20} width="60%" />
        <Skeleton height={20} width="50%" />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>No profile data found</Typography>
      </Box>
    );
  }

  const role = profile.roles?.[0];
  const accessibility = role?.accessibilities?.[0];
  const locations = profile.userLocations || [];

  const profilePic =
    profile.profilePic &&
    `data:image/png;base64,${profile.profilePic}`;

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
          ...animatedStyle,
        }}
      >
        My Profile
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 950,
          mx: "auto",
          backgroundColor: isDark ? "#1e1e1e" : "#fff",
          ...animatedStyle,
        }}
      >
        {/* Profile Header */}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={3} textAlign="center">
            <Avatar
              src={profilePic || ""}
              sx={{
                width: 110,
                height: 110,
                mx: "auto",
                bgcolor: theme.palette.primary.main,
                fontSize: 40,
                color: "#fff",
              }}
            >
              {!profilePic && profile.userName.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {profile.firstName} {profile.lastName}
            </Typography>

            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
            >
              <EmailIcon fontSize="small" /> {profile.email}
            </Typography>

            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
            >
              <BadgeIcon fontSize="small" /> User ID: {profile.userId}
            </Typography>

            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
            >
              <BusinessIcon fontSize="small" /> Trading Partner:{" "}
              {profile.tradingPartnerName}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Personal Information */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}
        >
          Personal Information
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <ListItemText primary="Phone No" secondary={profile.phoneNo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ListItemText primary="Alternate Phone" secondary={profile.altPhoneNo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ListItemText primary="Date of Birth" secondary={profile.dob} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ListItemText primary="Address" secondary={profile.address} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Role Information */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}
        >
          Role Information
        </Typography>

        <Paper
          elevation={0}
          sx={{
            backgroundColor: isDark ? "#262626" : "#f8f9fa",
            p: 2,
            borderRadius: 2,
            mb: 3,
          }}
        >
          <List dense>
            <ListItem>
              <ListItemText
                primary="Role Name"
                secondary={role?.roleName || "N/A"}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary="Role ID"
                secondary={role?.roleId || "N/A"}
              />
            </ListItem>
          </List>
        </Paper>

        <Divider sx={{ my: 3 }} />

        {/* Accessibility */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}
        >
          Accessibilities
        </Typography>

        {accessibility ? (
          <Paper
            elevation={0}
            sx={{
              backgroundColor: isDark ? "#262626" : "#f8f9fa",
              p: 3,
              borderRadius: 2,
            }}
          >
            {accessibility.accessibilityName[0].map((parent, idx) => (
              <Box key={idx} sx={{ mb: 3 }}>
                <Typography sx={{ fontWeight: 600, mb: 1 }}>
                  <ApartmentIcon sx={{ mr: 1 }} /> {parent}
                </Typography>

                <Box sx={{ pl: 4 }}>
                  {accessibility.accessibilityName[1].map((child, c) => (
                    <Chip
                      key={c}
                      label={child}
                      icon={<LocationOnIcon />}
                      sx={{
                        m: 0.5,
                        background:
                          "linear-gradient(90deg,#0e4b48,#0a9ea8)",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Paper>
        ) : (
          <Typography>No accessibility data available</Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Locations */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}
        >
          Locations Assigned
        </Typography>

        <Grid container spacing={2}>
          {locations.map((loc, i) => (
            <Grid key={i} item xs={12} sm={6} md={4}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: isDark ? "#262626" : "#fafafa",
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{loc.lmLocName}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Country ID: {loc.lmCountryId}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* KYC */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}
        >
          KYC Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <ListItemText primary="KYC Type" secondary={profile.kycTypeName} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <ListItemText primary="KYC Number" secondary={profile.kycNumber} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useNavigate } from "react-router-dom";
import { useApp } from "../providers/AppContext";

export default function Apps() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const navigate = useNavigate();
  const { apps, fetchApps, loading } = useApp();

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchApps(); // Load apps from API on mount
  }, []);

  const filteredApps = apps.filter((a) =>
    a.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
          }}
        >
          All Apps
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search apps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              input: {
                color: theme.palette.text.primary,
                backgroundColor: isDark ? "#2a2a2a" : "#fff",
                borderRadius: 1,
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: isDark ? "#444" : "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />

          <IconButton color="primary">
            <FilterListIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Loader */}
      {loading && (
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <CircularProgress color="primary" />
          <Typography sx={{ mt: 2 }}>Loading apps...</Typography>
        </Box>
      )}

      {/* App Grid */}
      {!loading && (
        <Grid container spacing={3}>
          {filteredApps.map((app) => (
            <Grid item xs={12} sm={6} md={4} key={app.externalId}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: isDark ? "#1e1e1e" : "#fff",
                  boxShadow: isDark
                    ? "0 4px 20px rgba(0,0,0,0.3)"
                    : "0 4px 20px rgba(0,0,0,0.05)",
                  color: theme.palette.text.primary,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: isDark
                      ? "0 6px 25px rgba(0,0,0,0.4)"
                      : "0 6px 25px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    src={app.logoUrl || "https://via.placeholder.com/100"}
                    alt={app.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {app.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {app.type} • v{app.version || "1.0.0"}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/apps/${app.externalId}`)}
                  sx={{
                    background: isDark
                      ? "linear-gradient(90deg,#053735,#0a9ea8)"
                      : "linear-gradient(90deg,#0e4b48,#0a9ea8)",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 500,
                    py: 1.2,
                    "&:hover": { opacity: 0.9 },
                  }}
                >
                  <VisibilityIcon sx={{ mr: 1 }} /> View Details
                </Button>
              </Paper>
            </Grid>
          ))}

          {/* No results */}
          {filteredApps.length === 0 && !loading && (
            <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No apps found matching "{search}"
              </Typography>
            </Box>
          )}
        </Grid>
      )}
    </Box>
  );
}

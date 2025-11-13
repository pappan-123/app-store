import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  MenuItem,
  Modal,
  Fade,
  Backdrop,
  useTheme,
} from "@mui/material";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LayersIcon from "@mui/icons-material/Layers";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";

import { useApp } from "../providers/AppContext";

export default function Dashboard() {
  const theme = useTheme();
    const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const { createApp, loading } = useApp();

  const [openModal, setOpenModal] = useState(false);

  const [form, setForm] = useState({
    externalId: "",
    name: "",
    description: "",
    type: "Android",
  });

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createApp(form);
    if (res) {
      setForm({
        externalId: "",
        name: "",
        description: "",
        type: "Android",
      });
      setOpenModal(false);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        color: theme.palette.text.primary,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: theme.palette.primary.main,
          mb: 4,
        }}
      >
        Welcome to Your App Store Dashboard
      </Typography>

      {/* ------------------------------------------------------------------
          TOP METRIC CARDS
      ------------------------------------------------------------------ */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={getCardStyle(theme, isDark)}>
            <LayersIcon
              sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }}
            />
            <Typography variant="h6">Total Apps</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              12
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={getCardStyle(theme, isDark)}>
            <TrendingUpIcon
              sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }}
            />
            <Typography variant="h6">Active Users</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              4.5K
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={getCardStyle(theme, isDark)}>
            <AssessmentIcon
              sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }}
            />
            <Typography variant="h6">App Versions</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              32
            </Typography>
          </Paper>
        </Grid>

        {/* CREATE APP BUTTON */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={getCardStyle(theme, isDark)}>
            <AddIcon
              sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }}
            />
            <Typography variant="h6">Create New</Typography>
            <Button
              variant="contained"
              onClick={() => setOpenModal(true)}
              sx={{
                mt: 1,
                background: `linear-gradient(90deg,${theme.palette.primary.main},#0a9ea8)`,
                color: "#fff",
                "&:hover": { opacity: 0.9 },
              }}
            >
              Add App
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* ------------------------------------------------------------------
          PROMOTIONAL SECTION  (✔ ADDED BACK EXACTLY AS YOU ASKED)
      ------------------------------------------------------------------ */}
      <Paper
        elevation={2}
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 2,
          background: isDark
            ? "linear-gradient(135deg,#052e2d,#0a9ea8)"
            : "linear-gradient(135deg,#0e4b48,#0a9ea8)",
          color: "#fff",
          transition: "background 0.3s ease",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Revolutionize QA with Smarter App Management
        </Typography>

        <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
          Manage, upload, and analyze your apps easily. Get real-time insights
          into your app performance, downloads, and user engagement — all from a
          single dashboard.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/apps")}
          sx={{
            background: "#fff",
            color: theme.palette.primary.main,
            fontWeight: 600,
            "&:hover": { background: "#e0f2f1" },
          }}
        >
          Explore Apps
        </Button>

      </Paper>

      {/* ------------------------------------------------------------------
          ANIMATED CREATE APP MODAL
      ------------------------------------------------------------------ */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 300 } }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 420,
              bgcolor: isDark ? "#1e1e1e" : "#fff",
              borderRadius: 3,
              p: 4,
              boxShadow: 24,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: theme.palette.primary.main,
              }}
            >
              Create New App
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="External ID"
                name="externalId"
                value={form.externalId}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />

              <TextField
                label="App Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />

              <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />

              {/* OS Dropdown */}
              <TextField
                fullWidth
                select
                name="type"
                label="Platform"
                value={form.type}
                onChange={handleChange}
                sx={{ mb: 3 }}
              >
                <MenuItem value="Android">
                  <AndroidIcon sx={{ mr: 1, color: "#3ddc84" }} /> Android
                </MenuItem>
                <MenuItem value="iOS">
                  <AppleIcon sx={{ mr: 1, color: "#000" }} /> iOS
                </MenuItem>
              </TextField>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.2,
                  background: `linear-gradient(90deg,${theme.palette.primary.main},#0a9ea8)`,
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {loading ? "Creating..." : "Create App"}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

// ------------------------------------------------------------------
// CARD STYLE (Dark + Light mode)
// ------------------------------------------------------------------
const getCardStyle = (theme, isDark) => ({
  p: 3,
  textAlign: "center",
  borderRadius: 3,
  background: isDark ? "#1e1e1e" : "#fff",
  color: theme.palette.text.primary,
  boxShadow: isDark
    ? "0 4px 20px rgba(255,255,255,0.05)"
    : "0 4px 20px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: isDark
      ? "0 6px 25px rgba(255,255,255,0.08)"
      : "0 6px 25px rgba(0,0,0,0.1)",
  },
});

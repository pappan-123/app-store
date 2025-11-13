import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";

export default function AppDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const allApps = [
    {
      id: 1,
      name: "SoftQA",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
      category: "Testing",
      currentVersion: "2.3.1",
      downloads: "12.5K",
      description:
        "SoftQA is a powerful automation testing suite that simplifies and accelerates software quality assurance for enterprise applications.",
    },
    {
      id: 2,
      name: "Buildify",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969059.png",
      category: "Development",
      currentVersion: "3.0.0",
      downloads: "9.1K",
      description:
        "Buildify streamlines development pipelines and automates CI/CD for better delivery velocity.",
    },
    {
      id: 3,
      name: "TestSuite Pro",
      logo: "https://cdn-icons-png.flaticon.com/512/906/906324.png",
      category: "Automation",
      currentVersion: "1.8.4",
      downloads: "7.2K",
      description:
        "TestSuite Pro provides advanced test management, parallel execution, and analytics.",
    },
  ];

  const app = allApps.find((a) => a.id === parseInt(id));

  if (!app) {
    return (
      <Box
        sx={{
          p: 4,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6">App not found.</Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            background: isDark
              ? "linear-gradient(90deg,#053735,#0a9ea8)"
              : "linear-gradient(90deg,#0e4b48,#0a9ea8)",
            color: "#fff",
          }}
          onClick={() => navigate("/apps")}
        >
          Back to List
        </Button>
      </Box>
    );
  }

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
      {/* Header with Back Button */}
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
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          {app.name} Details
        </Typography>

        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/apps")}
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            fontWeight: 500,
            textTransform: "none",
            "&:hover": {
              backgroundColor: `${theme.palette.primary.main}20`,
            },
          }}
        >
          Back to List
        </Button>
      </Box>

      {/* Details Content */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: isDark ? "#1e1e1e" : "#fff",
          color: theme.palette.text.primary,
          boxShadow: isDark
            ? "0 4px 20px rgba(0,0,0,0.4)"
            : "0 4px 20px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Header Section */}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={2}>
            <Avatar
              src={app.logo}
              alt={app.name}
              sx={{
                width: 80,
                height: 80,
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {app.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.secondary }}
            >
              {app.category} • v{app.currentVersion}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, color: theme.palette.primary.main }}
            >
              Downloads: {app.downloads}
            </Typography>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 3,
            borderColor: isDark ? "#333" : "#ddd",
          }}
        />

        {/* Description */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            mb: 1,
          }}
        >
          Description
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary, mb: 3 }}
        >
          {app.description}
        </Typography>

        {/* Version History */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            mb: 2,
          }}
        >
          Version History
        </Typography>

        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: isDark ? "#2a2a2a" : "#f9fafb",
            transition: "background-color 0.3s ease",
            mb: 3,
          }}
        >
          <List>
            {[
              {
                version: "2.3.1",
                date: "Nov 1, 2025",
                notes: "Minor bug fixes and UI polish",
              },
              {
                version: "2.3.0",
                date: "Oct 10, 2025",
                notes: "Added new workflow module",
              },
              {
                version: "2.2.5",
                date: "Sep 20, 2025",
                notes: "Improved performance and stability",
              },
            ].map((v, index) => (
              <ListItem
                key={index}
                divider={index < 2}
                sx={{
                  borderColor: isDark ? "#333" : "#ddd",
                }}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 600 }}>
                      Version {v.version}{" "}
                      <Chip
                        label={v.date}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: theme.palette.primary.main,
                          color: "#fff",
                        }}
                      />
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {v.notes}
                    </Typography>
                  }
                />
                <Button
                  startIcon={<DownloadIcon />}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: `${theme.palette.primary.main}20`,
                    },
                  }}
                >
                  Download
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Upload new version */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={() => navigate("/apps/upload/version")}
            sx={{
              py: 1.2,
              px: 4,
              fontWeight: 600,
              background: isDark
                ? "linear-gradient(90deg,#053735,#0a9ea8)"
                : "linear-gradient(90deg,#0e4b48,#0a9ea8)",
              color: "#fff",
              transition: "opacity 0.2s ease",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            Upload New Version
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

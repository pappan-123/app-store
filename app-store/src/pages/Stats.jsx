import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  useTheme,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";

export default function Stats() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const downloadData = [
    { month: "Jun", downloads: 3200 },
    { month: "Jul", downloads: 4100 },
    { month: "Aug", downloads: 4900 },
    { month: "Sep", downloads: 5200 },
    { month: "Oct", downloads: 6700 },
    { month: "Nov", downloads: 7800 },
  ];

  const versionData = [
    { version: "2.0", users: 1200 },
    { version: "2.1", users: 2500 },
    { version: "2.2", users: 3200 },
    { version: "2.3", users: 4000 },
  ];

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
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: theme.palette.primary.main,
          mb: 4,
        }}
      >
        App Statistics & Performance
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            icon: <DownloadIcon sx={{ fontSize: 40, color: "#0a9ea8", mb: 1 }} />,
            title: "Total Downloads",
            value: "78.2K",
          },
          {
            icon: <PeopleIcon sx={{ fontSize: 40, color: "#0a9ea8", mb: 1 }} />,
            title: "Active Users",
            value: "12.3K",
          },
          {
            icon: <StarIcon sx={{ fontSize: 40, color: "#0a9ea8", mb: 1 }} />,
            title: "Average Rating",
            value: "4.6 ★",
          },
          {
            icon: <TrendingUpIcon sx={{ fontSize: 40, color: "#0a9ea8", mb: 1 }} />,
            title: "Growth Rate",
            value: "+14%",
          },
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                backgroundColor: isDark ? "#1e1e1e" : "#fff",
                color: theme.palette.text.primary,
                boxShadow: isDark
                  ? "0 4px 20px rgba(0,0,0,0.4)"
                  : "0 4px 20px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: isDark
                    ? "0 6px 25px rgba(0,0,0,0.5)"
                    : "0 6px 25px rgba(0,0,0,0.1)",
                },
              }}
            >
              {card.icon}
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Line Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              height: 400,
              backgroundColor: isDark ? "#1e1e1e" : "#fff",
              color: theme.palette.text.primary,
              boxShadow: isDark
                ? "0 4px 20px rgba(0,0,0,0.4)"
                : "0 4px 20px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
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
              Monthly Downloads Trend
            </Typography>
            <Divider
              sx={{
                mb: 3,
                borderColor: isDark ? "#333" : "#ddd",
              }}
            />
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={downloadData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? "#444" : "#ddd"}
                />
                <XAxis
                  dataKey="month"
                  stroke={theme.palette.text.secondary}
                />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#2a2a2a" : "#fff",
                    color: theme.palette.text.primary,
                    borderRadius: 8,
                    border: "none",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="downloads"
                  stroke="#0a9ea8"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              height: 400,
              backgroundColor: isDark ? "#1e1e1e" : "#fff",
              color: theme.palette.text.primary,
              boxShadow: isDark
                ? "0 4px 20px rgba(0,0,0,0.4)"
                : "0 4px 20px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
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
              Users by Version
            </Typography>
            <Divider
              sx={{
                mb: 3,
                borderColor: isDark ? "#333" : "#ddd",
              }}
            />
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={versionData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? "#444" : "#ddd"}
                />
                <XAxis
                  dataKey="version"
                  stroke={theme.palette.text.secondary}
                />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#2a2a2a" : "#fff",
                    color: theme.palette.text.primary,
                    borderRadius: 8,
                    border: "none",
                  }}
                />
                <Bar
                  dataKey="users"
                  fill="#0a9ea8"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

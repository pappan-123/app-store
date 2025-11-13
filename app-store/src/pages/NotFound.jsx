import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(180deg, #0e4b48, #0a9ea8)",
        color: "#fff",
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 700, mb: 2 }}>
        404{" "}
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Oops! The page you're looking for doesn't exist.{" "}
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/")}
        sx={{
          background: "#fff",
          color: "#0e4b48",
          fontWeight: 600,
          "&:hover": { background: "#e0f2f1" },
        }}
      >
        Go to Dashboard{" "}
      </Button>{" "}
    </Box>
  );
}

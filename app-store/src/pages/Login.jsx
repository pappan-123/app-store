import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const { login, loading } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      toast.error("Please enter username and password");
      return;
    }

    const success = await login(userName, password); // ✅ use AuthProvider
    if (success) {
      navigate("/dashboard/apps"); // ✅ redirect after login
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f4f6f8",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 1000,
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
        }}
      >
        {/* Left Panel */}
        <Box sx={{ flex: 1, p: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Welcome Back! Sign in to access your dashboard and continue
            optimizing your QA process.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
              Username
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
              Password
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShow(!show)} edge="end">
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1 }}
            />


            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.8,
                mb: 2,
                background: "linear-gradient(90deg,#0e4b48,#0a9ea8)",
                color: "#fff",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

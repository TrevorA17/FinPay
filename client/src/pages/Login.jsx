import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL; // Use the API URL from .env

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState(""); // For OTP input
  const [error, setError] = useState(""); // For displaying errors
  const [otpSent, setOtpSent] = useState(false); // Tracks OTP step
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, credentials);

      if (response.status === 200) {
        setOtpSent(true); // Move to OTP verification step
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter the OTP sent to your email.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/otp/verifyOtpForLogin`, {
        email: credentials.email, // Pass email to verify OTP
        otp,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Save token to local storage
        localStorage.setItem("authToken", token);

        // Dispatch login action
        dispatch(login(true));

        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#e0e0e0",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            {otpSent ? "Verify OTP" : "Login to Your Account"}
          </Typography>

          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginBottom: 2, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}

          {!otpSent ? (
            // Step 1: Email & Password Login Form
            <form onSubmit={handleLogin} style={{ width: "100%" }}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ padding: "10px", marginBottom: 2 }}
                >
                  Login
                </Button>
              </Box>
            </form>
          ) : (
            // Step 2: OTP Verification Form
            <form onSubmit={handleVerifyOtp} style={{ width: "100%" }}>
              <TextField
                label="Enter OTP"
                type="text"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ padding: "10px", marginBottom: 2 }}
                >
                  Verify OTP
                </Button>
              </Box>
            </form>
          )}

          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
              <Button color="primary" size="small" href="/register">
                Register
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;

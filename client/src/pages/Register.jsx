import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Paper,
  Alert,
  Snackbar,
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL; // Use the API URL from .env

const Register = () => {
  const [credentials, setCredentials] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "success" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const showAlert = (message, severity) => {
    setAlert({ message, severity });
    setOpenSnackbar(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      showAlert("Passwords do not match", "error");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        showAlert(data.message, "success");
      } else {
        showAlert(data.message || "Registration failed", "error");
      }
    } catch (error) {
      showAlert("An error occurred. Please try again.", "error");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/otp/validate-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          otp,
          password: credentials.password,
          fullName: credentials.fullName,
          phone: credentials.phone,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsVerified(true);
        showAlert(data.message, "success");
        navigate("/login");
      } else {
        showAlert(data.message || "OTP verification failed", "error");
      }
    } catch (error) {
      showAlert("An error occurred while verifying OTP.", "error");
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
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: 3,
            height: otpSent ? "400px" : "550px",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Create Your Account
          </Typography>

          {/* MUI Alert Snackbar */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity={alert.severity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {alert.message}
            </Alert>
          </Snackbar>

          {!otpSent ? (
            <form onSubmit={handleRegister} style={{ width: "100%" }}>
              <TextField
                label="Full Name"
                type="text"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={credentials.fullName}
                onChange={(e) =>
                  setCredentials({ ...credentials, fullName: e.target.value })
                }
              />
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
                label="Phone Number"
                type="tel"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={credentials.phone}
                onChange={(e) =>
                  setCredentials({ ...credentials, phone: e.target.value })
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
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={credentials.confirmPassword}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    confirmPassword: e.target.value,
                  })
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
                  Register
                </Button>
              </Box>
            </form>
          ) : (
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
              Already have an account?{" "}
              <Button color="primary" size="small" href="/login">
                Login
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;

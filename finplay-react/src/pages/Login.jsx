import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container, Box, Paper } from "@mui/material";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if the user is already logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      dispatch(login(JSON.parse(storedUser))); // Restore auth state
      navigate("/dashboard"); // Redirect to dashboard
    }
  }, [dispatch, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock authentication logic
    if (credentials.email === "admin@example.com" && credentials.password === "password") {
      const userData = { email: credentials.email }; // Data to store

      // Save user data in localStorage
      localStorage.setItem("authUser", JSON.stringify(userData));

      // Dispatch login action
      dispatch(login(userData));

      // Navigate to the dashboard
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };
  
return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "#e0e0e0", // Light background color for contrast
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
            Login to Your Account
          </Typography>

          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
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

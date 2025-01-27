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

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // For displaying login errors
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!credentials.email || !credentials.password) {
      setError("Email and password are required");
      return;
    }
  
    try {
      // Make POST request to backend login API
      const response = await axios.post("http://localhost:5000/api/login", {
        email: credentials.email,
        password: credentials.password,
      });
  
      // On successful login, dispatch the login action and navigate to the dashboard
      if (response.status === 200) {
        dispatch(login(true)); // Update Redux store
        navigate("/dashboard"); // Navigate to the dashboard
      }
    } catch (err) {
      console.error(err); // Log the full error object for debugging
      if (err.response) {
        setError(err.response.data.message || "Something went wrong");
      } else {
        setError("Server error. Please try again later.");
      }
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
            Login to Your Account
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

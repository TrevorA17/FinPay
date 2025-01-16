import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/authSlice"; // Add your registration action (if needed)
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container, Box, Paper } from "@mui/material";

const Register = () => {
  const [credentials, setCredentials] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic form validation
    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Mock registration logic
    if (credentials.email && credentials.password && credentials.fullName && credentials.phone) {
      dispatch(register({ email: credentials.email }));
      navigate("/login"); // Navigate to login page after successful registration
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#f5f5f5", borderRadius: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create Your Account
        </Typography>

        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          <TextField
            label="Full Name"
            type="text"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={credentials.fullName}
            onChange={(e) => setCredentials({ ...credentials, fullName: e.target.value })}
          />
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
            label="Phone Number"
            type="tel"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={credentials.phone}
            onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
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
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={credentials.confirmPassword}
            onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
          />
          
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
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
  );
};

export default Register;

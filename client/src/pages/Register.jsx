import React, { useState } from "react";
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
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%", // Full viewport height
    backgroundColor: "#e0e0e0", // Light background for contrast
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
        height:"550px"
      }}
    >
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
</Box>

  );
};

export default Register;

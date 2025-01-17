import React, { useState } from "react";
import { Box, Typography, Button, Menu, MenuItem } from "@mui/material";


const DashboardContent = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        backgroundColor: "#fff", 
        padding: "30px", 
        borderRadius: "0px", 
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        height: "55px",
        top:"0",
        left: "0"
      }}
    >
      {/* Left Section: Welcome Message */}
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Welcome Olivia
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.7)" }}>
          Good morning, have a great day!
        </Typography>
      </Box>

      {/* Right Section: Quick Actions Button */}
      <Box>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#be8bea",
            },
          }}
        >
          Quick Actions
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            mt: "45px", // Adjust position of the dropdown
          }}
        >
          <MenuItem onClick={handleClose}>Action 1</MenuItem>
          <MenuItem onClick={handleClose}>Action 2</MenuItem>
          <MenuItem onClick={handleClose}>Action 3</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};


export default DashboardContent

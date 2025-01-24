import React, { useState, useEffect } from "react";
import { Box,  ListItemIcon,Typography, Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
    {/* Welcome Box */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "35px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Beneficiaries
      </Typography>
      <Button
        variant="contained"
        onClick={handleClick}
        startIcon={<ArrowDropDownIcon />}
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          textTransform: "none",
        }}
      >
        Quick Actions
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuClick("Send Money")}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Send Money
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("Fund Wallet")}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Fund Wallet
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("Convert Funds")}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Convert Funds
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("Create Invoice")}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Create New Invoice
        </MenuItem>
      </Menu>
    </Box>
    </Box>
  );
};

export default Profile;

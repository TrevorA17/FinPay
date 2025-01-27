import React, { useState } from "react";
import { Box, ListItemIcon, Typography, Button, Menu, MenuItem, Divider } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";

import SendMoney from "../components/SendMoney";
import FundWallet from "../components/FundWallet";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";

const Security = () => {
  const [activePage, setActivePage] = useState(null); // Declare activePage state
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (page) => {
    setActivePage(page); // Set the active page dynamically
    handleClose(); // Close the dropdown
  };

  switch (activePage) {
    case "Send Money":
      return <SendMoney />;
    case "Fund Wallet":
      return <FundWallet />;
    case "Convert Funds":
      return <ConvertFunds />;
    case "Create Invoice":
      return <CreateInvoice />;
    
    default:  
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
              Security
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

          {/* Manage Security Box */}
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "30px",  // Increased padding
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              marginBottom: "20px",
              width: "80%",  // Increased box size
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
              Manage Security
            </Typography>
            <Divider sx={{ marginBottom: "20px" }} />


            {/* Password Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "20px" }}>
              <Typography variant="h7" sx={{ marginBottom: "10px" }}>
                Password <br/>
                Set a unique password to protect your account.
              </Typography>
              <Button variant="outlined" sx={{ alignSelf: "flex-start" }}>
                Change Password <br/>
              </Button>
              
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />
            {/* Auth Method Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "20px" }}>
              <Typography variant="h7" sx={{ marginBottom: "10px" }}>
                Reset or Change Auth Method
              </Typography>
              <Button variant="outlined" sx={{ alignSelf: "flex-start" }}>
                Activate 2FA
              </Button>
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />
          </Box>

          {/* Go Back Button */}
          <Button
            variant="outlined"
            sx={{
              marginTop: "20px",
              backgroundColor: "#fff",
              marginLeft:"65px"
            }}
          >
            Go Back
          </Button>
        </Box>
      );
  }
};

export default Security;

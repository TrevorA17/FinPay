import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";

//Importing dynamic components for QuickActions Menu
import SendMoney from "./SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice"

const FundWallet = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [activePage, setActivePage] = useState(null); // Declare activePage state
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (page) => {
    setActivePage(page); // Set the active page dynamically
    handleClose();       // Close the dropdown
  };

  switch (activePage) {
    case "Send Money":
      return <SendMoney />;
    case "Convert Funds":
      return <ConvertFunds />;
    case "Fund Wallet":
      return <FundWallet />;
    case "Create Invoice":
      return <CreateInvoice />;      
      
    default:
      
 
  return (
    <Box>
      {/* Header Card */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
          height: "76px",
        }}
      >
        {/* Left Section: Header Title */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Fund Wallet
          </Typography>
        </Box>

        {/* Right Section: Quick Actions Button */}
        <Box>
          <Button
            variant="contained"
            onClick={handleClick}
            startIcon={<ArrowDropDownIcon />}
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              textTransform: "none",
              padding: "10px",
            }}
          >
            Quick Actions
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ mt: "-45px" }}
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

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          minHeight: "calc(100vh - 96px)", // Adjust height to fit below the header
          backgroundColor: "#f9f9f9",
        }}
      >                          
        </Box>
      </Box>

  );
};
};

export default FundWallet;

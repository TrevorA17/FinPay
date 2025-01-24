import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Importing dynamic components for QuickActions Menu
import FundWallet from "./FundWallet";
import ConvertFunds from "./ConvertFunds";
import CreateInvoice from "./CreateNewInvoice";
import { useNavigate } from "react-router-dom";

const SendMoney = () => {
  const navigate = useNavigate(); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePage, setActivePage] = useState(null);

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

  const handleGoBack = () => {
    navigate("/"); // Go back to the main dashboard
  };

  const handleContinue = () => {
    console.log("Continue button clicked!");
  };

  switch (activePage) {
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
                Send Money
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
              alignItems: "left",
              justifyContent: "left",
              padding: "20px",
              minHeight: "calc(100vh - 96px)",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Go Back Button */}
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
              sx={{
                alignSelf: "flex-start",
                marginBottom: "20px",
                textTransform: "none",
              }}
            >
              Go Back
            </Button>

            {/* Main Box */}
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                maxWidth: "400px",
                width: "100%",
              }}
            >
              {/* Title */}
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: "10px" }}
              >
                Who are you sending to?
              </Typography>

              <Divider sx={{ marginBottom: "20px" }} />

              {/* Options */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <Button
                  variant="outlined"
                  startIcon={<AccountBalanceIcon />}
                  sx={{
                    textTransform: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    padding: "20px",
                  }}
                >
                  <Typography variant="h6">Direct Bank</Typography>
                  <Typography variant="caption">
                    Direct transfer to bank
                  </Typography>
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<PhoneAndroidIcon />}
                  sx={{
                    textTransform: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    padding: "20px",
                  }}
                >
                  <Typography variant="h6">Mobile Money</Typography>
                  <Typography variant="caption">
                    Transfer to mobile money
                  </Typography>
                </Button>
              </Box>

              {/* Continue Button */}
              <Button
                variant="contained"
                onClick={handleContinue}
                sx={{
                  marginTop: "20px",
                  textTransform: "none",
                  backgroundColor: "#007bff",
                  width: "100%"
                }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Box>
      );
  }
};

export default SendMoney;

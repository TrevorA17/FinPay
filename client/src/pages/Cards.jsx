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
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";

//Importing dynamic components for QuickActions Menu
import SendMoney from "../components/SendMoney";
import FundWallet from "../components/FundWallet";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";

const CardsPage = () => {
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
    handleClose(); // Close the dropdown
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
              boxShadow: "0 0.5px 0.5px rgba(0, 0, 0.0)",
              marginBottom: "20px",
              height: "76px",
            }}
          >
            {/* Left Section: Header Title */}
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Cards
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
            {/* Main Card */}
            <Box
              sx={{
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                width: "100%",
                maxWidth: "600px",
                padding: "30px",
                textAlign: "left",
              }}
            >
              {/* Title */}
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: "20px" }}
              >
                Cards
              </Typography>

              {/* Placeholder for Image */}
              <Box
                sx={{
                  height: "250px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src="" // Replace with the actual image URL
                  alt="Card Illustration"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* Button */}
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{
                  textTransform: "none",
                  fontSize: "16px",
                  padding: "10px 60px",
                  backgroundColor: "#007bff",
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                  width: "100%",
                }}
              >
                Create New Card
              </Button>
            </Box>
          </Box>
        </Box>
      );
  }
};

export default CardsPage;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";
import CreateCustomer from "./../components/CreateNewCustomer";

const CardsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    navigate(`/cards?action=${action}`);
    handleClose(); // Close the dropdown
  };

  const searchParams = new URLSearchParams(location.search);
  const activePage = searchParams.get("action");

  if (activePage) {
    switch (activePage) {
      case "send-money":
        return <SendMoney />;
      case "convert-funds":
        return <ConvertFunds />;
      case "create-customer":
        return <CreateCustomer />;
      case "create-invoice":
        return <CreateInvoice />;

      default:
        break;
    }
  }
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
          marginLeft: "-5px",
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
            <MenuItem onClick={() => handleMenuClick("send-money")}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Send Money
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick("create-customer")}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Create Customer
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick("convert-funds")}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Convert Funds
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick("create-invoice")}>
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
};

export default CardsPage;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  ListItemIcon,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";

//Quick action imports
import SendMoney from "../components/SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";
import CreateCustomer from "./../components/CreateNewCustomer";

const Security = () => {
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
    navigate(`/security?action=${action}`);
    handleClose(); // Close the dropdown
  };

  const handleGoBack = () => {
    navigate("/"); // Go back to the main dashboard
  };

  const searchParams = new URLSearchParams(location.search);
  const activePage = searchParams.get("action");

  if (activePage) {
    switch (activePage) {
      case "send-money":
        return <SendMoney />;
      case "create-customer":
        return <CreateCustomer />;
      case "convert-funds":
        return <ConvertFunds />;
      case "create-invoice":
        return <CreateInvoice />;

      default:
        break;
    }
  }
  return (
    <Box>
      {/* Welcome Box */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "38px",
          boxShadow: "0 0.5px 0.5px rgba(0, 0, 0.0)",
          marginBottom: "25px",
          marginLeft: "-5px",
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

      {/* Manage Security Box */}
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "30px", // Increased padding
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          marginBottom: "20px",
          width: "80%", // Increased box size
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          Manage Security
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />

        {/* Password Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "20px",
          }}
        >
          <Typography variant="h7" sx={{ marginBottom: "10px" }}>
            Password <br />
            Set a unique password to protect your account.
          </Typography>
          <Button variant="outlined" sx={{ alignSelf: "flex-start" }}>
            Change Password <br />
          </Button>
        </Box>
        <Divider sx={{ marginBottom: "20px" }} />
        {/* Auth Method Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "20px",
          }}
        >
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
          marginLeft: "65px",
        }}
        onClick={handleGoBack}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default Security;

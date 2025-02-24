import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Grid2,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import SendMoney from "../components/SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";
import CreateCustomer from "./../components/CreateNewCustomer";

const Identification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    navigate(`/identification?action=${action}`);
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
          marginBottom: "20px",
          marginLeft: "-5px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Identification
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

      {/* Identification Box */}
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          Identification
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "20px", color: "#555" }}
        >
          Complete any pending process by clicking an uncompleted stage.
        </Typography>

        {/* Icons with Title and Status*/}
        <Grid2 container spacing={3}>
          {[
            {
              title: "ID Verification",
              status: "Approved",
              approved: true,
            },
            { title: "Sending Money", status: "Pending", approved: false },
            {
              title: "Email Verification",
              status: "Approved",
              approved: true,
            },
            {
              title: "Daily Transaction Limit",
              status: "Pending",
              approved: false,
            },
            {
              title: "Compliance Document",
              status: "Approved",
              approved: true,
            },
            {
              title: "Receiving Funds",
              status: "Pending",
              approved: false,
            },
          ].map((item, index) => (
            <Grid2 item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: item.approved ? "#4caf50" : "#f44336",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    marginRight: "10px",
                  }}
                >
                  {item.approved ? <CheckCircleIcon /> : <CancelIcon />}
                </Box>
                <Box>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: item.approved ? "#4caf50" : "#f44336",
                      fontWeight: "bold",
                    }}
                  >
                    {item.status}
                  </Typography>
                </Box>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Go Back Button */}
      <Button
        variant="contained"
        sx={{
          marginTop: "20px",
          backgroundColor: "#1976d2",
          color: "#fff",
        }}
        onClick={handleGoBack}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default Identification;

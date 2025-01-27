import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Grid,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import SendMoney from "../components/SendMoney";
import FundWallet from "../components/FundWallet";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";

const Profile = () => {
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

            {/* Icons with Titles and Status (Two by Two) */}
            <Grid container spacing={3}>
              {[
                { title: "ID Verification", status: "Approved", approved: true },
                { title: "Address Verification", status: "Pending", approved: false },
                { title: "Bank Details", status: "Approved", approved: true },
                { title: "Phone Verification", status: "Pending", approved: false },
                { title: "Email Verification", status: "Approved", approved: true },
                { title: "KYC Upload", status: "Pending", approved: false },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
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
                      {item.approved ? (
                        <CheckCircleIcon />
                      ) : (
                        <CancelIcon />
                      )}
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
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Go Back Button */}
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              backgroundColor: "#1976d2",
              color: "#fff",
            }}
          >
            Go Back
          </Button>
        </Box>
      );
  }
};

export default Profile;

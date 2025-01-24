import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";

import SendMoney from "../components/SendMoney";
import FundWallet from "../components/FundWallet";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const navigate = useNavigate(); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePage, setActivePage] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState("123 Example St, City, Country");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (page) => {
    setActivePage(page);
    handleClose();
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  const handleSaveAddress = () => {
    setIsEditingAddress(false);
  };
  const handleGoBack = () => {
    navigate("/transactions"); // Go back to the main dashboard
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
              My Profile
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
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
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

          {/* Profile Box */}
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "30px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "0px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              My Profile
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                OR
              </Box>
              <Typography variant="h6">Olivia Rhye</Typography>
            </Box>

            <Divider sx={{ marginBottom: "20px" }} />

            {/* TextFields */}
            <Box display="flex" flexWrap="wrap" gap={8}>
              {[ 
                "First Name",
                "Last Name",
                "Email Address",
                "Phone No",
                "FinPay Tag",
                "Country",
                "DOB",
                "Occupation",
                "DOB",
              ].map((label, index) => (
                <TextField
                  key={index}
                  label={label}
                  value="John Doe"
                  InputProps={{ readOnly: true }}
                  sx={{ flex: "1 1 45%" }}
                />
              ))}

              {/* Editable Physical Address */}
              <Box
                sx={{
                  flex: "1 1 45%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  label="Physical Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  InputProps={{ readOnly: !isEditingAddress }}
                  fullWidth
                />
                {!isEditingAddress ? (
                  <Button
                    onClick={handleEditAddress}
                    variant="outlined"
                    sx={{ marginTop: "10px" }}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    onClick={handleSaveAddress}
                    variant="contained"
                    sx={{ marginTop: "10px" }}
                  >
                    Save
                  </Button>
                )}
              </Box>
            </Box>
          </Box>

          {/* Go Back Button */}
          <Button
            variant="contained"
            sx={{ marginTop: "20px", backgroundColor: "#1976d2" }}
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </Box>
      );
  }
};

export default Profile;

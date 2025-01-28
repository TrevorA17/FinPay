import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  TextField,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Importing dynamic components for QuickActions Menu
import SendMoney from "./SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import FundWallet from "./FundWallet";

const CreateInvoice = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePage, setActivePage] = useState(null);

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
  const handleGoBack = () => {
    navigate("/"); // Navigate to the dashboard route
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
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                New Invoice
              </Typography>
            </Box>
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
              gap: "20px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Create Invoice */}
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "0px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "40%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Create Invoice
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                Customer's Name
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ddd",
                    borderRadius: "50%",
                  }}
                />
                <Typography>John Doe</Typography>
              </Box>
            </Box>

            {/* Invoice Information */}
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "0px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "40%",
                position: "relative", // Enables relative positioning for children
                minHeight: "400px", // Ensures enough height to accommodate the button
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Invoice Information
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Currency</Typography>
                <Button
                  variant="outlined"
                  startIcon={<ArrowDropDownIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Select Currency
                </Button>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Issue Date</Typography>
                <TextField
                  type="date"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Invoice Due Date</Typography>
                <TextField
                  type="date"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Typography>Subtotal</Typography>
                <Typography>$0.00</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Typography>Total</Typography>
                <Typography>$0.00</Typography>
              </Box>

              {/* Go Back Button */}
              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                sx={{
                  position: "absolute", // Absolute positioning for precise placement
                  bottom: "-45px", // Space from the bottom
                  left: "5px", // Space from the left
                }}
                onClick={handleGoBack}
              >
                Go Back
              </Button>
            </Box>
            {/* Item Description */}
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                marginLeft: "450px",
                marginTop: "-710px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Item Description
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h7">Item Description*</Typography>
              <Divider sx={{ my: 2 }} />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter item description"
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="h7" sx={{ mt: 2 }}>
                Quantity*
              </Typography>
              <Divider sx={{ my: 2 }} />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter item description"
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="h7" sx={{ mt: 2 }}>
                Amount Per Quantity*
              </Typography>
              <Divider sx={{ my: 2 }} />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter item description"
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="h7" sx={{ mt: 2 }}>
                VAT Information
              </Typography>
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={<Checkbox />}
                label="Should VAT be included?"
              />
            </Box>
          </Box>

          {/* Send Invoice Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "75%",
              mt: 14,
              display: "block",
              mx: "auto",
            }}
          >
            Create Invoice
          </Button>
        </Box>
      );
  }
};

export default CreateInvoice;

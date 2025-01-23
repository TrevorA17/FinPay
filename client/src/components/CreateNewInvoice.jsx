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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";

// Importing dynamic components for QuickActions Menu
import SendMoney from "./SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import FundWallet from "./FundWallet";

const CreateInvoice = () => {
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
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
              height: "76px",
            }}
          >
            {/* Left Section: Header Title */}
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                New Invoice
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
              gap: "20px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Left Box: Create Invoice */}
            <Box
              sx={{
                flex: 1,
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                height:"20%"
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Create Invoice
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
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

            {/* Right Box: Item Description */}
            <Box
              sx={{
                flex: 1,
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Item Description
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                Item Description
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter item description"
                sx={{ mb: 3, height:"80px"}}
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                Quantity
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter quantity"
                sx={{ mb: 3 }}
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                Amount (Per Quantity)
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter amount per quantity"
              />
            </Box>
          </Box>
        </Box>
      );
  }
};

export default CreateInvoice;

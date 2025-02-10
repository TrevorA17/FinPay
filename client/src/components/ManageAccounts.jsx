import React, { useState } from "react";
import UserDropdown from "./UserDropdown";
import AccountForm from "./AccountForm";
import { Container, Typography } from "@mui/material";
import { Box, Button, Menu, MenuItem, ListItemIcon } from "@mui/material";

import SendMoney from "../components/SendMoney";
import FundWallet from "../components/FundWallet";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";

import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ManageAccounts = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
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
  const handleGoBack = () => {
    navigate("/"); // Go back to the main dashboard
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: "38px",
              boxShadow: "0 0.5px 0.5px rgba(0, 0, 0.0)",
              marginBottom: "20px",
              marginLeft: "-25px",
              width: "97.5%",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Manage Accounts
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
              <MenuItem onClick={() => handleMenuClick("Create Customer")}>
                <ListItemIcon>
                  <DashboardIcon fontSize="small" />
                </ListItemIcon>
                Create Customer
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
          <Container>
            <Typography variant="h6" gutterBottom>
              Manage User Accounts
            </Typography>
            <UserDropdown onSelect={setSelectedUserId} />
            {selectedUserId && <AccountForm userId={selectedUserId} />}
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
          </Container>
        </Box>
      );
  }
};
export default ManageAccounts;

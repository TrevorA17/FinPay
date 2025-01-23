import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Divider,
  ListItemIcon,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Import other components for Quick Actions menu
import SendMoney from "./SendMoney";
import FundWallet from "./FundWallet";
import CreateInvoice from "./CreateNewInvoice";

const ConvertFunds = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [anchorEl, setAnchorEl] = useState(null); // For the top bar menu
  const [anchorElFrom, setAnchorElFrom] = useState(null); // For the "Amount to Convert" dropdown
  const [anchorElTo, setAnchorElTo] = useState(null); // For the "You'll Receive" dropdown
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(1.12); // Example exchange rate

  const currencies = ["USD", "EURO", "YEN"];
  const [activePage, setActivePage] = useState(null);
  

  const handleTopBarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTopBarClose = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (page) => {
    setActivePage(page); // Set the active page dynamically
    handleClose();       // Close the dropdown
  };

  const handleOpenFromMenu = (event) => {
    setAnchorElFrom(event.currentTarget);
  };

  const handleCloseFromMenu = (currency) => {
    setAnchorElFrom(null);
    if (currency) setFromCurrency(currency);
  };

  const handleOpenToMenu = (event) => {
    setAnchorElTo(event.currentTarget);
  };

  const handleCloseToMenu = (currency) => {
    setAnchorElTo(null);
    if (currency) setToCurrency(currency);
  };

  const handleConvert = () => {
    console.log("Converting funds...");
  };

  const handleGoBack = () => {
    navigate("/dashboard"); // Navigate to the dashboard route
  };

  switch (activePage) {
    case "Send Money":
      return <SendMoney />;
    case "Fund Wallet":
      return <FundWallet />;
    case "Create Invoice":
      return <CreateInvoice />;
    default:
  return (
    <Box>
      {/* Top Bar */}
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
            Convert Funds
          </Typography>
        </Box>

        {/* Right Section: Quick Actions Button */}
        <Box>
          <Button
            variant="contained"
            onClick={handleTopBarClick}
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
            onClose={handleTopBarClose}
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
          padding: "30px",
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Convert Funds
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Amount to Convert */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Amount to Convert*
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="text"
                    onClick={handleOpenFromMenu}
                    endIcon={<ArrowDropDownIcon />}
                  >
                    {fromCurrency}
                  </Button>
                  <Menu
                    anchorEl={anchorElFrom}
                    open={Boolean(anchorElFrom)}
                    onClose={() => handleCloseFromMenu()}
                  >
                    {currencies.map((currency) => (
                      <MenuItem
                        key={currency}
                        onClick={() => handleCloseFromMenu(currency)}
                      >
                        {currency}
                      </MenuItem>
                    ))}
                  </Menu>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* You'll Receive */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            You'll Receive*
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Converted amount"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="text"
                    onClick={handleOpenToMenu}
                    endIcon={<ArrowDropDownIcon />}
                  >
                    {toCurrency}
                  </Button>
                  <Menu
                    anchorEl={anchorElTo}
                    open={Boolean(anchorElTo)}
                    onClose={() => handleCloseToMenu()}
                  >
                    {currencies.map((currency) => (
                      <MenuItem
                        key={currency}
                        onClick={() => handleCloseToMenu(currency)}
                      >
                        {currency}
                      </MenuItem>
                    ))}
                  </Menu>
                </InputAdornment>
              ),
            }}
            disabled
          />
        </Box>

        {/* Exchange Rate */}
        <Typography variant="body2" sx={{ mb: 3 }}>
          Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}
        </Typography>

        {/* Convert Funds Button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<CurrencyExchangeIcon />}
          onClick={handleConvert}
        >
          Convert Funds
        </Button>

        {/* Go Back Button */}
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
          onClick={handleGoBack}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};
};
export default ConvertFunds;

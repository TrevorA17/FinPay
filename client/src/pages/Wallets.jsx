import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

//Importing dynamic components for QuickActions Menu
import SendMoney from "../components/SendMoney";
import FundWallet from "../components/FundWallet";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice"

const Wallets = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(null); // Declare activePage state
  
  const [transactions, setTransactions] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (page) => {
    setActivePage(page); // Set the active page dynamically
    handleClose();       // Close the dropdown
  };

  // Fetch dummy data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data.slice(0, 3)); // Use 3 products for cards
        setTransactions(response.data.slice(0, 5)); // Use 5 products for transactions
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // DataGrid Columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Transaction Name", flex: 1 },
    { field: "price", headerName: "Amount ($)", width: 120 },
    { field: "description", headerName: "Description", flex: 2 },
  ];

  // DataGrid Rows
  const rows = transactions.map((transaction, index) => ({
    id: index + 1,
    title: transaction.title,
    price: transaction.price.toFixed(2),
    description: transaction.description,
  }));

  switch (activePage) {
    case "Send Money":
      return <SendMoney />;
    case "Convert Funds":
      return <ConvertFunds />;
    case "Fund Wallet":
      return <FundWallet />;
    case "Create Invoice":
      return <CreateInvoice/>
            
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
          borderRadius: "0px",
          boxShadow: "0 4px 6px rgba(0, 0, 0.9, 0.1)",
          marginBottom: "20px",
          height: "76px",
          marginLeft: "-5px",
        }}
      >
        {/* Left Section: Welcome Message */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Wallets
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
              padding: "10px",
              color: "#000",
              textTransform: "none",
              fontSize: "15px",
            }}
          >
            Quick Actions
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              mt: "-45px",
            }}
          >
            <MenuItem onClick={() => handleMenuClick("Send Money")}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Send Money
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick("Fund Wallet")}>
              <ListItemIcon>
                <DescriptionOutlinedIcon fontSize="small" />
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

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 3,
          marginLeft: "10px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<MonetizationOnOutlinedIcon />}
          onClick={() => handleMenuClick("Send Money")}
          sx={{
            backgroundColor: "#007bff",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Send Money
        </Button>
        <Button
          variant="contained"     
          startIcon={<MonetizationOnOutlinedIcon />}  
          onClick={() => handleMenuClick("Convert Funds")}   
          sx={{
            backgroundColor: "#28a745",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Convert Funds
        </Button>
      </Box>

      {/* Horizontal Cards */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          marginBottom: 4,
          marginLeft: "10px",
          flexWrap: "none",
        }}
      >
        {/* Currency */}
        <Card sx={{ width: "30%", minWidth: "25px", padding: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Currency
            </Typography>
            <Divider/>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">USD</Typography>
              <IconButton variant="outlined">
                <SwapVertIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>

        {/* Receiving Account */}
        <Card sx={{ width: "30%", minWidth: "250px", padding: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Receiving Account
            </Typography>
            <Divider/>
            <Typography variant="body1">Account Name: John Doe</Typography>
            <Typography variant="body1">Account Number: 123456789</Typography>
            <Typography variant="body1">Bank: Demo Bank</Typography>
          </CardContent>
        </Card>

        {/* Expenses */}
        <Card sx={{ width: "30%", minWidth: "250px", padding: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Expenses
            </Typography>
            <Divider/>
            <Typography variant="body1">$1,230.45</Typography>
            <Typography variant="body2" color="textSecondary">
              This month
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Recent Transactions */}
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginLeft: "10px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Recent Transactions
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
        </div>
      </Box>
    </Box>
  );
};
};

export default Wallets;

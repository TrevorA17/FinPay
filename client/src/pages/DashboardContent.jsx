import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Card,
  CardContent,
  Avatar,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { fetchLoggedInUser } from "../api/userApi";

// Importing dynamic components for Quick Actions Menu
import SendMoney from "../components/SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";
import CreateCustomer from "./../components/CreateNewCustomer";

const DashboardContent = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null); // State for logged-in user
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); //Default page size
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [exchangeRates] = useState([
    { currency: "USD", buying: 750, selling: 760 },
    { currency: "EUR", buying: 820, selling: 830 },
    { currency: "GBP", buying: 910, selling: 920 },
  ]);
  const [accounts, setAccounts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data.slice(0, 5)); // Limit to 5 products
        setPayments(response.data.slice(0, 3)); // Limit to 3 payments
        setInvoices(response.data.slice(3, 6)); // Limit to 3 invoices
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUserAccounts = async () => {
      try {
        const userData = await fetchLoggedInUser();
        setUser(userData);

        // Fetch user accounts by user ID
        const accountsResponse = await axios.get(
          `${API_URL}/users/user/accounts/${userData._id}`
        );
        setAccounts(accountsResponse.data.userAccounts);
      } catch (error) {
        console.error("Error fetching user accounts:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const userData = await fetchLoggedInUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Unauthorized: No token found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/invoices`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setInvoices(response.data);
        setFilteredInvoices(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load invoices");
        setLoading(false);
      }
    };
    fetchData();
    fetchUser();
    fetchUserAccounts();
    fetchInvoices();
  }, [page, limit]);

  const pageSizeOptions = [5, 10, 20, 50, 100];

  const columns = [
    { field: "_id", headerName: "Invoice ID", width: 200 },
    { field: "customerId", headerName: "Customer ID", width: 150 },
    { field: "amount", headerName: "Amount ($)", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) =>
        params.row.status === "pending" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => markInvoiceAsPaid(params.row._id)}
          >
            Mark as Paid
          </Button>
        ) : (
          <Button variant="contained" disabled>
            Paid
          </Button>
        ),
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    navigate(`/dashboard?action=${action}`);
    handleClose(); // Close the dropdown
  };

  const markInvoiceAsPaid = async (invoiceId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${API_URL}/invoices/mark-as-paid/${invoiceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI state - set invoice to 'paid'
      setFilteredInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice._id === invoiceId ? { ...invoice, status: "paid" } : invoice
        )
      );
      setTimeout(() => {
        navigate("/transactions");
      }, 1000);
    } catch (error) {
      console.error("Error marking invoice as paid", error);
      alert("Failed to mark invoice as paid!");
    }
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
    <Box
      sx={{
        //   padding: "5px",
        maxWidth: "77vw", //overall width of the page
        //   width: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
        overscrollBehaviorX: "contain",

        // boxSizing: "border-box",
        height: "2000px",
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "left",
          backgroundColor: "#fff",
          padding: "26px",
          borderRadius: "0px",
          boxShadow: "0 0.5px 0.5px rgba(0, 0, 0.0)",
          marginBottom: "20px",
          height: "11vh",
          marginLeft: "0px",
          maxWidth: "auto",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Welcome {user ? user.fullName : "Loading..."}
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.7)" }}>
            Good morning, have a great day!
          </Typography>
        </Box>

        <Box>
          <Button
            variant="contained"
            onClick={handleClick}
            startIcon={<ArrowDropDownIcon />}
            sx={{
              backgroundColor: "#fff",
              padding: "8px",
              color: "#000",
              textTransform: "none",
              fontSize: "15px",
              marginRight: "20px",
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
                <DescriptionOutlinedIcon fontSize="small" />
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
              Create Invoice
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Account Balance */}
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: "2px",
          marginBottom: "18px",
          width: "auto",
          marginLeft: "10px",
          marginTop: "5px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Accounts
        </Typography>
        <Divider sx={{ marginY: 2 }} />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
          }}
        >
          {user?.userAccounts && user.userAccounts.length > 0 ? (
            user.userAccounts.map((account, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 0,
                  width: "200px",
                  boxShadow: "0 0px 4px rgba(0, 0, 0.1, 0.1)",
                  borderRadius: "10px",
                }}
              >
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    marginBottom: 1,
                    backgroundColor: "#007bff",
                  }}
                >
                  {account.currency}
                </Avatar>
                <CardContent sx={{ textAlign: "center", padding: 0 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                  >
                    {account.bankName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {account.accountName}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {account.accountNumber}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No accounts available.</Typography>
          )}
        </Box>
      </Paper>

      {/* Quick Actions */}
      <Paper
        elevation={3}
        sx={{
          padding: 1.6,
          backgroundColor: "#fff",
          borderRadius: "0px",
          width: "auto",
          marginLeft: "10px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 0 }}>
          Quick Actions
        </Typography>
        <Divider sx={{ marginY: 1.5 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<MonetizationOnOutlinedIcon />}
            onClick={() => handleMenuClick("send-money")}
            sx={{
              flex: 0.4,
              backgroundColor: "#007bff",
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              paddingBottom: "20px",
              paddingTop: "20px",
            }}
          >
            Send Money
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleMenuClick("convert-funds")}
            sx={{
              flex: 0.4,
              backgroundColor: "#28a745",
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Convert Funds
          </Button>
          <Button
            variant="outlined"
            startIcon={<ReceiptOutlinedIcon />}
            onClick={() => handleMenuClick("create-invoice")}
            sx={{
              flex: 0.4,
              backgroundColor: "#ffc107",
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Create Invoice
          </Button>
        </Box>
      </Paper>

      {/* Receive Payments & Invoices */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          marginTop: "20px",
          marginBottom: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {/* Receive Payments */}
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            backgroundColor: "#fff",
            width: "48%",
            marginTop: "15px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Receive Payments
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <List>
            {payments.map((payment, index) => (
              <ListItem key={index} sx={{ paddingBottom: 1 }}>
                <ListItemAvatar>
                  <Avatar
                    src={payment.image}
                    alt={payment.title}
                    sx={{ width: 50, height: 50 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={payment.title}
                  secondary={`Amount: $${payment.price.toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Invoice Table */}
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            backgroundColor: "#fff",
            width: "48%",
            marginTop: "15px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Invoices
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : filteredInvoices.length === 0 ? (
            <Box sx={{ textAlign: "center", padding: "40px" }}>
              <SentimentDissatisfiedIcon
                sx={{
                  fontSize: "40px",
                  color: "#ccc",
                  marginBottom: "10px",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  marginBottom: "10px",
                  color: "#555",
                  fontWeight: "bold",
                }}
              >
                No invoices found
              </Typography>
            </Box>
          ) : (
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={filteredInvoices}
                columns={columns}
                pageSize={limit}
                getRowId={(row) => row._id}
                loading={loading}
                disableSelectionOnClick
                pagination
                paginationMode="client"
                // rowCount={25}
                pageSizeOptions={pageSizeOptions}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => {
                  setLimit(newPageSize);
                  setPage(0);
                }}
              />
            </Box>
          )}
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => handleMenuClick("create-invoice")}
            sx={{
              marginTop: "16px",
              backgroundColor: "#007bff",
              color: "#fff",
              textTransform: "none",
              padding: "15px",
              width: "100%",
            }}
          >
            Create New Invoice
          </Button>
        </Paper>
      </Box>

      {/*Exchange Rates & Cards */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          marginTop: 8,
          marginLeft: "3px",
          marginRight: "30px",
          width: "100%",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            backgroundColor: "#fff",
            borderRadius: "0px",
            width: "75vh",
            margin: "-45px 0px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            Exchange Rates
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <List>
            {exchangeRates.map((rate, index) => (
              <ListItem key={index} sx={{ paddingBottom: 1 }}>
                <ListItemAvatar>
                  <Avatar>
                    <TrendingUpIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={rate.currency}
                  secondary={`Buying: $${rate.buying} | Selling: $${rate.selling}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            padding: 2,
            backgroundColor: "#fff",
            borderRadius: "2px",
            width: "39%",
            margin: "-45px 0px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Cards
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <CreditCardIcon
              sx={{ fontSize: 64, color: "gray", marginBottom: 2 }}
            />
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              No cards yet
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginBottom: 2 }}
            >
              Once you create your card, It will appear here
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                backgroundColor: "#007bff",
                color: "#fff",
                textTransform: "none",
                width: "80%",
                padding: "10px",
              }}
            >
              Create New Card
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardContent;

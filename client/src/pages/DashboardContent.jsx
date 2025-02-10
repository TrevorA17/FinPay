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
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import axios from "axios";

// Importing dynamic components for Quick Actions Menu
import SendMoney from "../components/SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";
import { fetchLoggedInUser } from "../api/userApi";
import CreateCustomer from "./../components/CreateNewCustomer";

const DashboardContent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null); // State for logged-in user
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [activePage, setActivePage] = useState(null); // Declare activePage state
  const [invoices, setInvoices] = useState([]);
  const [exchangeRates] = useState([
    { currency: "USD", buying: 750, selling: 760 },
    { currency: "EUR", buying: 820, selling: 830 },
    { currency: "GBP", buying: 910, selling: 920 },
  ]);

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

    const fetchUser = async () => {
      try {
        const userData = await fetchLoggedInUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
    fetchUser();
  }, []);

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
    case "Create Customer":
      return <CreateCustomer />;
    case "Convert Funds":
      return <ConvertFunds />;
    case "Create Invoice":
      return <CreateInvoice />;
    default:
      return (
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "right",
            padding: "5px",
            height: "250%",
          }}
        >
          {/* Top Bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "left",
              backgroundColor: "#fff",
              padding: "22px",
              borderRadius: "0px",
              boxShadow: "0 0.5px 0.5px rgba(0, 0, 0.0)",
              marginBottom: "20px",
              height: "11vh",
              marginLeft: "0px",
              width: "100%",
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
              >
                <MenuItem onClick={() => handleMenuClick("Send Money")}>
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  Send Money
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("Create Customer")}>
                  <ListItemIcon>
                    <DescriptionOutlinedIcon fontSize="small" />
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
              width: "99%",
              marginLeft: "0px",
              marginTop: "-5px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Account Balance
            </Typography>
            <Divider sx={{ marginY: 2 }} />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
              }}
            >
              {products.map((product) => (
                <Card
                  key={product.id}
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
                    src={product.image}
                    alt={product.title}
                    sx={{
                      width: 50,
                      height: 50,
                      marginBottom: 1,
                    }}
                  />
                  <CardContent sx={{ textAlign: "center", padding: 0 }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      {product.title.split(" ").slice(0, 1).join(" ")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Available Balance
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>

          {/* Quick Actions */}
          <Paper
            elevation={3}
            sx={{
              padding: 1.6,
              backgroundColor: "#fff",
              borderRadius: "0px",
              width: "100%",
              marginLeft: "0px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 0 }}
            >
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
                onClick={() => handleMenuClick("Send Money")}
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
                onClick={() => handleMenuClick("Convert Funds")}
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
                onClick={() => handleMenuClick("Create Invoice")}
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
          <Box sx={{ display: "flex", gap: 2, marginRight: "250px" }}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                backgroundColor: "#fff",
                borderRadius: "0px",
                width: "90%",
                marginTop: "15px",
                marginRight: "250px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
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

            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: "#fff",
                borderRadius: "2px",
                width: "70%",
                marginTop: "20px",
                marginLeft: "-250px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Invoices
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <List>
                {invoices.map((invoice, index) => (
                  <ListItem key={index} sx={{ paddingBottom: 1 }}>
                    <ListItemText
                      primary={`Invoice #${index + 1}`}
                      secondary={`Status: Pending | Amount: $${invoice.price.toFixed(
                        2
                      )}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => handleMenuClick("Create Invoice")}
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
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
              >
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
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
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
  }
};
export default DashboardContent;

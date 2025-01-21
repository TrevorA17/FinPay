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
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

const DashboardContent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);

  // Fetch dummy data for cards and boxes
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

    fetchData();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "21px",
          borderRadius: "0px",
          boxShadow: "0 4px 6px rgba(0, 0, 0.9, 0.1)",
          marginBottom: "20px",
          height: "76px",
          marginLeft: "-5px",
          width: "94%",
        }}
      >
        {/* Left Section: Welcome Message */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Welcome Olivia
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.7)" }}>
            Good morning, have a great day!
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
              mt: "-45px", // Adjust position of the dropdown
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Send Money
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DescriptionOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Fund Wallet
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Convert Funds
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Create New Invoice
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Account Balance Box */}
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: "2px",
          marginBottom: "20px",
          width: "94%",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "left" }}
        >
          Account Balance
        </Typography>
        <Divider sx={{ marginY: 2 }} />

        {/* Horizontal Cards */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            justifyContent: "center",
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                width: "150px",
                boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
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
              <CardContent sx={{ textAlign: "center", padding: 0, flexGrow: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    marginBottom: 1,
                  }}
                >
                  {product.title.split(" ").slice(0, 1).join(" ")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Available Balance
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>

      {/* Quick Actions Box */}
      <Paper
        elevation={3}
        sx={{
          padding: 1.6,
          backgroundColor: "#fff",
          borderRadius: "0px",
          width: "95%",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "left" }}>
          Quick Actions
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<MonetizationOnOutlinedIcon />}
            sx={{
              flex: 0.4,
              backgroundColor: "#007bff",
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              padding: "2px",
            }}
          >
            Send Money
          </Button>
          <Button
            variant="contained"
            startIcon={<AutorenewOutlinedIcon />}
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
            variant="contained"
            startIcon={<ReceiptOutlinedIcon />}
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

      {/* Receive Payments Box */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
        }}
      >
        {/* Left Box */}
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            backgroundColor: "#fff",
            borderRadius: "0px",
            width: "40%",
            marginTop: "30px"
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "left" }}
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
                    sx={{
                      width: 50,
                      height: 50,
                    }}
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

        {/* Right Box */}
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            backgroundColor: "#fff",
            borderRadius: "2px",
            width: "40%",
            marginTop: "30px"
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "left" }}
          >
            Invoices
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <List>
            {invoices.map((invoice, index) => (
              <ListItem key={index} sx={{ paddingBottom: 1 }}>
                <ListItemText
                  primary={`Invoice #${index + 1}`}
                  secondary={`Status: Pending | Amount: $${invoice.price.toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              marginTop: "16px",
              backgroundColor: "#007bff",
              color: "#fff",
              textTransform: "none",
              padding: "15px",
              width: "100%"
            }}
          >
            Create New Invoice
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardContent;

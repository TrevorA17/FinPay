import React, { useState } from "react";
import axios from "axios";
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
  Alert,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import SendMoney from "./SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import CreateCustomer from "./CreateNewCustomer";
import CustomerDropdown from "./CustomerDropdown";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePage, setActivePage] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [currency, setCurrency] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [includeVAT, setIncludeVAT] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
  };

  const handleMenuClick = (page) => {
    setActivePage(page); // Set the active page dynamically
    handleClose(); // Close the dropdown
  };
  const handleTopBarClose = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateInvoice = async () => {
    setError("");
    setSuccessMessage("");

    if (
      !selectedCustomer ||
      !issueDate ||
      !dueDate ||
      !itemDescription ||
      !quantity ||
      !unitPrice
    ) {
      setError("All fields are required.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication error. Please log in.");
      return;
    }

    const parsedQuantity = parseInt(quantity);
    const parsedUnitPrice = parseFloat(unitPrice);
    const total = parsedQuantity * parsedUnitPrice;
    const vatAmount = includeVAT ? total * 0.15 : 0;

    try {
      await axios.post(
        "http://localhost:5000/api/invoices",
        {
          customerId: selectedCustomer,
          issueDate,
          dueDate,
          invoiceItems: [
            {
              description: itemDescription,
              quantity: parsedQuantity,
              unitPrice: parsedUnitPrice,
              total: total + vatAmount,
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage("Invoice created successfully!");
      setSelectedCustomer("");
      setIssueDate("");
      setDueDate("");
      setItemDescription("");
      setQuantity("");
      setUnitPrice("");
      setIncludeVAT(false);
    } catch (error) {
      setError(error.response?.data?.message || "Error creating invoice.");
    }
  };

  switch (activePage) {
    case "Send Money":
      return <SendMoney />;
    case "Create Customer":
      return <CreateCustomer />;
    case "Create Invoice":
      return <CreateInvoice />;
    default:
      return (
        <Box>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              padding: "40px",
              marginBottom: "20px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              New Invoice
            </Typography>
            <Button
              variant="contained"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              startIcon={<ArrowDropDownIcon />}
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

          {/* Invoice Form */}
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Customer Selection */}
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                width: "40%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Create Invoice
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1">Select Customer</Typography>
              <CustomerDropdown onSelect={handleCustomerSelect} />
              {selectedCustomer && (
                <Typography sx={{ mt: 1 }}>
                  Selected: {selectedCustomer}
                </Typography>
              )}
            </Box>

            {/* Invoice Information */}
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                width: "40%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Invoice Information
              </Typography>
              <Divider sx={{ my: 1 }} />
              <TextField
                fullWidth
                type="date"
                label="Issue Date"
                variant="outlined"
                sx={{ mt: 2 }}
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                variant="outlined"
                sx={{ mt: 2 }}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Box>
          </Box>

          {/* Items Section */}
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              margin: "20px auto",
              width: "60%",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Item Description
            </Typography>
            <Divider sx={{ my: 2 }} />
            <TextField
              fullWidth
              label="Item Description*"
              variant="outlined"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            />
            <TextField
              fullWidth
              label="Quantity*"
              variant="outlined"
              sx={{ mt: 2 }}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              fullWidth
              label="Amount Per Quantity*"
              variant="outlined"
              sx={{ mt: 2 }}
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
            <Divider sx={{ my: 2 }} />
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeVAT}
                  onChange={(e) => setIncludeVAT(e.target.checked)}
                />
              }
              label="Include VAT?"
            />
          </Box>

          {/* Error / Success Messages */}
          {error && (
            <Alert severity="error" sx={{ width: "60%", margin: "10px auto" }}>
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert
              severity="success"
              sx={{ width: "60%", margin: "10px auto" }}
            >
              {successMessage}
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateInvoice}
            sx={{ width: "75%", mt: 2, display: "block", mx: "auto" }}
          >
            Create Invoice
          </Button>
        </Box>
      );
  }
};

export default CreateInvoice;

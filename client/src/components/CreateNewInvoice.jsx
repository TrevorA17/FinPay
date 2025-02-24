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
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import CustomerDropdown from "./CustomerDropdown";

//quick actions imports
import SendMoney from "./SendMoney";
import CreateCustomer from "./CreateNewCustomer";
import ConvertFunds from "./ConvertFunds";

const CreateInvoice = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePage, setActivePage] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [includeVAT, setIncludeVAT] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
  };

  const handleMenuClick = (page) => {
    setActivePage(page);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => setAnchorEl(event.currentTarget);

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
      setOpenSnackbar(true);
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication error. Please log in.");
      setOpenSnackbar(true);
      return;
    }

    const parsedQuantity = parseInt(quantity);
    const parsedUnitPrice = parseFloat(unitPrice);
    const total = parsedQuantity * parsedUnitPrice;
    const vatAmount = includeVAT ? total * 0.16 : 0;

    try {
      await axios.post(
        `${API_URL}/invoices`,
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
      setOpenSnackbar(true);

      // Clear form fields
      setSelectedCustomer("");
      setIssueDate("");
      setDueDate("");
      setItemDescription("");
      setQuantity("");
      setUnitPrice("");
      setIncludeVAT(false);

      setTimeout(() => {
        navigate("/invoices");
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || "Error creating invoice.");
      setOpenSnackbar(true);
    }
  };

  switch (activePage) {
    case "Send Money":
      return <SendMoney />;
    case "Create Customer":
      return <CreateCustomer />;
    case "Convert Funds":
      return <ConvertFunds />;
    default:
      return (
        <Box>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              padding: "38px",
              marginBottom: "20px",
              boxShadow: "0 0.5px 0.5px rgba(0, 0, 0.0)",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Create New Invoice
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowDropDownIcon />}
              onClick={handleClick}
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                textTransform: "none",
                fontSize: "14px",
                padding: "8px 12px",
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
                sx={{ mt: 2 }}
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
              <TextField
                fullWidth
                type="date"
                label="Due Date"
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
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            />
            <TextField
              fullWidth
              label="Quantity*"
              sx={{ mt: 2 }}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              fullWidth
              label="Amount Per Quantity*"
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

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateInvoice}
            sx={{ width: "75%", mt: 2, display: "block", mx: "auto" }}
          >
            Create Invoice
          </Button>

          {/* Snackbar for messages */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert severity={error ? "error" : "success"}>
              {error || successMessage}
            </Alert>
          </Snackbar>
        </Box>
      );
  }
};
export default CreateInvoice;

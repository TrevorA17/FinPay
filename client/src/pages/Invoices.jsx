import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  Menu,
  MenuItem,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_URL; // Ensure this is set in your .env file

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const token = useSelector((state) => state.auth.token); // Get user token

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Fetch invoices from backend
  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${API_URL}/invoices`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoices(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load invoices");
      setLoading(false);
    }
  };

  // Mark an invoice as paid
  const markAsPaid = async (invoiceId) => {
    try {
      await axios.put(
        `${API_URL}/invoices/${invoiceId}/pay`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI immediately
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice._id === invoiceId ? { ...invoice, status: "paid" } : invoice
        )
      );
    } catch (error) {
      setError("Failed to update invoice");
    }
  };

  // Handle search filter
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.customerId?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          padding: "35px",
          borderRadius: "0px",
          boxShadow: "0 0.5px 0.5px rgba(0, 0, 0, 0.0)",
          marginBottom: "30px",
          marginLeft: "-5px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Invoices
        </Typography>
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
          sx={{ mt: "-45px" }}
        >
          <MenuItem>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Send Money
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DescriptionOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Fund Wallet
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Convert Funds
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Create New Invoice
          </MenuItem>
        </Menu>
      </Box>

      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "10px 20px",
          borderRadius: "0px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search for an invoice"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginRight: "10px" }}
        />
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#000",
            color: "#fff",
            fontWeight: "bold",
            padding: "20px 20px",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Filter
        </Button>
      </Box>

      {/* Invoice Table */}
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {filteredInvoices.length === 0 ? (
        <Box sx={{ textAlign: "center", padding: "50px" }}>
          <SentimentDissatisfiedIcon
            sx={{ fontSize: "48px", color: "#ccc", marginBottom: "10px" }}
          />
          <Typography
            variant="h6"
            sx={{ marginBottom: "15px", color: "#555", fontWeight: "bold" }}
          >
            No payments
          </Typography>
          <Typography sx={{ marginBottom: "10px", color: "#555" }}>
            Once you have any payment, the information appears here
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#007BFF", color: "#fff" }}
          >
            New Invoice
          </Button>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice._id}>
                  <TableCell>{invoice._id}</TableCell>
                  <TableCell>{invoice.customerId?.name || "Unknown"}</TableCell>
                  <TableCell>${invoice.amount}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {invoice.status === "pending" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => markAsPaid(invoice._id)}
                      >
                        Mark as Paid
                      </Button>
                    ) : (
                      <Button variant="contained" disabled>
                        Paid
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Invoices;

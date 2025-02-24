import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Paper,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//Quick actions imports
import SendMoney from "../components/SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";
import CreateCustomer from "../components/CreateNewCustomer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Invoices = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  // Handle menu selection by updating the URL
  const handleMenuClick = (action) => {
    navigate(`/invoices?action=${action}`); // Update URL with query param
    handleClose();
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

  useEffect(() => {
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

    if (location.state?.refresh) {
      fetchInvoices(); // Re-fetch invoices when navigating
    }

    fetchInvoices();
  }, [page, limit, location]);

  // Extract action from URL query params
  const searchParams = new URLSearchParams(location.search);
  const activePage = searchParams.get("action");

  // Render components based on activePage
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
  const columns = [
    { field: "_id", headerName: "Invoice ID", width: 200 },
    { field: "customerId", headerName: "Customer ID", width: 150 },
    { field: "amount", headerName: "Amount ($)", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
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
  const pageSizeOptions = [5, 10, 20, 50, 100];

  return (
    <Box sx={{ maxWidth: "77vw", overflowX: "hidden", overflowY: "hidden" }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "38px",
          boxShadow: "0 0.5px 0.5px rgba(0, 0, 0.0)",
          marginBottom: "20px",
          flexWrap: "wrap",
          maxWidth: "100%",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Invoices
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
      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: "15px",
          gap: "10px",
          flexWrap: "wrap",
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search for an invoice"
          variant="outlined"
          sx={{ maxWidth: "70%" }} // Reduce width
        />
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#000",
            color: "#fff",
            fontWeight: "bold",
            padding: "8px 12px", // Reduced padding
            "&:hover": { backgroundColor: "#333" },
            whiteSpace: "nowrap",
          }}
        >
          Filter
        </Button>
      </Box>
      {/* Invoice Table */}
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && filteredInvoices.length === 0 ? (
        <Box sx={{ textAlign: "center", padding: "40px" }}>
          <SentimentDissatisfiedIcon
            sx={{ fontSize: "40px", color: "#ccc", marginBottom: "10px" }}
          />
          <Typography
            variant="h6"
            sx={{ marginBottom: "10px", color: "#555", fontWeight: "bold" }}
          >
            No invoices found
          </Typography>
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
              width: "auto",
            }}
          >
            Create New Invoice
          </Button>
        </Box>
      ) : (
        <Paper
          sx={{
            height: 400,
            width: "100%",
            overflowX: "auto",
            maxWidth: "100%",
          }}
        >
          <DataGrid
            rows={filteredInvoices}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={limit}
            pagination
            paginationMode="client"
            pageSizeOptions={pageSizeOptions}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => {
              setLimit(newPageSize);
              setPage(0);
            }}
          />
        </Paper>
      )}
    </Box>
  );
};

export default Invoices;

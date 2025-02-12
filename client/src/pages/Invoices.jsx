import React, { useEffect, useState } from "react";
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

import SendMoney from "../components/SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";
import CreateCustomer from "../components/CreateNewCustomer";

const API_URL = import.meta.env.VITE_API_URL;

const SIDEBAR_WIDTH = -20;

const Invoices = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [activePage, setActivePage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClick = (page) => {
    setActivePage(page);
    handleClose();
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

    fetchInvoices();
  }, []);

  if (activePage) {
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
        break;
    }
  }

  const columns = [
    { field: "_id", headerName: "Invoice ID", width: 200 },
    { field: "customerId", headerName: "Customer ID", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 180 },
    { field: "amount", headerName: "Amount ($)", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) =>
        params.row.status === "pending" ? (
          <Button variant="contained" color="primary">
            Mark as Paid
          </Button>
        ) : (
          <Button variant="contained" disabled>
            Paid
          </Button>
        ),
    },
  ];

  return (
    <Box
      sx={{
        marginLeft: `${SIDEBAR_WIDTH}px`, // Respect sidebar width
        padding: "20px",
        maxWidth: "1008px", //overall width of the page
        width: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "28px", // Reduced padding
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
          <MenuItem onClick={() => handleMenuClick("Send Money")}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>{" "}
            Send Money
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("Create Customer")}>
            <ListItemIcon>
              <DescriptionOutlinedIcon fontSize="small" />
            </ListItemIcon>{" "}
            Create Customer
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("Convert Funds")}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>{" "}
            Convert Funds
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("Create Invoice")}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>{" "}
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
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Paper>
      )}
    </Box>
  );
};

export default Invoices;

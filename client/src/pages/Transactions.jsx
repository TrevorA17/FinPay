import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  TextField,
  Paper,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

//Quick actions imports
import SendMoney from "../components/SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";
import CreateCustomer from "../components/CreateNewCustomer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const TransactionsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // Get the token from localStorage (or wherever you're storing it)
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found.");
        }

        // Set up headers with the Authorization token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Make the GET request with the token
        const response = await axios.get(`${API_URL}/transactions`, config);

        // Set transactions from the response
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transactions. Please try again later.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page, limit]);

  const pageSizeOptions = [5, 10, 20, 50, 100];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    navigate(`/transactions?action=${action}`);
    handleClose();
  };

  const handleFilterClick = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorElFilter(null);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    (transaction.customerName || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: "_id", headerName: "Transaction ID", width: 200 },
    {
      field: "invoiceId",
      headerName: "Invoice ID",
      width: 200,
    },
    { field: "customerId", headerName: "Customer ID", flex: 1 },

    {
      field: "amount",
      headerName: "Amount",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];

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
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "38px",
          boxShadow: "0 0.5px 0.5px rgba(0, 0, 0.0)",
          marginBottom: "20px",
          marginLeft: "-5px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Transactions
        </Typography>
        <Button
          variant="contained"
          onClick={handleClick}
          startIcon={<ArrowDropDownIcon />}
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            textTransform: "none",
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
              <DashboardIcon fontSize="small" />
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
            Create New Invoice
          </MenuItem>
        </Menu>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a transaction"
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <SearchIcon />
                </Box>
              ),
            },
          }}
        />

        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleFilterClick}
        >
          Filter
        </Button>
        <Menu
          anchorEl={anchorElFilter}
          open={Boolean(anchorElFilter)}
          onClose={handleFilterClose}
        >
          <MenuItem onClick={() => setSearchTerm("")}>Clear Filter</MenuItem>
        </Menu>
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Paper>
            <DataGrid
              rows={filteredTransactions}
              columns={columns}
              pageSize={limit}
              getRowId={(row) => row._id}
              disableSelectionOnClick
              sx={{ backgroundColor: "#fff" }}
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
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default TransactionsPage;

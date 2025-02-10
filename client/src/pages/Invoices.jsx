import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
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
  TextField,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

// Importing dynamic components for Quick Actions Menu
import SendMoney from "../components/SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";
import CreateCustomer from "./../components/CreateNewCustomer";

const Invoices = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [activePage, setActivePage] = useState(null); // Declare activePage state
  const [loading, setLoading] = useState(true); // Ensure this is set to true initially
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (page) => {
    setActivePage(page); // Set the active page dynamically
    handleClose(); // Close the dropdown
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found in localStorage");
          setError("Unauthorized: No token found");
          setLoading(false);
          return;
        }

        console.log("Fetching invoices with token:", token);

        const response = await axios.get("http://localhost:5000/api/invoices", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Invoices fetched successfully:", response.data);

        setInvoices(response.data);
        setFilteredInvoices(response.data);
        setLoading(false); // Stop loading after successful fetch
      } catch (error) {
        console.error(
          "Error fetching invoices:",
          error.response?.data || error.message
        );
        setError(error.response?.data?.message || "Failed to load invoices");
        setLoading(false); // Stop loading on error
      }
    };

    fetchInvoices();
  }, []);

  // Filtering function
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredInvoices(invoices);
    } else {
      const filtered = invoices.filter((invoice) =>
        invoice.customerId?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredInvoices(filtered);
    }
  }, [searchQuery, invoices]);

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
              startIcon={<ArrowDropDownIcon />}
              onClick={handleClick}
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

          {!loading && filteredInvoices.length === 0 ? (
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
                    <TableCell>Customer ID</TableCell>
                    <TableCell>Customer Name</TableCell>
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
                      <TableCell>{invoice.customerId || "Null"}</TableCell>
                      <TableCell>
                        {invoice.customerId?.name || "Null"}
                      </TableCell>
                      <TableCell>${invoice.amount}</TableCell>
                      <TableCell>{invoice.status}</TableCell>
                      <TableCell>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {invoice.status === "pending" ? (
                          <Button variant="contained" color="primary">
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
  }
};
export default Invoices;

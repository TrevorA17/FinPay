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
import { DataGrid } from "@mui/x-data-grid"; // Importing MUI DataGrid
import axios from "axios";

import SendMoney from "../components/SendMoney";
import FundWallet from "../components/FundWallet";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";

const TransactionsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElFilter, setAnchorElFilter] = useState(null); // For filter dropdown
  const [activePage, setActivePage] = useState(null); // Declare activePage state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState(""); // For filtering by category

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
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

  const handleFilterClick = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleFilterClose = (category) => {
    setAnchorElFilter(null);
    setFilterCategory(category || ""); // Set the selected category or reset the filter
  };

  // Handle search and filter
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      filterCategory ? product.category === filterCategory : true
    );

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Product Name", flex: 1 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "category", headerName: "Category", width: 180 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleViewDetails(params.row.id)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const handleViewDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setSelectedProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch product details. Please try again later.");
      setLoading(false);
    }
  };

  switch (activePage) {
    case "Send Money":
      return <SendMoney />;
    case "Fund Wallet":
      return <FundWallet />;
    case "Convert Funds":
      return <ConvertFunds />;
    case "Create Invoice":
      return <CreateInvoice />;

    default:
      return (
        <Box>
          {/* Welcome Box */}
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
              <MenuItem onClick={() => handleMenuClick("Send Money")}>
                <ListItemIcon>
                  <DashboardIcon fontSize="small" />
                </ListItemIcon>
                Send Money
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("Fund Wallet")}>
                <ListItemIcon>
                  <DashboardIcon fontSize="small" />
                </ListItemIcon>
                Fund Wallet
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

          {/* Search and Filter Section */}
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
              InputProps={{
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
              onClose={() => handleFilterClose()}
            >
              <MenuItem onClick={() => handleFilterClose("")}>All</MenuItem>
              <MenuItem onClick={() => handleFilterClose("electronics")}>
                Electronics
              </MenuItem>
              <MenuItem onClick={() => handleFilterClose("jewelery")}>
                Jewelery
              </MenuItem>
              <MenuItem onClick={() => handleFilterClose("men's clothing")}>
                Men's Clothing
              </MenuItem>
              <MenuItem onClick={() => handleFilterClose("women's clothing")}>
                Women's Clothing
              </MenuItem>
            </Menu>
          </Box>

          {/* DataGrid */}
          <Box sx={{ marginTop: "20px" }}>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <Paper>
                <DataGrid
                  rows={filteredProducts}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  sx={{ backgroundColor: "#fff" }}
                />
              </Paper>
            )}
          </Box>

          {/* Product Details Modal */}
          {selectedProduct && (
            <Box
              sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "8px",
                boxShadow: "0 0.5px 0.5px rgba(0, 0, 0.0)",
                zIndex: 10,
              }}
            >
              <Typography variant="h6">{selectedProduct.title}</Typography>
              <Typography>Price: ${selectedProduct.price}</Typography>
              <Typography>Category: {selectedProduct.category}</Typography>
              <Typography>
                Description: {selectedProduct.description}
              </Typography>
              <Button onClick={() => setSelectedProduct(null)}>Close</Button>
            </Box>
          )}
        </Box>
      );
  }
};

export default TransactionsPage;

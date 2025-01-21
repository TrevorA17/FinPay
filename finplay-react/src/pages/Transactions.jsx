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
import { DataGrid } from "@mui/x-data-grid"; // Importing MUI DataGrid
import axios from "axios";

const TransactionsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Handle search filter
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Product Name", flex: 1 },
    { field: "price", headerName: "Price", width: 150, valueFormatter: ({ value }) => `$${value}` },
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
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setSelectedProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch product details. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Welcome Box */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "35px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
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
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Send Money
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Fund Wallet
          </MenuItem>
        </Menu>
      </Box>

      {/* Search Bar */}
      <Box sx={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a transaction"
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <Box sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
                <SearchIcon />
              </Box>
            ),
          }}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
          Recent Transactions
        </Typography>

        {/* DataGrid */}
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Paper>
            <DataGrid
              rows={filteredProducts}
              columns={columns}
              pageSize={6}
              rowsPerPageOptions={[6]}
              autoHeight
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
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }}
        >
          <Typography variant="h6">{selectedProduct.title}</Typography>
          <Typography>Price: ${selectedProduct.price}</Typography>
          <Typography>Category: {selectedProduct.category}</Typography>
          <Typography>Description: {selectedProduct.description}</Typography>
          <Button onClick={() => setSelectedProduct(null)}>Close</Button>
        </Box>
      )}
    </Box>
  );
};

export default TransactionsPage;

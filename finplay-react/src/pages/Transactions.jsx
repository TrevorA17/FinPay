import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import axios from "axios";

const TransactionsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 6;

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

  const handlePageChange = (_, value) => {
    setPage(value);
  };

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
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Fund Wallet
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Fund Wallet
          </MenuItem>
        </Menu>
      </Box>

      {/* Search Bar and Recent Transactions */}
      <Box sx={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
      <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a transaction"
          sx={{ marginBottom: "20px" }}
          
        />

        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
          Recent Transactions
        </Typography>

        {/* Table */}
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleViewDetails(product.id)}>View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Box sx={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
              <Pagination 
                count={Math.ceil(products.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </TableContainer>
        )}

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
    </Box>
  );
};

export default TransactionsPage;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Card,
  CardContent,
  Avatar,
  Paper,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import axios from "axios";

const DashboardContent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch dummy data for cards
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data.slice(0, 5)); // Limit to 5 products
      } catch (error) {
        console.error("Error fetching products:", error);
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

  return (
    <Box>
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "0px",
          boxShadow: "0 4px 6px rgba(0, 0, 0.9, 0.1)",
          marginBottom: "20px",
          height: "76px",
          marginLeft: "-5px",
        }}
      >
        {/* Left Section: Welcome Message */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Welcome Olivia
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.7)" }}>
            Good morning, have a great day!
          </Typography>
        </Box>

        {/* Right Section: Quick Actions Button */}
        <Box>
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
            sx={{
              mt: "-45px", // Adjust position of the dropdown
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Send Money
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DescriptionOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Fund Wallet
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Convert Funds
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Create New Invoice
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Account Balance Box */}
      <Paper
        elevation={3}
        sx={{
          padding: 2.5,
          backgroundColor: "#fff",
          borderRadius: "2px",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "left" }}
        >
          Account Balance
        </Typography>

        {/* Horizontal Cards */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            justifyContent: "center",           
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                width: "150px",
                boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
              }}
            >
              {/* Icon */}
              <Avatar
                src={product.image}
                alt={product.title}
                sx={{
                  width: 50,
                  height: 50,
                  marginBottom: 1,
                }}
              />
              {/* Card Content */}
              <CardContent sx={{ textAlign: "center", padding: 0, flexGrow: 1 }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", textTransform: "capitalize", marginBottom: 1 }}
                >
                  {product.title.split(" ").slice(0, 1).join(" ")} {/* Limit title */}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Available Balance
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginTop: 1 }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardContent;

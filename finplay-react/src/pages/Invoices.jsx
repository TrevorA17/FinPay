import React, { useState } from "react";
import { Box, Typography, Button, TextField, InputAdornment,  Menu, MenuItem, ListItemIcon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; 
import DashboardIcon from "@mui/icons-material/Dashboard"; 
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"; 

const WelcomeBox = () => {
  const [activeMenu, setActiveMenu] = useState("All Invoices");

   const [anchorEl, setAnchorEl] = useState(null);
 
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
 
   const handleClose = () => {
     setAnchorEl(null);
   };

  const menuItems = [
    "All Invoices",
    "Draft",
    "Pending",
    "Processing",
    "Paid",
    "Due",
    "Overdue",
  ];

  return (
    <Box>
      {/* Welcome Box */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "0px",
          boxShadow: "0 0.5px 0.5px rgba(0, 0, 0.0)",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Invoices
        </Typography>
        <Button
          variant="contained"
          onClick={handleClick}
          startIcon={<ArrowDropDownIcon />} // Adds the drop-down arrow icon to the button
          sx={{
            backgroundColor: "#fff",
            padding: "10px",
            color: "#000",
            textTransform: "none", 
            fontSize : "15px"           
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
          {/* Menu Items with Icons */}
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" /> {/* Dashboard icon */}
            </ListItemIcon>
            Send Money
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DescriptionOutlinedIcon fontSize="small" /> {/* Invoices icon */}
            </ListItemIcon>
            Fund Wallet
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" /> {/* Dashboard icon */}
            </ListItemIcon>
            Convert Funds
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" /> {/* Dashboard icon */}
            </ListItemIcon>
            Create New Invoice
          </MenuItem>
        </Menu>
      </Box>

      {/* Search Bar Box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search for an invoice"
          variant="outlined"
          slots={{
            startAdornment: InputAdornment,
          }}
          slotProps={{
            startAdornment: {
              position: "start",
              children: <SearchIcon />,
            },
          }}
          sx={{
            marginRight: "10px",
          }}
        />
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#000",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Filter
        </Button>
      </Box>

      {/* Menu and Content Box */}
      <Box>
        {/* Menu */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "90px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "20px",
          }}
        >
          {menuItems.map((item) => (
            <Typography
              key={item}
              onClick={() => setActiveMenu(item)}
              sx={{
                cursor: "pointer",
                fontWeight: activeMenu === item ? "bold" : "normal",
                color: activeMenu === item ? "#007BFF" : "#555",
                borderBottom: activeMenu === item ? "3px solid #007BFF" : "none",
                paddingBottom: "5px",
                "&:hover": {
                  color: "#007BFF",
                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* Content for Selected Menu */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
            textAlign: "center",
          }}
        >
          {activeMenu === "All Invoices" && (
            <>
              <SentimentDissatisfiedIcon
                sx={{ fontSize: "48px", color: "#ccc", marginBottom: "10px" }}
              />
              <Typography
                variant="h6"
                sx={{ marginBottom: "10px", color: "#555" }}
              >
                No payments
              </Typography>
              <Typography
                variant="h9"
                sx={{ marginBottom: "10px", color: "#555" }}
              >
                Once you have any payment, the information appears here
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  textTransform: "none",
                  padding: "10px 40px",
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                }}
              >
                New Invoice
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeBox;

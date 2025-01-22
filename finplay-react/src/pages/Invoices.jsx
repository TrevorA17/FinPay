import React, { useState } from "react";
import { Box, Typography, Button, TextField, Menu, MenuItem, ListItemIcon } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; 
import DashboardIcon from "@mui/icons-material/Dashboard"; 
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"; 

//Importing dynamic components for Quick Actions Menu
import SendMoney from "../components/SendMoney";
import FundWallet from "../components/FundWallet";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";

const invoices = () => {
  const [activeMenu, setActiveMenu] = useState("All Invoices");
  const [activePage, setActivePage] = useState(null); // Declare activePage state
  

   const [anchorEl, setAnchorEl] = useState(null);
 
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
 
   const handleClose = () => {
     setAnchorEl(null);
   };
   const handleMenuClick = (page) => {
    setActivePage(page); // Set the active page dynamically
    handleClose();       // Close the dropdown
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

  switch (activePage) {
    case "Send Money":
      return <SendMoney />;
    case "Convert Funds":
      return <ConvertFunds />;
    case "Fund Wallet":
      return <FundWallet />;
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
          padding: "35px",
          borderRadius: "0px",
          boxShadow: "0 0.5px 0.5px rgba(0, 0, 0.0)",
          marginBottom: "30px",
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
          <MenuItem onClick={() => handleMenuClick("Send Money")}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" /> {/* Dashboard icon */}
            </ListItemIcon>
            Send Money
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("Fund Wallet")}>
            <ListItemIcon>
              <DescriptionOutlinedIcon fontSize="small" /> {/* Invoices icon */}
            </ListItemIcon>
            Fund Wallet
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("Convert Funds")}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" /> {/* Dashboard icon */}
            </ListItemIcon>
            Convert Funds
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("Create Invoice")}>
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
          borderRadius: "0px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search for an invoice"
          variant="outlined"
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
            padding: "20px 20px",
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
            paddingBottom: "30px",
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
            padding: "100px",
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
                sx={{ marginBottom: "15px", color: "#555", fontWeight:"bold" }}
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
};

export default invoices;

import React, { useState } from "react";
import { Avatar, Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import WalletIcon from "@mui/icons-material/Wallet";
import TransactionIcon from "@mui/icons-material/AccountBalanceWallet";

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Menu items data
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Invoices", icon: <ReceiptIcon /> },
    { text: "Cards", icon: <CreditCardIcon /> },
    { text: "Wallets", icon: <WalletIcon /> },
    { text: "Transactions", icon: <TransactionIcon /> },
  ];

  // Handle button click to update selected item
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#8833da", // Sidebar color
        color: "#fff", // Default text color
        width: "260px", // Sidebar width
        height: "175%", // Sidebar height
        position: "absolute", // Fixed positioning
        top: "126px", // Position below the header
        left: 0, // Align to the left
        paddingTop: "15px", // Top padding
        borderBottomRightRadius: "15px", // Rounded bottom-right corner
        display: "flex", // Flexbox for alignment
        flexDirection: "column", // Stack items vertically
        alignItems: "center", // Center items horizontally
      }}
    >
      <List sx={{ width: "100%" }}>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "240px",
              padding: "10px 30px", // Add padding for spacing
              marginBottom: "10px", // Add space between buttons
              borderRadius: "10px", // Rounded corners for buttons
              "&.Mui-selected": {
                backgroundColor: "#be8bea", // Selected background color
                color: "#fff", // Selected text color
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#ffffff", // Hover color for selected item
                color: "#000000", // Text color on hover
              },
              "&:hover": {
                backgroundColor: "#ffffff", // Hover background color
                color: "black", // Hover text color
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedIndex === index ? "#fff" : "#ffffff", // Dynamic icon color
                justifyContent: "center",
                marginRight: "0px", // Add spacing between icon and text
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ textAlign: "left" }} />
          </ListItemButton>
        ))}
      </List>
      {/* Profile Section */}
  <Box
    sx={{
      width: "100%",
      borderTop: "1px solid #fff", // Divider between list and profile
      padding: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "350px"
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* Dummy Avatar */}
      <Avatar
        src=""
        alt="User Avatar"
        sx={{
          width: 50,
          height: 50,
          marginRight: 2,
          border: "2px solid #fff", // Optional border around avatar
          textTransform: "none",
        "&:hover": {},
        cursor: "pointer", // Pointer on hover
        }}
      />
      <Box>
        {/* Dummy Username and Email */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Olivia Rhye
        </Typography>
        <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
          olivia@untitledui.com
        </Typography>
      </Box>
    </Box>
    <Button
      variant="text"
      sx={{
        color: "#fff",
        textTransform: "none",
        "&:hover": {
          color: "#8833da", // Change button color on hover
          backgroundColor: "#fff", // Background on hover
        },
        cursor: "pointer", // Pointer on hover
      }}
    >
      My Profile
    </Button>
  </Box>
      
    </Box>

    
  );
};

export default Sidebar;


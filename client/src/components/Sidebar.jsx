import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import Link
import {
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
import WalletIcon from "@mui/icons-material/Wallet";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import SecurityIcon from "@mui/icons-material/Security";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { fetchLoggedInUser } from "../api/userApi";

const Sidebar = () => {
  const [user, setUser] = useState({ fullName: "", email: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Menu items data
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Invoices", icon: <DescriptionOutlinedIcon />, path: "/invoices" },
    // { text: "Cards", icon: <CreditCardIcon />, path: "/cards" },
    { text: "Wallets", icon: <WalletIcon />, path: "/wallets" },
    {
      text: "Transactions",
      icon: <CompareArrowsOutlinedIcon />,
      path: "/transactions",
    },
    { text: "My Profile", icon: <PersonIcon />, path: "/profile" },
    // { text: "Beneficiaries", icon: <Diversity1Icon />, path: "/beneficiaries" },
    // {
    //   text: "Identification",
    //   icon: <FingerprintIcon />,
    //   path: "/identification",
    // },
    { text: "Manage Accounts", icon: <FingerprintIcon />, path: "/accounts" },
    { text: "Security", icon: <SecurityIcon />, path: "/security" },
  ];

  useEffect(() => {
    // Find the index of the menu item that matches the current path
    const currentIndex = menuItems.findIndex(
      (item) => item.path === location.pathname
    );
    if (currentIndex !== -1) {
      setSelectedIndex(currentIndex);
    }
  }, [location.pathname]); // Update selectedIndex when location changes

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchLoggedInUser();
      if (userData) setUser(userData);
    };

    getUser();
  }, []);

  // Handle button click to update selected item
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token
    dispatch(logout()); // Update Redux state
    navigate("/login"); // Redirect to login
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#8833da",
          color: "#fff",
          width: "260px",
          height: "125px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1000,
          borderTopRightRadius: "15px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "30px",
            fontWeight: "bold",
            fontFamily: "Verdana, Helvetica, sans-serif",
          }}
        >
          FinPay
        </h1>
      </Box>

      {/* Sidebar Menu */}
      <Box
        sx={{
          backgroundColor: "#8833da",
          color: "#fff",
          width: "260px",
          height: "350vh",
          position: "absolute",
          top: "126px",
          left: 0,
          paddingTop: "15px",
          borderBottomRightRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <List sx={{ width: "100%" }}>
          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              style={{ textDecoration: "none", width: "100%", color: "#fff" }}
            >
              <ListItemButton
                selected={selectedIndex === index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "240px",
                  padding: "10px 30px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  "&.Mui-selected": {
                    backgroundColor: "#be8bea",
                    color: "#fff",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                  },
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "black",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedIndex === index ? "#fff" : "#ffffff",
                    justifyContent: "center",
                    marginRight: "0px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ textAlign: "left" }} />
              </ListItemButton>
            </Link>
          ))}
        </List>

        {/* Profile Section */}
        <Box
          sx={{
            width: "100%",
            borderTop: "1px solid #fff",
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "350px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src=""
              alt="User Avatar"
              sx={{
                width: 50,
                height: 50,
                marginRight: 2,
                border: "2px solid #fff",
                cursor: "pointer",
              }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {user.fullName || "Loading..."}
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
                {user.email || "Loading..."}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="text"
            sx={{
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                color: "#8833da",
                backgroundColor: "#fff",
              },
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            <OpenInNewOutlinedIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;

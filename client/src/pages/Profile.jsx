import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import axios from "axios";

import SendMoney from "../components/SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";
import { useNavigate } from "react-router-dom";
import CreateCustomer from "./../components/CreateNewCustomer";

const Profile = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePage, setActivePage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Fetch user details on component mount
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${userDetails.userId}`,
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setIsEditing(false);
      alert("User details updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Failed to update user details");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (page) => {
    setActivePage(page);
    handleClose();
  };

  const handleGoBack = () => {
    navigate("/"); // Go back to the main dashboard
  };

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
              My Profile
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
              <MenuItem onClick={() => handleMenuClick("Create Customer")}>
                <ListItemIcon>
                  <DashboardIcon fontSize="small" />
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
                Create New Invoice
              </MenuItem>
            </Menu>
          </Box>

          {/* Profile Box */}
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "30px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "0px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              My Profile
            </Typography>

            <Divider sx={{ marginBottom: "20px" }} />

            {/* TextFields */}
            <Box display="flex" flexWrap="wrap" gap={8}>
              {[
                { label: "Full Name", name: "fullName" },
                { label: "Email Address", name: "email" },
                { label: "Phone No", name: "phone" },
              ].map((field, index) => (
                <TextField
                  key={index}
                  label={field.label}
                  name={field.name}
                  value={userDetails[field.name] || ""}
                  onChange={handleInputChange}
                  InputProps={{ readOnly: !isEditing }}
                  sx={{ flex: "1 1 45%" }}
                />
              ))}
            </Box>

            {!isEditing ? (
              <Button
                onClick={handleEdit}
                variant="outlined"
                sx={{ marginTop: "10px" }}
              >
                Edit
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                variant="contained"
                sx={{ marginTop: "10px" }}
              >
                Save
              </Button>
            )}
          </Box>

          {/* Go Back Button */}
          <Button
            variant="outlined"
            sx={{ marginTop: "20px", backgroundColor: "#fff" }}
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </Box>
      );
  }
};

export default Profile;

import React, { useState } from "react";
import { Box, Typography, Button, Menu, MenuItem, ListItemIcon } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Icon for the button
import DashboardIcon from "@mui/icons-material/Dashboard"; // Example icon for menu item
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"; // Example icon for menu item

const WelcomeBox = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
    </Box>
  );
};

export default WelcomeBox;

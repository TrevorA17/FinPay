import React, { useState } from "react";
import { Box, Typography, Button, Menu, MenuItem, ListItemIcon, TextField, InputAdornment, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const WelcomeBox = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          padding: "20px",
          borderRadius: "0px",
          boxShadow: "0 4px 6px rgba(0, 0, 0.9, 0.1)",
          marginBottom: "20px",
          height: "76px",
          marginLeft: "-5px",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Invoices
          </Typography>
        </Box>

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
              mt: "-45px",
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

      {/* Content Area */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "10px",
        }}
      >
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search for an invoice"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            marginRight: "10px",
          }}
        />

        {/* Filter Button */}
        <Button
          variant="contained"
          startIcon={<FilterListIcon />}
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
    </Box>
  );
};

export default WelcomeBox;

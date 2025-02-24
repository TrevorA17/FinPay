import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Menu,
  MenuItem,
  ListItemIcon,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

//Quick actions imports
import SendMoney from "../components/SendMoney";
import ConvertFunds from "../components/ConvertFunds";
import CreateInvoice from "../components/CreateNewInvoice";
import CreateCustomer from "../components/CreateNewCustomer";

const Beneficiaries = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    navigate(`/beneficiaries?action=${action}`);
    handleClose();
  };

  // Fetch beneficiaries from FakeStore API
  useEffect(() => {
    const fetchBeneficiaries = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setBeneficiaries(data);
      setFilteredBeneficiaries(data);
    };
    fetchBeneficiaries();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = beneficiaries.filter((beneficiary) =>
      beneficiary.title.toLowerCase().includes(value)
    );
    setFilteredBeneficiaries(filtered);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Pagination logic
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedBeneficiaries = filteredBeneficiaries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleGoBack = () => {
    navigate("/"); // Go back to the main dashboard
  };

  const searchParams = new URLSearchParams(location.search);
  const activePage = searchParams.get("action");

  if (activePage) {
    switch (activePage) {
      case "send-money":
        return <SendMoney />;
      case "create-customer":
        return <CreateCustomer />;
      case "convert-funds":
        return <ConvertFunds />;
      case "create-invoice":
        return <CreateInvoice />;
      default:
        break;
    }
  }
  return (
    <Box sx={{ padding: "20px" }}>
      {/* Welcome Box */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "28px",
          boxShadow: "0 0.5px 0.5px rgba(0, 0, 0.0)",
          marginBottom: "20px",
          marginLeft: "-25px",
          width: "99%",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Beneficiaries
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
          <MenuItem onClick={() => handleMenuClick("send-money")}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Send Money
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("create-customer")}>
            <ListItemIcon>
              <DescriptionOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Create Customer
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("convert-funds")}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Convert Funds
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("create-invoice")}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Create Invoice
          </MenuItem>
        </Menu>
      </Box>

      {/* Search Bar and Add Beneficiary */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <TextField
          label="Search Beneficiaries"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          sx={{ marginRight: "20px" }}
        />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ whiteSpace: "nowrap", padding: " 15px 15px" }}
        >
          Add Beneficiary
        </Button>
      </Box>

      {/* Manage Beneficiaries */}
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          maxHeight: "690px",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          Manage Beneficiaries
        </Typography>
        <Grid2 container spacing={2}>
          {paginatedBeneficiaries.map((item) => (
            <Grid2 item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{ height: "150px", objectFit: "contain" }}
                />
                <CardContent>
                  <Typography
                    variant="h7"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ marginBottom: "5px" }}
                  >
                    {item.category}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ${item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Pagination
          count={Math.ceil(filteredBeneficiaries.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
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
};

export default Beneficiaries;

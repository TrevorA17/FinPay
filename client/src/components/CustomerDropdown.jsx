import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

const CustomerDropdown = ({ onSelect }) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/customers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (event) => {
    setSelectedCustomer(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel>Customer</InputLabel>
      <Select value={selectedCustomer} onChange={handleChange}>
        {customers.map((customer) => (
          <MenuItem key={customer._id} value={customer._id}>
            {customer.name} ({customer.email})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomerDropdown;

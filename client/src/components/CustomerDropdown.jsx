import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

const CustomerDropdown = ({ onSelect }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Assuming you're storing the auth token
        const response = await axios.get(
          "http://localhost:5000/api/customers",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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

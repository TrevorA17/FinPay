import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const ManageAccounts = ({ userId }) => {
  const [accounts, setAccounts] = useState([]); // Store existing accounts
  const [selectedAccountId, setSelectedAccountId] = useState(""); // Account being updated
  const [formData, setFormData] = useState({
    currency: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    country: "",
    streetAddress: "",
    state: "",
    city: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing user accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setAccounts(response.data.userAccounts || []);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, [userId]);

  // Handle input change in the form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for adding/updating
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (selectedAccountId) {
        // Updating an existing account
        await axios.put(
          `http://localhost:5000/api/users/${userId}/accounts/${selectedAccountId}`,
          formData
        );
        setMessage("Account updated successfully!");
      } else {
        // Adding a new account
        await axios.post(
          `http://localhost:5000/api/users/${userId}/accounts`,
          formData
        );
        setMessage("Account added successfully!");
      }

      // Refresh account list
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      setAccounts(response.data.userAccounts || []);

      // Reset form
      setFormData({
        currency: "",
        bankName: "",
        accountNumber: "",
        accountName: "",
        country: "",
        streetAddress: "",
        state: "",
        city: "",
        postalCode: "",
      });
      setSelectedAccountId("");
    } catch (error) {
      setMessage("Error saving account.");
      console.error(error);
    }

    setLoading(false);
  };

  // Load selected account details into the form for updating
  const handleSelectAccount = (accountId) => {
    const selectedAccount = accounts.find((acc) => acc._id === accountId);
    setSelectedAccountId(accountId);
    setFormData(
      selectedAccount || {
        currency: "",
        bankName: "",
        accountNumber: "",
        accountName: "",
        country: "",
        streetAddress: "",
        state: "",
        city: "",
        postalCode: "",
      }
    );
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {selectedAccountId ? "Update Account" : "Add New Account"}
      </Typography>

      {message && <Typography color="primary">{message}</Typography>}

      {/* Account Selection Dropdown (for updates) */}
      {accounts.length > 0 && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Account to Update</InputLabel>
          <Select
            value={selectedAccountId}
            onChange={(e) => handleSelectAccount(e.target.value)}
          >
            <MenuItem value="">Add New Account</MenuItem>
            {accounts.map((acc) => (
              <MenuItem key={acc._id} value={acc._id}>
                {acc.accountName} - {acc.bankName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Account Form */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Currency"
          name="currency"
          value={formData.currency}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Bank Name"
          name="bankName"
          value={formData.bankName}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Account Number"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Account Name"
          name="accountName"
          value={formData.accountName}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Street Address"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="State"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : selectedAccountId
            ? "Update Account"
            : "Add Account"}
        </Button>
      </form>
    </Box>
  );
};

export default ManageAccounts;

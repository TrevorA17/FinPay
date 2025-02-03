import React, { useState, useEffect } from "react";
import {
  addUserAccount,
  updateUserAccount,
  fetchUserAccounts,
} from "../api/userApi";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const AccountForm = ({ userId }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
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

  useEffect(() => {
    if (userId) {
      const loadAccounts = async () => {
        const userAccounts = await fetchUserAccounts(userId);
        setAccounts(userAccounts);
      };
      loadAccounts();
    }
  }, [userId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAccountSelect = (event) => {
    const accountId = event.target.value;
    const account = accounts.find((acc) => acc._id === accountId);
    setSelectedAccount(account);
    setFormData(account);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedAccount) {
        await updateUserAccount(userId, selectedAccount._id, formData);
        alert("Account updated successfully!");
      } else {
        await addUserAccount(userId, formData);
        alert("Account added successfully!");
      }
    } catch (error) {
      alert("Error processing request");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      {accounts.length > 0 && (
        <FormControl fullWidth>
          <InputLabel>Select Account (Optional for Updates)</InputLabel>
          <Select
            value={selectedAccount?._id || ""}
            onChange={handleAccountSelect}
          >
            {accounts.map((account) => (
              <MenuItem key={account._id} value={account._id}>
                {account.accountName} - {account.bankName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <TextField
        name="currency"
        label="Currency"
        value={formData.currency}
        onChange={handleChange}
        required
      />
      <TextField
        name="bankName"
        label="Bank Name"
        value={formData.bankName}
        onChange={handleChange}
        required
      />
      <TextField
        name="accountNumber"
        label="Account Number"
        value={formData.accountNumber}
        onChange={handleChange}
        required
      />
      <TextField
        name="accountName"
        label="Account Name"
        value={formData.accountName}
        onChange={handleChange}
        required
      />
      <TextField
        name="country"
        label="Country"
        value={formData.country}
        onChange={handleChange}
        required
      />
      <TextField
        name="streetAddress"
        label="Street Address"
        value={formData.streetAddress}
        onChange={handleChange}
        required
      />
      <TextField
        name="state"
        label="State"
        value={formData.state}
        onChange={handleChange}
        required
      />
      <TextField
        name="city"
        label="City"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <TextField
        name="postalCode"
        label="Postal Code"
        value={formData.postalCode}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {selectedAccount ? "Update Account" : "Add Account"}
      </Button>
    </form>
  );
};

export default AccountForm;

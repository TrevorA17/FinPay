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
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    if (userId) {
      loadAccounts();
    } else {
      setError("User ID is missing");
    }
  }, [userId]); // Ensures that this effect runs only when the userId prop changes.

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const userAccounts = await fetchUserAccounts(userId);

      if (!Array.isArray(userAccounts)) {
        throw new Error("Invalid response format from server");
      }

      setAccounts(userAccounts);
      setError("");
    } catch (error) {
      console.error("Error fetching user accounts:", error);
      setError("Failed to load accounts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // handles form input changes.
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //handles the selection of an account from the dropdown.
  const handleAccountSelect = (event) => {
    const accountId = event.target.value;
    const account = accounts.find((acc) => acc._id === accountId);
    setSelectedAccount(account);
    setFormData(account || formData);
  };

  //handles the form submission.
  const handleSubmit = async (event) => {
    event.preventDefault(); //Prevents the default form submission behavior
    try {
      if (selectedAccount) {
        await updateUserAccount(userId, selectedAccount._id, formData);
        setSnackbarMessage("Account updated successfully!");
        setSnackbarSeverity("success");
      } else {
        await addUserAccount(userId, formData);
        setSnackbarMessage("Account added successfully!");
        setSnackbarSeverity("success");
      }
      setSnackbarOpen(true);
      loadAccounts();
    } catch (error) {
      console.error("Error processing request:", error);
      setSnackbarMessage("Error processing request. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h5">Manage Your Accounts</Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
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
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AccountForm;

//Notes
//useState for managing component state and useEffect for handling side effects (like data fetching).
// useEffect hook is crucial for fetching the account data. It runs after the component renders.

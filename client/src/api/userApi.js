import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};

// Fetch accounts for a specific user
export const fetchUserAccounts = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}/accounts`);
    return response.data.userAccounts; // Assuming accounts are inside user object
  } catch (error) {
    console.error("Error fetching user accounts", error);
    return [];
  }
};

// Add a new account for a user
export const addUserAccount = async (userId, accountData) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/${userId}/accounts`,
      accountData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding account", error);
    throw error;
  }
};

// Update an existing account
export const updateUserAccount = async (userId, accountId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/${userId}/accounts/${accountId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating account", error);
    throw error;
  }
};

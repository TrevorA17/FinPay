import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Fetch logged in user
// export const fetchUsers = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/all`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching users", error);
//     return [];
//   }
// };
export const fetchLoggedInUser = async () => {
  try {
    const token = localStorage.getItem("token"); // Get auth token from storage

    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching logged-in user", error);
    return null;
  }
};

export const fetchUserAccounts = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/accounts/${userId}`);

    // Log the raw response to ensure it's correct
    // console.log("Raw API response:", response);

    // Check if response.data is an array
    if (!Array.isArray(response.data)) {
      throw new Error("Unexpected API response format");
    }

    return response.data; // Return the response data if it's a valid array
  } catch (error) {
    console.error("Error fetching user accounts:", error);
    return []; // Return an empty array if an error occurs
  }
};

// Add a new account for a user
export const addUserAccount = async (userId, accountData) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/accounts/${userId}`,
      accountData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding account", error);
    throw error;
  }
};

// Update an existing account for user
export const updateUserAccount = async (userId, accountId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/user/accounts/${userId}/${accountId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating account", error);
    throw error;
  }
};

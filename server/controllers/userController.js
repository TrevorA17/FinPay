const User = require("../models/User"); // Import User model

//Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Add a new account
const addUserAccount = async (req, res) => {
  const { userId } = req.params; // Get user ID from request params
  const newAccount = req.body; // Get account details from request body

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new account to the user's accounts array
    user.userAccounts.push(newAccount);
    await user.save(); // Save the updated user document

    res.status(201).json({ message: "Account added successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error adding account", error });
  }
};

// Update an existing account
const updateUserAccount = async (req, res) => {
  const { userId, accountId } = req.params; // Get user ID and account ID from request params
  const updatedAccount = req.body; // Get updated account details from request body

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the account by ID
    const accountIndex = user.userAccounts.findIndex(
      (account) => account._id.toString() === accountId
    );

    if (accountIndex === -1) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Update the account details
    user.userAccounts[accountIndex] = {
      ...user.userAccounts[accountIndex],
      ...updatedAccount,
    };

    await user.save(); // Save the updated user document

    res.status(200).json({ message: "Account updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating account", error });
  }
};

//Get user accounts
const getUserAccounts = async (req, res) => {
  const { userId } = req.params; // Extract userId from request

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log("Sending user accounts:", user.userAccounts); //  Debug log

    res.status(200).json(user.userAccounts); // Return user's accounts
  } catch (error) {
    res.status(500).json({ message: "Error fetching user accounts", error });
  }
};

module.exports = {
  addUserAccount,
  updateUserAccount,
  getAllUsers,
  getUserAccounts,
};

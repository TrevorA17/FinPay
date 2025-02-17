const User = require("../models/User"); // Import User model

//Get user's details
const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID from request

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

//Update user details
const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID from request

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const { fullName, phone, email } = req.body;

    if (!fullName && !phone && !email) {
      return res.status(400).json({ message: "No update fields provided" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { fullName, phone, email } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user details", error });
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
  updateUserDetails,
  updateUserAccount,
  getUserDetails,
  getUserAccounts,
};

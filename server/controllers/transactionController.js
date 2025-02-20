const Transaction = require("../models/Transaction");

// Get transactions for the logged-in user
const getTransactions = async (req, res) => {
  try {
    // Get the logged-in user's ID (from JWT auth middleware)
    const userId = req.user.id;

    // Find transactions where userId matches the logged-in user's ID
    const transactions = await Transaction.find({ userId });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching transactions." });
  }
};

module.exports = { getTransactions };

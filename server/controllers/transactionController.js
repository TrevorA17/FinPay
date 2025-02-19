const Transaction = require("../models/Transaction");

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching transactions." });
  }
};

module.exports = { getTransactions };

const express = require("express");
const router = express.Router();
const { getTransactions } = require("../controllers/transactionController");

// GET /api/transactions - Fetch all transactions
router.get("/", getTransactions);

module.exports = router;

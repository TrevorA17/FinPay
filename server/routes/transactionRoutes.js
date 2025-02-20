const express = require("express");
const router = express.Router();
const { getTransactions } = require("../controllers/transactionController");
const authenticateToken = require("../middlewares/authenticateToken");

// GET /api/transactions - Fetch all transactions
router.get("/", authenticateToken, getTransactions);

module.exports = router;

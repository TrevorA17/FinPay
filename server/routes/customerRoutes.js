const express = require("express");
const router = express.Router();
const {
  addCustomer,
  getCustomers,
} = require("../controllers/customerController");

const authenticateToken = require("../middlewares/authenticateToken"); // Ensure user is logged in

// Route to add a customer
router.post("/", authenticateToken, addCustomer);

// Route to fetch all customers for the logged-in user
router.get("/", authenticateToken, getCustomers);

module.exports = router;

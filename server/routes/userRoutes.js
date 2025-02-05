const express = require("express");
const {
  addUserAccount,
  updateUserAccount,
  getUserAccounts,
  getUserDetails,
} = require("../controllers/userController");
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

// Route to add a new user account
router.post("/user/accounts/:userId", addUserAccount);

// Route to update an existing user account
router.put("/user/accounts/:userId/:accountId", updateUserAccount);

//get user's details
router.get("/user/profile", authenticateToken, getUserDetails);

//get user accounts
router.get("/user/accounts/:userId", getUserAccounts);

module.exports = router;

// Postman URL for testing user accounts
// POST http://localhost:5000/api/user/accounts/userId
// Content-Type: application/json

// PUT http://localhost:5000/api/user/accounts/userId/accountId
// Content-Type: application/json

const express = require("express");
const {
  addUserAccount,
  updateUserAccount,
  getAllUsers,
  getUserAccounts,
} = require("../controllers/userController");
const router = express.Router();

// Route to add a new user account
router.post("/user/accounts/:userId", addUserAccount);

// Route to update an existing user account
router.put("/user/accounts/:userId/:accountId", updateUserAccount);

//get all users
router.get("/all", getAllUsers);

//get user accounts
router.get("/user/accounts/:userId", getUserAccounts);

module.exports = router;

// Postman URL for testing user accounts
// POST http://localhost:5000/api/user/accounts/userId
// Content-Type: application/json

// PUT http://localhost:5000/api/user/accounts/userId/accountId
// Content-Type: application/json

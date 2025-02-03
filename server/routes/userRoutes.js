const express = require("express");
const {
  addUserAccount,
  updateUserAccount,
  getAllUsers,
} = require("../controllers/userController");
const router = express.Router();

// Route to add a new user account
router.post("/user/accounts/:userId", addUserAccount);

// Route to update an existing user account
router.put("/user/accounts/:userId/:accountId", updateUserAccount);

router.get("/all", getAllUsers);

module.exports = router;

// Postman URL for testing useraccounts
// POST http://localhost:5000/api/user/accounts/userId
// Content-Type: application/json

// PUT http://localhost:5000/api/user/accounts/userId/accountId
// Content-Type: application/json

const express = require("express");
const {
  addUserAccount,
  updateUserAccount,
} = require("../controllers/userController");
const router = express.Router();

// Route to add a new user account
router.post("/user/accounts/:userId", addUserAccount);

// Route to update an existing user account
router.put("/user/accounts/:userId/:accountId", updateUserAccount);

module.exports = router;

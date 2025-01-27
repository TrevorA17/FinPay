const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");

// Route to generate OTP
router.post("/generate-otp", otpController.generateOtp);

// Route to validate OTP
router.post("/validate-otp", otpController.validateOtp);

module.exports = router;

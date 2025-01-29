const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");

// Route to generate OTP
router.post("/generate-otp", otpController.generateOtp);

// Route to validate OTP for registration
router.post("/validate-otp", otpController.validateOtp);

router.post("/verifyOtpForLogin", otpController.verifyOtpForLogin);

module.exports = router;

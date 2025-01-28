const express = require("express");
const router = express.Router();
const Otp = require("../models/Otp"); // Import the OTP schema
const bcrypt = require("bcryptjs");
const transporter = require("../utils/nodemailer"); // Import the nodemailer transporter

// Endpoint to generate OTP
router.post("/generate-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ status: "FAILED", message: "Email is required" });
  }

  // Generate a random 4-digit OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  // Hash the OTP for secure storage
  const saltRounds = 10;
  const hashedOtp = await bcrypt.hash(otp, saltRounds);

  // Save the OTP in the database
  const newOtp = new Otp({ email, otp: hashedOtp });

  try {
    await newOtp.save();
    // console.log(`Generated OTP: ${otp} for email: ${email} `);

    // Send the OTP via email
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Your OTP Code",
      html: `
                <h1>Your OTP Code</h1>
                <p>Your OTP code is <strong>${otp}</strong>. It is valid for 5 minutes.</p>
            `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ status: "SUCCESS", message: "OTP sent to email" });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ status: "FAILED", message: "Error generating OTP" });
  }
});

// Validate OTP
router.post("/validate-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Check if the email and OTP exist in the database
    const otpEntry = await Otp.findOne({ email, otp });

    if (!otpEntry) {
      return res.status(400).json({ message: "Invalid OTP or email." });
    }

    // Check if the OTP has expired
    const now = Date.now();
    if (otpEntry.expiresAt < now) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    // OTP is valid
    return res.status(200).json({ message: "OTP validated successfully." });
  } catch (error) {
    console.error("Error validating OTP:", error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;

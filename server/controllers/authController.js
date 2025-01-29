const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const axios = require("axios"); // For making HTTP requests

// Register Controller
const register = async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Generate OTP and send it to email for verification
    await axios.post("http://localhost:5000/api/otp/generate-otp", { email });

    // Return response indicating that OTP was sent
    res.status(200).json({ message: "OTP sent to your email. Please verify." });
  } catch (error) {
    res.status(500).json({ message: "Error generating OTP." });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate OTP and send it to email for verification
    await axios.post("http://localhost:5000/api/otp/generate-otp", { email });

    // Generate a JWT
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration time
    );

    // Return the OTP request message and JWT token
    res.status(200).json({
      message: "OTP sent to your email. Please verify.",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { register, login };

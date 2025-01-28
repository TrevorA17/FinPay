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

// OTP Verification Controller
const verifyOtp = async (req, res) => {
  const { email, otp, password } = req.body;

  if (!email || !otp || !password) {
    return res
      .status(400)
      .json({ message: "Email, OTP, and password are required" });
  }

  try {
    // Validate the OTP by sending request to OTP validation route
    const otpRes = await axios.post(
      "http://localhost:5000/api/otp/validate-otp",
      { email, otp }
    );

    // If OTP is valid, hash the password and create a new user
    if (otpRes.data.message === "User verified successfully") {
      const salt = await bcrypt.genSalt(10); // Hash the password
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the new user with hashed password
      const newUser = new User({
        fullName: req.body.fullName,
        email,
        phone: req.body.phone,
        password: hashedPassword, // Store hashed password
        isVerified: true, // Mark as verified after OTP validation
      });

      await newUser.save();
      res
        .status(201)
        .json({ message: "User registered and verified successfully." });
    } else {
      res.status(400).json({ message: "Invalid OTP." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP." });
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

    // Generate a JWT
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration time
    );

    // Send the token
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, verifyOtp, login };

const Otp = require("../models/Otp");
const User = require("../models/User");
const transporter = require("../utils/nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate OTP
exports.generateOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes from now

    // Save OTP to the database
    const newOtp = new Otp({ email, otp, expiresAt });
    await newOtp.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending OTP email." });
      }

      console.log("OTP email sent:", info.response);
      res.status(200).json({ message: "OTP sent successfully." });
    });
  } catch (error) {
    console.error("Error generating OTP:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Validate OTP and Register User
exports.validateOtp = async (req, res) => {
  const { email, otp, password, fullName, phone } = req.body; // Ensure OTP is destructured here
  // console.log(req.body); // Debugging step to see if OTP, email, and password are being sent

  // Validate required fields
  if (!email || !otp || !password || !fullName || !phone) {
    return res.status(400).json({
      message: "Email, OTP, password, full name, and phone are required.",
    });
  }

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

    // OTP is valid; proceed to register the user
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword, // Store hashed password
      isVerified: true, // Mark user as verified
    });

    // Save the new user to the database
    await newUser.save();

    // Clean up: Remove the used OTP from the database
    await Otp.deleteOne({ email, otp });

    // Respond with success
    res
      .status(201)
      .json({ message: "User registered and verified successfully." });
  } catch (error) {
    console.error(
      "Error during OTP validation and registration:",
      error.message
    );
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

//Validate and login user
exports.verifyOtpForLogin = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    // Find the OTP entry in the database
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again." });
    }

    // Check if OTP is expired
    const currentTime = new Date();
    if (otpRecord.expiresAt < currentTime) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete OTP after successful verification
    await Otp.deleteOne({ email });

    res.status(200).json({
      message: "OTP verified successfully. Login successful!",
    });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

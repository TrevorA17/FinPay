const Otp = require("../models/Otp");
const transporter = require("../utils/nodemailer");

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

// Validate OTP
exports.validateOtp = async (req, res) => {
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
};

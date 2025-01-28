const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires in 5 minutes
    expiresAt: { type: Date, required: true },
  },
  { collection: "otps" } // Explicitly specify the collection name
);

module.exports = mongoose.model("Otp", OtpSchema);

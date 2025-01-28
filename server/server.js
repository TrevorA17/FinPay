const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protected");
const otpRoutes = require("./routes/otpRoutes"); // Import OTP routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api", authRoutes);
app.use("/api", protectedRoutes);
// OTP routes
app.use("/api/otp", otpRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

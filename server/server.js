const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protected");
const otpRoutes = require("./routes/otpRoutes"); // Import OTP routes
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

const app = express();
const port = process.env.PORT || 8000;

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

//User routes
app.use("/api/users", userRoutes);

//Customer Routes
app.use("/api/customers", customerRoutes);

//Invoice Routes
app.use("/api/invoices", invoiceRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});

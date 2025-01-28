const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error configuring nodemailer:", error);
  } else {
    console.log("Nodemailer is ready to send emails.");
  }
});

module.exports = transporter;

// console.log("AUTH_EMAIL:", process.env.AUTH_EMAIL);
// console.log("AUTH_PASS:", process.env.AUTH_PASS);

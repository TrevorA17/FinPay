const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: {
    type: Boolean,
    default: false, // Initially, the user is not verified
  },
});
module.exports = mongoose.model("User", UserSchema);

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
  userAccounts: [
    {
      currency: { type: String, required: true },
      bankName: { type: String, required: true },
      accountNumber: { type: String, required: true },
      accountName: { type: String, required: true },
      country: { type: String, required: true },
      streetAddress: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    ,
  ],
});
module.exports = mongoose.model("User", UserSchema);

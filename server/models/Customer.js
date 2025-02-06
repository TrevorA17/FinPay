const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    billingAddress: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);

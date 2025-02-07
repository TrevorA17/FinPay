const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid"], default: "pending" },
    issueDate: { type: Date, default: Date.now }, // Default to now
    dueDate: { type: Date, required: true },
    invoiceItems: [
      {
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        total: {
          type: Number,
          required: true,
          default: function () {
            return this.quantity * this.unitPrice;
          },
        },
      },
    ],
  },
  { timestamps: true }
);

// Calculate the total invoice amount before saving
InvoiceSchema.pre("save", function (next) {
  this.amount = this.invoiceItems.reduce((sum, item) => sum + item.total, 0);
  next();
});

module.exports = mongoose.model("Invoice", InvoiceSchema);

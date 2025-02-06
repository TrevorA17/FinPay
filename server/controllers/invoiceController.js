const Invoice = require("../models/Invoice");

const createInvoice = async (req, res) => {
  try {
    const { customerId, amount, dueDate } = req.body;
    const invoice = new Invoice({
      userId: req.user.id,
      customerId,
      amount,
      dueDate,
    });
    await invoice.save();
    res.status(201).json({ message: "Invoice created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating invoice" });
  }
};

module.exports = { createInvoice };

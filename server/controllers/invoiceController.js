const Invoice = require("../models/Invoice");

// Create Invoice
const createInvoice = async (req, res) => {
  try {
    const { customerId, dueDate, invoiceItems } = req.body;

    if (!invoiceItems || invoiceItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Invoice must have at least one item." });
    }

    // Calculate total amount from invoice items
    const totalAmount = invoiceItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    // Create new invoice
    const invoice = new Invoice({
      userId: req.user.id,
      customerId,
      dueDate,
      invoiceItems,
      amount: totalAmount, // Set amount based on invoiceItems calculation
    });

    await invoice.save();
    res.status(201).json({ message: "Invoice created successfully", invoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating invoice" });
  }
};

//Fetch Invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user.id });
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Error fetching invoices" });
  }
};

module.exports = { createInvoice, getInvoices };

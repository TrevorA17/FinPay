const Customer = require("../models/Customer");

// Add a new customer
const addCustomer = async (req, res) => {
  try {
    const { name, email, phone, billingAddress } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCustomer = new Customer({
      userId: req.user.id, // Associate customer with the logged-in user
      name,
      email,
      phone,
      billingAddress,
    });

    await newCustomer.save();
    res
      .status(201)
      .json({ message: "Customer added successfully", customer: newCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error adding customer" });
  }
};

// Fetch all customers for the logged-in user
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req.user.id });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers" });
  }
};

module.exports = { addCustomer, getCustomers };

const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getInvoices,
} = require("../controllers/invoiceController");
const authenticateToken = require("../middlewares/authenticateToken");
const { getCustomers } = require("../controllers/customerController");
const { markInvoiceAsPaid } = require("../controllers/invoiceController");

router.post("/", authenticateToken, createInvoice);
router.get("/", authenticateToken, getInvoices);
router.get("/", authenticateToken, getCustomers);
router.post("/mark-as-paid/:id", authenticateToken, markInvoiceAsPaid);

module.exports = router;

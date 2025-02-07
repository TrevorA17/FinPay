const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getInvoices,
} = require("../controllers/invoiceController");
const authenticateToken = require("../middlewares/authenticateToken");

router.post("/create", authenticateToken, createInvoice);
router.get("/", authenticateToken, getInvoices);

module.exports = router;

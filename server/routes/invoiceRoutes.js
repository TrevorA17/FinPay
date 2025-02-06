const express = require("express");
const router = express.Router();
const { createInvoice } = require("../controllers/invoiceController");
const authenticateToken = require("../middlewares/authenticateToken");

router.post("/create", authenticateToken, createInvoice);

module.exports = router;

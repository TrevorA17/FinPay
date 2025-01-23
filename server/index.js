const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Test endpoint (to check if server is running)
app.get('/', (req, res) => {
  res.send('Server is running');
});


// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
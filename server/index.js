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

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Define User schema
// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model('User', userSchema);

// Test endpoint (to check if server is running)
app.get('/', (req, res) => {
  res.send('Server is running');
});

// // Login route
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // In a real-world application, you would compare the hashed password 
//     // with the provided password using a secure comparison method (e.g., bcrypt)
//     if (password !== user.password) { 
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate a JWT (or use sessions) - Implement this later
//     // ...

//     res.json({ message: 'Login successful' }); 

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authenticateToken = require('./middleware/authMiddleware');

// Load environment variables
dotenv.config();

const app = express();
const PORT =  5001; 

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

const connectionString = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(connectionString).then(() => {
  console.log('Connected to MongoDB');
  
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
}
);

app.get('/', (req, res) => {
  res.send('Rajasinghe College LMS Backend is running');
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
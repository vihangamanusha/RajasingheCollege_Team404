// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authenticateToken = require('./middleware/authMiddleware');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection setup
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbCluster = process.env.DB_CLUSTER;
const dbName = process.env.DB_NAME;

// Construct the MongoDB connection string
const connectionString = `mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Rajasinghe College LMS Backend is running');
});

// Import routes
const adminRoutes = require('./roles/admin/adminRoutes');
const studentRoutes = require('./roles/student/studentRoutes');
const teacherRoutes = require('./roles/teacher/teacherRoutes');

// Protect and use routes
app.use('/admin', authenticateToken, adminRoutes);
app.use('/student', authenticateToken, studentRoutes);
app.use('/teacher', authenticateToken, teacherRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
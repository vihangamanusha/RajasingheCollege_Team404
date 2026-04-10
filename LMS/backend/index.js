const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authenticateToken = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

// Database connection
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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Rajasinghe College LMS Backend is running');
});

const adminRoutes = require('./roles/admin/adminRoutes');
const studentRoutes = require('./roles/student/studentRoutes');
const teacherRoutes = require('./roles/teacher/teacherRoutes');

// Protect routes
app.use('/admin', authenticateToken, adminRoutes);
app.use('/student', authenticateToken, studentRoutes);
app.use('/teacher', authenticateToken, teacherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
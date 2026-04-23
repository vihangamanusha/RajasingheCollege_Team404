const express = require('express');
const router = express.Router();

// Student-specific routes
router.get('/', (req, res) => {
    res.send('Student dashboard');
});

// Route to fetch student marks
router.get('/marks', (req, res) => {
    // Example data (replace with database logic later)
    const exampleMarks = [
        { subject: 'Math', mark: 85 },
        { subject: 'Science', mark: 90 },
        { subject: 'History', mark: 78 }
    ];

    res.json({
        message: 'Marks fetched successfully',
        marks: exampleMarks
    });
});

module.exports = router;
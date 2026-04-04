const express = require('express');
const router = express.Router();

// Student-specific routes
router.get('/', (req, res) => {
    res.send('Student dashboard');
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Admin-specific routes
router.get('/', (req, res) => {
    res.send('Admin dashboard');
});

module.exports = router;
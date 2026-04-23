const express = require('express');
const router = express.Router();

// Teacher-specific routes
router.get('/', (req, res) => {
    res.send('Teacher dashboard');
});

module.exports = router;
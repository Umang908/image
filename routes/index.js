// routes/index.js
const express = require('express');
const router = express.Router();
const imageRoute = require('./imageRoutes');

// Use the image route
router.use('/images', imageRoute);

module.exports = router;

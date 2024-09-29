const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { uploadImage,getAllImage } = require('../controllers/imageController');

// Upload route
router.post('/upload', upload.single('image'), uploadImage);
router.get('/get-all-image', getAllImage);


module.exports = router;

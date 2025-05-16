const express = require('express');


const {
    uploadImage,
    getAllVideo,
} = require('../controller/imageToVideo/index');

const { protect } = require('../middleware/auth');
const { uploadMiddleware } = require('../middleware/multer');


const router = express.Router();

router.post('/upload-image', protect, uploadMiddleware, uploadImage);
router.get('/all-video', protect, getAllVideo);



module.exports = router;
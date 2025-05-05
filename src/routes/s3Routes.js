const express = require('express');
const router = express.Router();
const { uploadHelloWorld } = require('../controllers/s3Controller');

router.post('/upload-hello', uploadHelloWorld);

module.exports = router;

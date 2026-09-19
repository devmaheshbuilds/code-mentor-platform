const express = require('express');
const { getProgress, updateProgress, getMyProgress } = require('../controllers/progress.controller');
const verifyAuth = require('../middleware/auth.middleware');


const router = express.Router();

router.get('/', getProgress);
router.post('/', verifyAuth, updateProgress);
router.get('/me', verifyAuth, getMyProgress);

module.exports = router;
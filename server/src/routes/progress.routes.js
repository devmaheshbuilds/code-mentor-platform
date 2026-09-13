const express = require('express');
const { getProgress, updateProgress } = require('../controllers/progress.controller');
const verifyAuth = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', getProgress);
router.post('/', verifyAuth, updateProgress);

module.exports = router;
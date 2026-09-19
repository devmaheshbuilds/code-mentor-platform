const express = require('express');
const { getLessons } = require('../controllers/lesson.controller');
const { submitLesson } = require('../controllers/lesson_submit.controller');
const verifyAuth = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', getLessons);
router.post('/:id/submit', verifyAuth, submitLesson);

module.exports = router;
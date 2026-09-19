// GET /api/languages — supported languages (Python first)
const express = require('express');
const { getLanguages } = require('../controllers/language.controller');

const router = express.Router();
router.get('/', getLanguages);

module.exports = router;

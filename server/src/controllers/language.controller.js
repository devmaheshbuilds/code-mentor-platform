/**
 * Supported languages. Product is Python-first; this table
 * leaves room for more languages later.
 * GET /api/languages
 */
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const pool = require('../config/db');

const getLanguages = asyncHandler(async (req, res) => {
    const result = await pool.query('SELECT * FROM languages ORDER BY id');

    if (!result.rows) {
        throw new ApiError(500, 'Failed to fetch languages');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result.rows, 'Languages fetched successfully'));
});

module.exports = { getLanguages };

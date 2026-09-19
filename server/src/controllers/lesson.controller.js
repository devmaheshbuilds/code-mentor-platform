/**
 * Individual lessons inside a module.
 * GET /api/lessons
 */
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const pool = require('../config/db');

const getLessons = asyncHandler(async (req, res) => {
    const result = await pool.query(
        'SELECT * FROM lessons ORDER BY sequence_no'
    );

    if (!result.rows) {
        throw new ApiError(500, 'Failed to fetch lessons');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result.rows, 'Lessons fetched successfully'));
});

module.exports = { getLessons };

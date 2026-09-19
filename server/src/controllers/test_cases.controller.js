/**
 * Hidden / visible checks for a lesson (not used by the mock mentor yet).
 * GET /api/test_cases
 */
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const pool = require('../config/db');

const getTestCases = asyncHandler(async (req, res) => {
    const result = await pool.query('SELECT * FROM test_cases ORDER BY id');

    if (!result.rows) {
        throw new ApiError(500, 'Failed to fetch test cases');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result.rows, 'Test cases fetched successfully'));
});

module.exports = { getTestCases };

/**
 * Learning modules (ordered topics such as variables, loops).
 * GET /api/module
 */
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const pool = require('../config/db');

const getModules = asyncHandler(async (req, res) => {
    // sequence_no keeps the Python path in teaching order.
    const result = await pool.query(
        'SELECT * FROM modules ORDER BY sequence_no'
    );

    return res
        .status(200)
        .json(new ApiResponse(200, result.rows, 'Modules fetched successfully'));
});

module.exports = { getModules };

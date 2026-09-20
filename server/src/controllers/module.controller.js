/**
 * Learning modules (ordered topics such as variables, loops).
 * GET /api/module
 * GET /api/module?language_id=1
 */
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const pool = require('../config/db');

const getModules = asyncHandler(async (req, res) => {
    const { language_id } = req.query;

    let result;
    if (language_id) {
        result = await pool.query(
            'SELECT * FROM modules WHERE language_id = $1 ORDER BY sequence_no',
            [language_id]
        );
    } else {
        result = await pool.query(
            'SELECT * FROM modules ORDER BY sequence_no'
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result.rows, 'Modules fetched successfully'));
});

module.exports = { getModules };
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require("../utils/ApiError");
const pool = require('../config/db');

const getProgress = asyncHandler(async (req, res) => {
    const result = await pool.query("SELECT * from progress");

    if (!result.rows) {
        throw new ApiError(500, "Failed to fetch progress");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result.rows, "progress fetched successfully"));
});

const updateProgress = asyncHandler(async (req, res) => {
    const { lesson_id, status } = req.body;
    const user_id = req.user.id;

    if (!lesson_id || !status) {
        throw new ApiError(400, "lesson_id and status are required");
    }

    const existing = await pool.query(
        "SELECT * FROM progress WHERE user_id = $1 AND lesson_id = $2",
        [user_id, lesson_id]
    );

    let result;

    if (existing.rows.length > 0) {
        result = await pool.query(
            `UPDATE progress
             SET status = $1,
                 attempts = attempts + 1,
                 completed_at = CASE WHEN $1 = 'completed' THEN NOW() ELSE completed_at END
             WHERE user_id = $2 AND lesson_id = $3
             RETURNING *`,
            [status, user_id, lesson_id]
        );
    } else {
        result = await pool.query(
            `INSERT INTO progress (user_id, lesson_id, status, attempts, completed_at)
             VALUES ($1, $2, $3, 1, CASE WHEN $3 = 'completed' THEN NOW() ELSE NULL END)
             RETURNING *`,
            [user_id, lesson_id, status]
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result.rows[0], "Progress updated successfully"));
});

module.exports = { getProgress, updateProgress };
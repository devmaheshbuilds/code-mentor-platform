const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const pool = require("../config/db");

const getHint_logs = asyncHandler(async (req, res) => {
    const result = await pool.query("SELECT * FROM hint_logs");

    if (!result.rows) {
        throw new ApiError(500, "Failed to fetch hint_logs");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result.rows, "hint_logs fetched successfully"));
});

// POST /api/hint_logs - logs a hint request from a student.
// For now, ai_response can be a placeholder string until the AI service is wired in -
// your Python teammate's real response will eventually fill this field instead.
const createHintLog = asyncHandler(async (req, res) => {
    const { lesson_id, hint_level, ai_response } = req.body;
    const user_id = req.user.id;

    if (!lesson_id) {
        throw new ApiError(400, "lesson_id is required");
    }

    const result = await pool.query(
        `INSERT INTO hint_logs (user_id, lesson_id, hint_level, ai_response)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [user_id, lesson_id, hint_level || 1, ai_response || "Hint pending"]
    );

    return res
        .status(201)
        .json(new ApiResponse(201, result.rows[0], "Hint logged successfully"));
});

module.exports = { getHint_logs, createHintLog };
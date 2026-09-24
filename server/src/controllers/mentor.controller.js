const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const pool = require("../config/db");
const axios = require("axios");

const AI_SERVICE_URL =
    process.env.AI_SERVICE_URL || "http://127.0.0.1:8000/hint";

// POST /api/mentor/hint
const getHint = asyncHandler(async (req, res) => {
    const { lesson_id, student_code, question } = req.body;
    const user_id = req.user.id;

    if (!lesson_id || !question) {
        throw new ApiError(400, "lesson_id and question are required");
    }

    let aiResponse;
    try {
        aiResponse = await axios.post(AI_SERVICE_URL, {
            lesson_id,
            student_code: student_code || "",
            question,
        });
    } catch (err) {
        throw new ApiError(503, "AI mentor service is unavailable");
    }

    const hintText = aiResponse.data?.hint;
    if (!hintText) {
        throw new ApiError(502, "AI mentor returned an empty hint");
    }

    let logRow = {
        user_id,
        lesson_id,
        hint_level: 1,
        ai_response: hintText,
        hint: hintText,
    };

    try {
        const result = await pool.query(
            `INSERT INTO hint_logs (user_id, lesson_id, hint_level, ai_response)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [user_id, lesson_id, 1, hintText]
        );
        logRow = { ...result.rows[0], hint: hintText };
    } catch (err) {
        console.warn("hint_logs insert skipped:", err.message);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, logRow, "Hint fetched successfully"));
});

module.exports = { getHint };

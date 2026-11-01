const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const pool = require("../config/db");
const axios = require("axios");

const submitLesson = asyncHandler(async (req, res) => {
    const { id: lesson_id } = req.params;
    const { code } = req.body;
    const user_id = req.user.id;

    if (!code) {
        throw new ApiError(400, "code is required");
    }

    const testCasesResult = await pool.query(
        "SELECT * FROM test_cases WHERE lesson_id = $1",
        [lesson_id]
    );

    if (testCasesResult.rows.length === 0) {
        throw new ApiError(
            404,
            "No test cases found for this lesson"
        );
    }

    const JUDGE0_URL =
        "https://judge0-ce.p.rapidapi.com/submissions";

    const results = [];

    for (const testCase of testCasesResult.rows) {
        const submitResponse = await axios.post(
            `${JUDGE0_URL}?base64_encoded=false&wait=true`,
            {
                source_code: code,
                language_id: 71,
                stdin: testCase.input || "",
            },
            {
                headers: {
                    "X-RapidAPI-Key":
                        process.env.JUDGE0_API_KEY,
                    "X-RapidAPI-Host":
                        process.env.JUDGE0_API_HOST,
                    "Content-Type":
                        "application/json",
                },
            }
        );

        const actualOutput = (
            submitResponse.data.stdout || ""
        ).trim();

        const expectedOutput = (
            testCase.expected_output || ""
        ).trim();

        const passed =
            actualOutput === expectedOutput;

        results.push({
            test_case_id: testCase.id,
            input: testCase.input,
            expected_output: expectedOutput,
            actual_output: actualOutput,
            passed,
        });
    }

    const allPassed = results.every(
        (result) => result.passed
    );

    const existingProgress = await pool.query(
        `SELECT *
         FROM progress
         WHERE user_id = $1
         AND lesson_id = $2`,
        [user_id, lesson_id]
    );

    if (existingProgress.rows.length > 0) {
        await pool.query(
            `UPDATE progress
             SET status = $1,
                 attempts = attempts + 1,
                 completed_at =
                    CASE
                        WHEN $1 = 'completed'
                        THEN NOW()
                        ELSE completed_at
                    END
             WHERE user_id = $2
             AND lesson_id = $3`,
            [
                allPassed
                    ? "completed"
                    : "in_progress",
                user_id,
                lesson_id,
            ]
        );
    } else {
        await pool.query(
            `INSERT INTO progress
                (
                    user_id,
                    lesson_id,
                    status,
                    attempts,
                    completed_at
                )
             VALUES
                (
                    $1,
                    $2,
                    $3,
                    1,
                    CASE
                        WHEN $3 = 'completed'
                        THEN NOW()
                        ELSE NULL
                    END
                )`,
            [
                user_id,
                lesson_id,
                allPassed
                    ? "completed"
                    : "in_progress",
            ]
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    allPassed,
                    results,
                },
                "Submission evaluated"
            )
        );
});

module.exports = {
    submitLesson,
};
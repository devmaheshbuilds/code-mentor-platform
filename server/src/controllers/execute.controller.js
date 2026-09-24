const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const axios = require("axios");

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions";

async function runWithJudge0(code) {
    const apiKey = process.env.JUDGE0_API_KEY?.trim();
    if (!apiKey) {
        throw new ApiError(
            503,
            "Code runner is not configured. Set JUDGE0_API_KEY in server/.env and restart the server.",
        );
    }

    const submitResponse = await axios.post(
        `${JUDGE0_URL}?base64_encoded=false&wait=true`,
        {
            source_code: code,
            language_id: 71,
        },
        {
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host":
                    process.env.JUDGE0_API_HOST?.trim() ||
                    "judge0-ce.p.rapidapi.com",
                "Content-Type": "application/json",
            },
            timeout: 30000,
        },
    );

    const stdout = (submitResponse.data.stdout || "").trim();
    const stderr = (submitResponse.data.stderr || "").trim();
    const compileOutput = (submitResponse.data.compile_output || "").trim();

    if (compileOutput) {
        return {
            success: false,
            output: "",
            error: compileOutput,
            status: "failed",
        };
    }

    return {
        success: !stderr,
        output: stdout || "(no output)",
        error: stderr || undefined,
        status: stderr ? "failed" : "completed",
    };
}

/** POST /api/execute — run Python via Judge0 (RapidAPI). */
const runCode = asyncHandler(async (req, res) => {
    const { code } = req.body;

    if (!code || !String(code).trim()) {
        throw new ApiError(400, "code is required");
    }

    try {
        const result = await runWithJudge0(code);
        return res.status(200).json(
            new ApiResponse(200, result, "Code executed"),
        );
    } catch (err) {
        if (err instanceof ApiError) {
            throw err;
        }

        const status = err.response?.status;
        console.error("Judge0 execute failed:", status, err.response?.data || err.message);

        if (status === 401 || status === 403) {
            throw new ApiError(
                502,
                "Judge0 API key was rejected. Check JUDGE0_API_KEY in server/.env, confirm your RapidAPI subscription, then restart the server.",
            );
        }

        if (status === 429) {
            throw new ApiError(
                429,
                "Code runner is rate-limited. Please wait a moment and try again.",
            );
        }

        throw new ApiError(
            502,
            "Unable to run code right now. Please try again.",
        );
    }
});

module.exports = { runCode };

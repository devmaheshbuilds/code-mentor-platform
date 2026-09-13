const { createClient } = require("@supabase/supabase-js");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const verifyAuth = asyncHandler(async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized request - no token provided");
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
        throw new ApiError(401, "Invalid or expired token");
    }

    req.user = data.user;
    next();
});

module.exports = verifyAuth;
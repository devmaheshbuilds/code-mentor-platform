const asyncHandler = require("../utils/asyncHandler");
const ApiError= require("../utils/ApiError");
const ApiResponse=require("../utils/ApiResponse");
const pool= require("../config/db");

const getPaste_events=asyncHandler(async(req,res)=>{
    const result=await pool.query(
        "SELECT * FROM paste_events"
    );
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                result.rows,
                "paste_events fetched successfully"
            )
        );

});

const createPasteEvent =asyncHandler(async(req,res)=>{
    const {lesson_id, blocked} = req.body;
    const user_id =req.user.id;

    if(!lesson_id){
        throw new ApiError(400, "lesson_id is required");
    }

    const result= await pool.query(`INSERT INTO paste_events (user_id, lesson_id, blocked)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [user_id, lesson_id, blocked]
    );

    return res
        .status(201)
        .json(new ApiResponse(201, result.rows[0], "Paste event logged successfully"))
});

module.exports={ getPaste_events,createPasteEvent };
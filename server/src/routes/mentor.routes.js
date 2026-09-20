const express = require("express");
const { getHint } = require("../controllers/mentor.controller");
const verifyAuth = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/hint", verifyAuth, getHint);

module.exports = router;
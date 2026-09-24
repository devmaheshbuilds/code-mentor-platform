const express = require("express");
const { getHint_logs, createHintLog } = require("../controllers/hint_logs.controller");
const verifyAuth = require("../middleware/auth.middleware");
 
const router = express.Router();
 
router.get("/", getHint_logs);
router.post("/", verifyAuth, createHintLog);
 
module.exports = router;
 
const express = require("express");
const { runCode } = require("../controllers/execute.controller");

const router = express.Router();

router.post("/", runCode);

module.exports = router;

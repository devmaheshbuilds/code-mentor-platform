const express=require("express");
const {getPaste_events,createPasteEvent}=require("../controllers/paste_events.controller");
const verifyAuth = require("../middleware/auth.middleware");

const router=express.Router();

router.get("/",getPaste_events);
router.post("/",verifyAuth,createPasteEvent);

module.exports = router;

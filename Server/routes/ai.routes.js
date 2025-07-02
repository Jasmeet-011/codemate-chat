const express = require("express");
const router = express.Router();
const { handlePrompt } = require("../controllers/ai.controller");

router.post("/ask", handlePrompt);

module.exports = router;

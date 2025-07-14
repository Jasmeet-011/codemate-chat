const express = require("express");
const router = express.Router();
const {
  handlePrompt,
  handleDebug,
  handleExplain,
  handleRefactor,
} = require("../controllers/ai.controller");

router.post("/ask", handlePrompt);
router.post("/debug", handleDebug);
router.post("/explain", handleExplain);
router.post("/refactor", handleRefactor);

module.exports = router;

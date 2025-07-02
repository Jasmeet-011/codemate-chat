const { askGemini } = require("../services/gemini.service");

const handlePrompt = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await askGemini(prompt);
    res.status(200).json({ response });
  } catch (err) {
    console.error("Gemini Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { handlePrompt };

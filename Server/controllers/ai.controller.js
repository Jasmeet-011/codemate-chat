const axios = require("axios");

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Utility: Make request to Gemini API
const sendToGemini = async (prompt) => {
  const response = await axios.post(
    GEMINI_API_URL,
    {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY,
      },
    }
  );

  return response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
};

// ===============================
// POST /api/ask
// General coding prompt handler
// ===============================
const handlePrompt = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "A valid text prompt is required" });
  }

  try {
    const reply = await sendToGemini(prompt);
    if (!reply) {
      return res
        .status(500)
        .json({ error: "No meaningful response from Gemini" });
    }
    res.status(200).json({ response: reply });
  } catch (err) {
    const apiError = err?.response?.data?.error?.message || err.message;
    console.error("Gemini API error:", apiError);
    res
      .status(500)
      .json({
        error: "Failed to get response from Gemini API",
        details: apiError,
      });
  }
};

// ===============================
// POST /api/debug
// Error message + optional code = Diagnosis
// ===============================
const handleDebug = async (req, res) => {
  const { errorMessage, codeSnippet, language = "plaintext" } = req.body;

  if (!errorMessage) {
    return res.status(400).json({ error: "Error message is required" });
  }

  const prompt = `
You are a senior debugging assistant for developers.
Analyze the following error and code (if provided), and return:

1. The root cause of the error.
2. Suggestions to fix the issue.
3. A corrected code example (if possible).

Error Message:
"${errorMessage}"

${
  codeSnippet
    ? `Code Snippet:\n\`\`\`${language}\n${codeSnippet}\n\`\`\``
    : "No code was provided."
}
`;

  try {
    const reply = await sendToGemini(prompt);
    if (!reply) {
      return res
        .status(500)
        .json({ error: "No meaningful debug info returned by Gemini" });
    }
    res.status(200).json({ response: reply });
  } catch (err) {
    const apiError = err?.response?.data?.error?.message || err.message;
    console.error("Gemini Debug API error:", apiError);
    res
      .status(500)
      .json({ error: "Failed to process debug request", details: apiError });
  }
};

// ===============================
// POST /api/explain
// Code snippet → clear explanation
// ===============================
const handleExplain = async (req, res) => {
  const { code, language = "plaintext" } = req.body;

  if (!code || typeof code !== "string") {
    return res
      .status(400)
      .json({ error: "A code snippet is required for explanation" });
  }

  const prompt = `
You are an expert programming assistant.

Explain the following code in simple, clear terms for a junior developer. Break it down step-by-step if needed.

Code:
\`\`\`${language}
${code}
\`\`\`

Focus on clarity and understanding.
`;

  try {
    const reply = await sendToGemini(prompt);
    if (!reply) {
      return res
        .status(500)
        .json({ error: "No explanation returned by Gemini" });
    }
    res.status(200).json({ response: reply });
  } catch (err) {
    const apiError = err?.response?.data?.error?.message || err.message;
    console.error("Gemini Explain API error:", apiError);
    res
      .status(500)
      .json({
        error: "Failed to get explanation from Gemini API",
        details: apiError,
      });
  }
};

// ===============================
// POST /api/refactor
// Code snippet → improved version + reasoning
// ===============================
const handleRefactor = async (req, res) => {
  const { code, language = "plaintext" } = req.body;

  if (!code || typeof code !== "string") {
    return res
      .status(400)
      .json({ error: "A code snippet is required for refactoring" });
  }

  const prompt = `
You are a senior software engineer.

Refactor the following code to make it more efficient, modern, and readable.
- Use best practices
- Improve naming, structure, or patterns
- Keep functionality the same

Also, include a short explanation of the improvements after the code block.

Code:
\`\`\`${language}
${code}
\`\`\`
`;

  try {
    const reply = await sendToGemini(prompt);
    if (!reply) {
      return res
        .status(500)
        .json({ error: "No refactored code returned by Gemini" });
    }
    res.status(200).json({ response: reply });
  } catch (err) {
    const apiError = err?.response?.data?.error?.message || err.message;
    console.error("Gemini Refactor API error:", apiError);
    res
      .status(500)
      .json({
        error: "Failed to get refactor suggestions from Gemini API",
        details: apiError,
      });
  }
};

module.exports = {
  handlePrompt,
  handleDebug,
  handleExplain,
  handleRefactor,
};

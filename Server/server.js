// Entry Point for the Codemate backend server
const app = require("./app.config");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Codemate backend running at http://localhost:${PORT}`);
});

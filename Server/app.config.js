// Express server configuration for Codemate backend
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const aiRoutes = require("./routes/ai.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", aiRoutes);

module.exports = app;

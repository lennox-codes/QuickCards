const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");

// Load config file
dotenv.config({ path: "config/config.env" });

app.get("/", (req, res) => {
  res.send("How are you doing, my dudes and duddetes");
});

app.listen(
  process.env.PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
);

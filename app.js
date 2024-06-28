const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Express on Vercel RUUUU");
});

app.get("/test", (req, res) => {
  res.send("Test ");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

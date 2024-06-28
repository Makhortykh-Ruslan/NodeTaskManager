const express = require("express");
const fs = require("fs");

const app = express();

const todos = JSON.parse(fs.readFileSync(`${__dirname}/data/test-todo.json`));

app.get("/api/v1/todo", (req, res) => {
  res.status(200).json({
    status: "Good",
    data: todos,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

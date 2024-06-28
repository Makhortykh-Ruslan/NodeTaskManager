const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const todos = JSON.parse(fs.readFileSync(`${__dirname}/data/test-todo.json`));

app.get("/api/v1/todo", (req, res) => {
  res.status(200).json({
    status: "Good",
    data: todos,
  });
});

app.post("/api/v1/todo", (req, res) => {
  todos.push(req.body);

  fs.writeFile(
    `${__dirname}/data/test-todo.json`,
    JSON.stringify(todos),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          todo: req.body,
        },
      });
    },
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

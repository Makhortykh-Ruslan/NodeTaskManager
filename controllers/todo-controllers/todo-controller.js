const fs = require("fs");

const todos = JSON.parse(
  fs.readFileSync(`${__dirname}/../../data/test-todo.json`, "utf-8"),
);

exports.getAllTODO = (req, res) =>
  res.status(200).json({
    status: "hello",
    data: todos,
  });

exports.checkTODO = (req, res, next) => {
  if (!req.body.id || !req.body.name) {
    return res.status(400).json({
      status: "Fail",
      message: "Missing id or name",
    });
  }

  next();
};

exports.addTODO = (req, res) => {
  todos.push(req.body);

  fs.writeFile(
    `${__dirname}/../../data/test-todo.json`,
    JSON.stringify(todos),
    () => {
      res.status(201).json({
        status: "Success",
        data: {
          todo: req.body,
        },
      });
    },
  );
};

exports.checkTODOId = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      status: "Fail",
      message: "Missing id",
    });
  }

  next();
};

exports.getTODOById = (req, res) => {
  const id = req.params.id * 1;

  const todo = todos.find((el) => el.id === id);

  if (!todo) {
    res.status(404).json({
      status: "Fail",
      data: null,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
};

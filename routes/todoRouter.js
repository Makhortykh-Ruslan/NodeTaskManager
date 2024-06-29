const express = require("express");
const todoControllers = require("../controllers/todo-controllers/todo-controller");

const todoRouter = express.Router();

todoRouter
  .route("/")
  .get(todoControllers.getAllTODO)
  .post(todoControllers.checkTODO, todoControllers.addTODO);

todoRouter
  .route("/:id")
  .get(todoControllers.checkTODOId, todoControllers.getTODOById);

module.exports = todoRouter;

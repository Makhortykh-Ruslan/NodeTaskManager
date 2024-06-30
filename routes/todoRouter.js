const express = require("express");
const todoControllers = require("../controllers/todo-controllers/todo-controller");

const todoRouter = express.Router();

todoRouter
  .route("/")
  .get(todoControllers.getTodos)
  .post(todoControllers.createTodo);

todoRouter
  .route("/:id")
  .get(todoControllers.getByIdTodo)
  .patch(todoControllers.updateTodo)
  .delete(todoControllers.deleteTodo);

module.exports = todoRouter;

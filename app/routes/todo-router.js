const express = require('express');
const todoControllers = require('../controllers/todo-controller');
const { protect } = require('../middleware/auth-middleware');

const todoRouter = express.Router();

todoRouter
  .route('/')
  .get(protect, todoControllers.getTodos)
  .post(protect, todoControllers.createTodo);

todoRouter
  .route('/:id')
  .get(protect, todoControllers.getByIdTodo)
  .patch(protect, todoControllers.updateTodo)
  .delete(protect, todoControllers.deleteTodo);

module.exports = todoRouter;

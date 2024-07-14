const TodoModel = require('./../models/todo-model');

const errorResponse = (response, error, code) =>
  response.status(code).json({
    status: 'Fail',
    error,
  });

const successResponse = (response, data) =>
  response.status(200).json({
    status: 'Success',
    data,
  });

exports.getTodos = async (req, res) => {
  try {
    const data = await TodoModel.find({ user: req.user._id });
    successResponse(res, data);
  } catch (error) {
    errorResponse(res, error, 400);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const data = await TodoModel.create({
      ...req.body,
      user: req.user._id,
    });
    successResponse(res, data);
  } catch (error) {
    errorResponse(res, error, 400);
  }
};

exports.getByIdTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo || todo.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to access this todo', 401);
    }

    successResponse(res, todo);
  } catch (error) {
    errorResponse(res, error, 400);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo || todo.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to update this todo', 401);
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    successResponse(res, updatedTodo);
  } catch (error) {
    errorResponse(res, error, 400);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo || todo.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to delete this todo', 401);
    }

    await todo.remove();
    successResponse(res, null);
  } catch (error) {
    errorResponse(res, error, 400);
  }
};

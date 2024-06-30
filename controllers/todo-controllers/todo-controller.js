const TodoModel = require("./../../models/todo-model");

const errorResponse = (response, error, code) =>
  response.status(code).json({
    status: "Fail",
    error,
  });

const successResponse = (response, data) =>
  response.status(200).json({
    name: "Success",
    data,
  });

exports.getTodos = async (req, res) => {
  try {
    const data = await TodoModel.find();
    successResponse(res, data);
  } catch (error) {
    errorResponse(res, error, 400);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const data = await TodoModel.create(req.body);
    successResponse(res, data);
  } catch (error) {
    errorResponse(res, error, 400);
  }
};

exports.getByIdTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    successResponse(res, todo);
  } catch (error) {
    errorResponse(res, error, 400);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    successResponse(res, todo);
  } catch (error) {
    errorResponse(res, error, 400);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await TodoModel.findByIdAndDelete(req.params.id);
    successResponse(res, null);
  } catch (error) {
    errorResponse(res, error, 400);
  }
};

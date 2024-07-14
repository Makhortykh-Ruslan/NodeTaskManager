const UserModel = require('../models/user-model');
const jwt = require('jsonwebtoken');

const errorResponse = (response, error, code) =>
  response.status(code).json({
    status: 'Fail',
    error,
  });

const successResponse = (response, data) =>
  response.status(200).json({
    name: 'Success',
    data,
  });

const signsToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.getUsers = async (req, res) => {
  try {
    const data = await UserModel.find();
    successResponse(res, data);
  } catch (error) {
    errorResponse(res, error, 400);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    successResponse(res, null);
  } catch (error) {
    errorResponse(res, error, 400);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: 'Success',
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'Fail',
        error: 'Email and password are required.',
      });
    }

    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        status: 'Fail',
        error: 'Invalid credentials',
      });
    }

    const isMatch = await user.correctPassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 'Fail',
        error: 'Password is not match',
      });
    }

    const token = signsToken(user._id);

    res.status(200).json({
      status: 'Success',
      data: {
        user: {
          email: user.email,
          name: user.name,
        },
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      error,
    });
  }
};

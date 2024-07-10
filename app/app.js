const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { json } = require('express');
const todoRouter = require('../routes/todoRouter');

dotenv.config({ path: './config.env' });

const app = express();

if (process.env.NODDE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(json());
app.use('/api/v1/todo', todoRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'Fail',
    message: `Can't find  ${req.originalUrl} on this server!`,
  });
});

module.exports = app;

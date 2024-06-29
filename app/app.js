const express = require("express");
const { json } = require("express");
const todoRouter = require("../routes/todoRouter");

const app = express();

app.use(json());
app.use("/api/v1/todo", todoRouter);

module.exports = app;

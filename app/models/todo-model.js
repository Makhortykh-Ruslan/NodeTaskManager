const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  status: { type: String, default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const TodoModel = mongoose.model('todo', schema);

module.exports = TodoModel;

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  description: {
    type: String,
    required: [true, 'Description field is required'],
  },
});

const TodoModel = mongoose.model('todo', schema);

module.exports = TodoModel;

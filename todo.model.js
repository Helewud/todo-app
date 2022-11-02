const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  is_done: {
    type: Boolean,
    required: false,
  },
  created_at: {
    type: Date,
    required: false,
    default: new Date().now,
  },
  updated_at: {
    type: Date,
    required: false,
    default: new Date().now,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;

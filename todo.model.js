const mongoose = require("mongoose");

// generating a model for our database
const TodoSchema = new mongoose.Schema({
  //   id: {
  //     type: String,
  //     required: true,
  //   },
  content: {
    type: String,
    required: true,
  },
  is_done: {
    type: Boolean,
    default: false,
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

// importing packages we need for our server to run
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const Todo = require("./todo.model");

// calling the express server function
const app = express();
const TodoModel = Todo;
app.use(express.json());
app.use(cors());

// route to get our landing page
app.get("/home", (req, res) => {
  res.send("Hello World!");
});

// endpoint to create a TodoModel task
app.post("/todo/create", (req, res) => {
  const { content } = req.body;

  return TodoModel.create({
    content,
    isDone: false,
  }).then((createdTodoModel) => {
    return res.json({
      message: "Todo created successfully.",
      data: createdTodoModel,
    });
  });
});

// endpoint to toggle if the task is accomplished or not
app.patch("/todo/toggle/:todoId", (req, res) => {
  const { todoId } = req.params;

  TodoModel.findOne({
    _id: todoId,
  }).then((todo) => {
    if (todo.is_done === true) {
      todo.is_done = false;
    } else {
      todo.is_done = true;
    }

    TodoModel.updateOne(
      { _id: todo._id },
      {
        is_done: todo.is_done,
      }
    ).then((updatedTodo) =>
      res.json({
        message: "Todo task updated succesfully.",
        data: todo,
      })
    );
  });
});

// endpoint to edit the content of the todo
app.patch("/todo/edit/:todoId", (req, res) => {
  const { content } = req.body;
  const { todoId } = req.params;

  TodoModel.findOneAndUpdate(
    {
      _id: todoId,
    },
    { content },
    {
      new: true,
    }
  ).then((todo) => {
    return res.json({
      message: "Todo task updated succesfully.",
      data: todo,
    });
  });
});

// endpoint to fetch all TodoModel tasks
app.get("/todos", (req, res) => {
  return TodoModel.find().then((todos) => {
    return res.json({
      message: "Todo list fetched succesfully.",
      data: todos,
    });
  });
});

// endpoint to get a single TodoModel
app.get("/todo/:todoId", (req, res) => {
  const { todoId } = req.params;

  TodoModel.findOne({
    _id: todoId,
  }).then((todo) => {
    return res.json({
      message: "Todo task fetched succesfully.",
      data: todo,
    });
  });
});

// endpoint to delete a TodoModel task
app.delete("/todo/:todoId", (req, res) => {
  const { todoId } = req.params;

  TodoModel.deleteOne({
    _id: todoId,
  }).then((todo) => {
    return res.json({
      message: "Todo task deleted succesfully.",
    });
  });
});

// Connect to our mongodb database
mongoose
  .connect(
    "mongodb+srv://AdminUser:gZ7RAQo9crK6x41W@TodoModel-app.nav4r2o.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected successfully.");

    // assigning number to our port
    const port = 3000;

    //   connect to bring alive our express server
    app.listen(port, () => {
      console.log(`Todo app listening on port ${port}`);
    });
  });

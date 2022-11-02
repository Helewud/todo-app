// importing packages we need for our server to run
const express = require("express");
const mongoose = require("mongoose");

// calling the express server function
const app = express();

// generating a model for our database
const TodoModel = mongoose.model(
  "todo",
  new mongoose.Schema({
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
  })
);

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
      message: "Todo list created successfully.",
      data: createdTodoModel,
    });
  });
});

// endpoint to toggle if the task is accomplished or not
app.put("/todo/toggle", (req, res) => {
  const { id } = req.params;

  TodoModel.findOne({
    id,
  }).then((todo) => {
    TodoModel.updateOne({
      is_done: !todo.is_done,
    });

    return res.json({
      message: "Todo task updated succesfully.",
      data: todo,
    });
  });
});

// endpoint to edit the content of the todo
app.patch("/todo/edit/:todoId", (req, res) => {
  const { content } = req.body;
  const { todoId } = req.params;

  TodoModel.findOneAndUpdate(
    {
      id: todoId,
    },
    { content }
  ).then((todo) => {
    return res.json({
      message: "Todo task updated succesfully.",
      data: todo,
    });
  });
});

// endpoint to fetch all TodoModel tasks
app.get("/todos", (req, res) => {
  return TodoModel.findAll().then((todos) => {
    return res.json({
      message: "Todo list fetched succesfully.",
      data: todos,
    });
  });
});

// endpoint to get a single TodoModel
app.get("/todo/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.findOne({
    id,
  }).then((todo) => {
    return res.json({
      message: "Todo task fetched succesfully.",
      data: todo,
    });
  });
});

// endpoint to delete a TodoModel task
app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.deleteOne({
    id,
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

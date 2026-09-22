const express = require("express");
const app = express();
const path = require("path");
const { Todo } = require("./models");

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View engine setup (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 1. GET / - Render main To-Do page with category groups
app.get("/", async (request, response) => {
  try {
    const overdue = await Todo.overdue();
    const dueToday = await Todo.dueToday();
    const dueLater = await Todo.dueLater();

    if (request.accepts("html")) {
      response.render("index", {
        overdue,
        dueToday,
        dueLater,
      });
    } else {
      response.json({
        overdue,
        dueToday,
        dueLater,
      });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
});

// 2. GET /todos - Fetch all To-Dos as JSON
app.get("/todos", async (request, response) => {
  try {
    const todos = await Todo.findAll({ order: [["id", "ASC"]] });
    return response.json(todos);
  } catch (error) {
    console.error(error);
    return response.status(500).json(error);
  }
});

// 3. POST /todos - Create a new To-Do
app.post("/todos", async (request, response) => {
  try {
    const todo = await Todo.addTask({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    return response.json(todo);
  } catch (error) {
    console.error(error);
    return response.status(422).json(error);
  }
});

// 4. PUT /todos/:id/markAsCompleted - Mark To-Do as completed
app.put("/todos/:id/markAsCompleted", async (request, response) => {
  try {
    const todo = await Todo.findByPk(request.params.id);
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return response.status(422).json(error);
  }
});

// 5. DELETE /todos/:id - Delete a To-Do by ID
app.delete("/todos/:id", async (request, response) => {
  try {
    const deletedCount = await Todo.destroy({
      where: {
        id: request.params.id,
      },
    });

    return response.send(deletedCount > 0);
  } catch (error) {
    console.error(error);
    return response.status(500).send(false);
  }
});

module.exports = app;

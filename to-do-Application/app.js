const express = require("express");
const app = express();
const { Todo } = require("./models");

app.use(express.json());

// 1. GET /todos - Returns all To-Dos
app.get("/todos", async (request, response) => {
  try {
    const todos = await Todo.findAll({ order: [["id", "ASC"]] });
    return response.json(todos);
  } catch (error) {
    console.error(error);
    return response.status(500).json(error);
  }
});

// 2. DELETE /todos/:id - Deletes a To-Do by ID
app.delete("/todos/:id", async (request, response) => {
  try {
    const deletedCount = await Todo.destroy({
      where: {
        id: request.params.id,
      },
    });

    // Returns true if deleted, false otherwise
    return response.send(deletedCount > 0);
  } catch (error) {
    console.error(error);
    return response.status(500).send(false);
  }
});

module.exports = app;

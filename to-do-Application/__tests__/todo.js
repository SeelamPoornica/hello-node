const request = require("supertest");
const db = require("../models/index");
const app = require("../app");

let server, agent;

describe("Todo Application Routes", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("Deletes a todo by ID and returns true", async () => {
    const createResponse = await agent.post("/todos").send({
      title: "Sample task to delete",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
    });

    const parsedResponse = JSON.parse(createResponse.text);
    const todoId = parsedResponse.id;

    const response = await agent.delete(`/todos/${todoId}`).send();
    const parsedDeleteResponse = JSON.parse(response.text);

    expect(parsedDeleteResponse).toBe(true);
  });

  test("Returns false when deleting a non-existent todo ID", async () => {
    const response = await agent.delete("/todos/999999").send();
    const parsedDeleteResponse = JSON.parse(response.text);

    expect(parsedDeleteResponse).toBe(false);
  });
});

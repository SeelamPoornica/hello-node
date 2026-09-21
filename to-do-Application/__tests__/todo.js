const todoList = require('../todo');

describe("Todo List Test Suite", () => {
  let todos;
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];

  beforeEach(() => {
    todos = todoList();
  });

  // 1. A test that checks creating a new todo.
  test("Should add a new todo", () => {
    const initialCount = todos.all.length;
    todos.add({ title: "Test Todo", dueDate: today, completed: false });
    expect(todos.all.length).toBe(initialCount + 1);
  });

  // 2. A test that checks marking a todo as completed.
  test("Should mark a todo as completed", () => {
    todos.add({ title: "Complete me", dueDate: today, completed: false });
    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  // 3. A test that checks retrieval of overdue items.
  test("Should retrieve overdue items", () => {
    todos.add({ title: "Overdue task", dueDate: yesterday, completed: false });
    const overdueItems = todos.overdue();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe("Overdue task");
  });

  // 4. A test that checks retrieval of due today items.
  test("Should retrieve due today items", () => {
    todos.add({ title: "Today task", dueDate: today, completed: false });
    const todayItems = todos.dueToday();
    expect(todayItems.length).toBe(1);
    expect(todayItems[0].title).toBe("Today task");
  });

  // 5. A test that checks retrieval of due later items.
  test("Should retrieve due later items", () => {
    todos.add({ title: "Later task", dueDate: tomorrow, completed: false });
    const laterItems = todos.dueLater();
    expect(laterItems.length).toBe(1);
    expect(laterItems[0].title).toBe("Later task");
  });
});

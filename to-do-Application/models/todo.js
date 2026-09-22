'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo-list\n");

      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      console.log(overdueItems.map((item) => item.displayableString()).join("\n").trim());
      console.log("\n");

      console.log("Due Today");
      const dueTodayItems = await Todo.dueToday();
      console.log(dueTodayItems.map((item) => item.displayableString()).join("\n").trim());
      console.log("\n");

      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      console.log(dueLaterItems.map((item) => item.displayableString()).join("\n").trim());
    }

    static async overdue() {
      const today = new Date().toISOString().split('T')[0];
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: today,
          },
        },
        order: [['id', 'ASC']],
      });
    }

    static async dueToday() {
      const today = new Date().toISOString().split('T')[0];
      return await Todo.findAll({
        where: {
          dueDate: today,
        },
        order: [['id', 'ASC']],
      });
    }

    static async dueLater() {
      const today = new Date().toISOString().split('T')[0];
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: today,
          },
        },
        order: [['id', 'ASC']],
      });
    }

    static async markAsComplete(id) {
      return await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        }
      );
    }

    static associate(models) {
      // define association here if needed
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const today = new Date().toISOString().split('T')[0];

      if (this.dueDate === today) {
        return `${this.id}. ${checkbox} ${this.title.trim()}`;
      }

      return `${this.id}. ${checkbox} ${this.title.trim()} ${this.dueDate}`;
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Todo',
    }
  );

  return Todo;
};

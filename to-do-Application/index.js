const todoList = () => {
  all = []
  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    return all.filter(item => item.dueDate < todayStr);
  }

  const dueToday = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    return all.filter(item => item.dueDate === todayStr);
  }

  const dueLater = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    return all.filter(item => item.dueDate > todayStr);
  }

  const toDisplayableList = (list) => {
    const todayStr = new Date().toISOString().split("T")[0];
    return list.map(item => {
      const checkbox = item.completed ? "[x]" : "[ ]";
      const displayDate = item.dueDate === todayStr ? "" : ` ${item.dueDate}`;
      return `${checkbox} ${item.title}${displayDate}`;
    }).join("\n");
  }

  return { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList };
}

// #######################################
// !! DO NOT CHANGE ANYTHING BELOW THIS LINE !!
// #######################################

const todos = todoList();

var dateToday = new Date()
const formattedDate = d => {
  return d.toISOString().split("T")[0]
}
const today = formattedDate(dateToday)
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
)
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
)

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

console.log("My Todo-List\n\n")

console.log("Overdue")
var overdues = todos.overdue()
var formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log("\n\n")

console.log("Due Today")
let itemsDueToday = todos.dueToday()
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log("\n\n")

console.log("Due Later")
let itemsDueLater = todos.dueLater()
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log("\n\n")

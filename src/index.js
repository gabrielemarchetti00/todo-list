function Todo(title, description, dueDate, priority, project) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.project = project;
}

const todoOne = new Todo("exam", "algorithms", "21/4", "high", "university");

const middle = document.querySelector(".middle");
const todoList = document.createElement("ul");
middle.appendChild(todoList);

const liOne = document.createElement("li");
liOne.textContent = todoOne.title;
todoList.appendChild(liOne);

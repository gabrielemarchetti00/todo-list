function Todo(title, description, dueDate, priority, project) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.project = project;
}

function showTodos(project) {
  const middleBody = document.querySelector(".middle-body");
  middleBody.innerHTML = '';
  for (const i in project) {
    const todoDiv = document.createElement("div");
    todoDiv.textContent = `${project[i].title} - ${project[i].dueDate}`;
    middleBody.appendChild(todoDiv);
  }
}

const defaultProject = [];
const uniProject = [];
const sportProject = [];
const holidayProject = [];

defaultProject.push(new Todo("exam", "algorithms", "21/4", "high", "university"));
uniProject.push(new Todo("exam", "algorithms", "21/4", "high", "university"));

defaultProject.push(new Todo("basketball", "3v3, outdoor", "12/4", "low", "sport"));
sportProject.push(new Todo("basketball", "3v3, outdoor", "12/4", "low", "sport"));

defaultProject.push(new Todo("sardegna", "santa teresa, one week", "13/9", "middle", "holiday"));
holidayProject.push(new Todo("sardegna", "santa teresa, one week", "13/9", "middle", "holiday"));

showTodos(defaultProject);

const uniButton = document.querySelector('.uni');
uniButton.addEventListener('click', () => {
  showTodos(uniProject);
});

const sportButton = document.querySelector('.sport');
sportButton.addEventListener('click', () => {
  showTodos(sportProject);
});

const holidayButton = document.querySelector('.hol');
holidayButton.addEventListener('click', () => {
  showTodos(holidayProject);
});

const allButton = document.querySelector('.all');
allButton.addEventListener('click', () => {
  showTodos(defaultProject);
});
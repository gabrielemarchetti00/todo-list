function Todo(title, description, dueDate, priority, project, pos) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.project = project;
  this.pos = pos;
}

function showTodos(project) {
  const middleBody = document.querySelector(".middle-body");
  middleBody.innerHTML = '';
  for (const i in project) {
    const todoDiv = document.createElement("div");
    todoDiv.className = 'todos';
    todoDiv.id = project[i].pos;
    todoDiv.textContent = `${project[i].title} - ${project[i].dueDate}`;
    middleBody.appendChild(todoDiv);
  }
  makeTodosClickable();
}

function makeTodosClickable() {
  const todosDiv = document.querySelectorAll('.todos');
  todosDiv.forEach((todo) => {
  todo.addEventListener('click', () => {
    for(const i in defaultProject){
      if(todo.id == defaultProject[i].pos){
        selectedTodo = defaultProject[i];
        showDetails(selectedTodo);
      }
    }
  });
});
}

function showDetails(todo){
  detailsSection.innerHTML = '';
  const keys = Object.keys(todo);
  for (let i = 0; i < keys.length - 1; i++) {
    const detailDiv = document.createElement('div');
    detailDiv.classList = 'single-detail';
    const titleDiv = document.createElement('div');
    const contentDiv = document.createElement("div");
    switch(i){
      case 0: 
        titleDiv.textContent = 'Title:'
        contentDiv.textContent = todo[keys[i]];
        break;
      case 1:
        titleDiv.textContent = 'Description:'
        contentDiv.textContent = todo[keys[i]];
        break;
      case 2:
        titleDiv.textContent = 'Due date:'
        contentDiv.textContent = todo[keys[i]];
        break;
      case 3:
        titleDiv.textContent = 'Priority:'
        contentDiv.textContent = todo[keys[i]];
        break;
    }
    detailDiv.appendChild(titleDiv);
    detailDiv.appendChild(contentDiv);
    detailsSection.appendChild(detailDiv);
  }
}

function deleteTodo(selectedTodo){
    defaultProject.splice(defaultProject.indexOf(selectedTodo), 1);
    if(selectedTodo.project == 'university'){
      uniProject.splice(uniProject.indexOf(selectedTodo), 1);
    }else if(selectedTodo.project == 'sport'){
      sportProject.splice(sportProject.indexOf(selectedTodo), 1);
    }else if(selectedTodo.project == 'holiday'){
      holidayProject.splice(holidayProject.indexOf(selectedTodo), 1);
    }
    showTodos(defaultProject);
}

const defaultProject = [];
const uniProject = [];
const sportProject = [];
const holidayProject = [];

todoOne = new Todo("exam", "algorithms", "21/4", "high", "university", 1);
defaultProject.push(todoOne);
uniProject.push(todoOne);

todoTwo = new Todo("basketball", "3v3, outdoor", "12/4", "low", "sport", 2)
defaultProject.push(todoTwo);
sportProject.push(todoTwo);

todoThree = new Todo("sardegna", "santa teresa, one week", "13/9", "middle", "holiday", 3);
defaultProject.push(todoThree);
holidayProject.push(todoThree);

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

let selectedTodo;
const detailsSection = document.querySelector('.details');

const deleteSection = document.querySelector('.delete');
const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Delete';
deleteBtn.id = 'delete-button';
deleteSection.appendChild(deleteBtn);
deleteBtn.addEventListener('click', () => {
  deleteTodo(selectedTodo);
  detailsSection.innerHTML = '';
});





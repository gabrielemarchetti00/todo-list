import { populateStorage, getStorageDefault, getStorageUni, getStorageSport, getStorageHoliday } from "./storage";

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
    populateStorage(defaultProject, uniProject, sportProject, holidayProject);
    showTodos(defaultProject);
}

function addTodo(t, d, dd, pr, pj, pos){
  const todo = new Todo(t, d, dd, pr, pj, pos);
  defaultProject.push(todo);
  if(todo.project == 'university'){
    uniProject.push(todo);
  }else if(todo.project == 'sport'){
    sportProject.push(todo);
  }else if(todo.project == 'holiday'){
    holidayProject.push(todo);
  }
  populateStorage(defaultProject, uniProject, sportProject, holidayProject);
}

function editTodo(t, d, dd, pr, pj){
  if(selectedTodo.title != t){
    selectedTodo.title = t;
  }
  if(selectedTodo.dueDate != dd){
    selectedTodo.dueDate = d;
  }
  if(selectedTodo.description != d){
    selectedTodo.description = d;
  }
  if(selectedTodo.priority != pr){
    selectedTodo.priority = pr;
  }
  if(selectedTodo.project != pj){
    if(selectedTodo.project == 'university'){
      uniProject.splice(uniProject.indexOf(selectedTodo), 1);
    }
    else if(selectedTodo.project == 'sport'){ 
      sportProject.splice(sportProject.indexOf(selectedTodo), 1);
    }
    else if(selectedTodo.project == 'holiday'){ 
      holidayProject.splice(holidayProject.indexOf(selectedTodo), 1);
    }
    if(pj == 'university'){
      uniProject.push(selectedTodo);
    }
    else if(pj == 'sport'){
      sportProject.push(selectedTodo);
    }
    else if(pj == 'holiday'){
      holidayProject.push(selectedTodo);
    }
    selectedTodo.project = pj;
  }
  populateStorage(defaultProject, uniProject, sportProject, holidayProject);
  showTodos(defaultProject);
}

let defaultProject = [];
let uniProject = [];
let sportProject = [];
let holidayProject = [];

const todoOne = new Todo("exam", "algorithms", "21/4", "high", "university", 1);
defaultProject.push(todoOne);
uniProject.push(todoOne);

const todoTwo = new Todo("basketball", "3v3, outdoor", "12/4", "low", "sport", 2)
defaultProject.push(todoTwo);
sportProject.push(todoTwo);

const todoThree = new Todo("sardegna", "santa teresa, one week", "13/9", "middle", "holiday", 3);
defaultProject.push(todoThree);
holidayProject.push(todoThree);

if (!localStorage.getItem("default")) {
  populateStorage(defaultProject, uniProject, sportProject, holidayProject);
} else {
  defaultProject = getStorageDefault();
  uniProject = getStorageUni();
  sportProject = getStorageSport();
  holidayProject = getStorageHoliday();
}

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


const newForm = document.querySelector('.new-form');
const newBtn = document.querySelector("#new-button");
newBtn.addEventListener("click", () => {
  newForm.style.display = "block";
});

let title, desc, dueDate, priority, project, pos;
const newSubmitBtn = document.querySelector("#new-submit-button");
newSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  title = document.querySelector("#new-title");
  desc = document.querySelector("#new-desc");
  dueDate = document.querySelector("#new-duedate");
  priority = document.querySelector('#new-priority');
  project = document.querySelector('#new-project');
  pos = defaultProject.length + 1;

  addTodo(title.value, desc.value, dueDate.value, priority.value, project.value, pos);
  showTodos(defaultProject);

  newForm.style.display = "none";
  newForm.reset();
});

const editForm = document.querySelector('.edit-form');
const editBtn = document.querySelector("#edit-button");
editBtn.addEventListener("click", () => {
  editForm.style.display = "block";
  title = document.querySelector("#edit-title");
  title.value = selectedTodo.title;
  desc = document.querySelector("#edit-desc");
  desc.value = selectedTodo.description;
  dueDate = document.querySelector("#edit-duedate");
  dueDate.value = selectedTodo.dueDate;
  priority = document.querySelector('#edit-priority');
  priority.value = selectedTodo.priority;
  project = document.querySelector('#edit-project');
  project.value = selectedTodo.project;
});

const editSubmitBtn = document.querySelector("#edit-submit-button");
editSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  editTodo(title.value, desc.value, dueDate.value, priority.value, project.value);
  showDetails(selectedTodo);

  editForm.style.display = "none";
  editForm.reset();
});
/*
// On app load, get all tasks from localStorage
window.onload = loadTasks;

// On form submit add task
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addTask();
});

function loadTasks() {
  // check if localStorage has any tasks
  // if not then return
  if (localStorage.getItem("tasks") == null) return;

  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // Loop through the tasks and add them to the list
  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
      <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
  });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");
  // return if task is empty
  if (task.value === "") {
    alert("Please add some task!");
    return false;
  }
  // check is task already exist
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("Task already exist!");
    return false;
  }

  // add task to local storage
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

  // create list item, add innerHTML and append to ul
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
  <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
  <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
  list.insertBefore(li, list.children[0]);
  // clear input
  task.value = "";
}

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}

// edit the task and update local storage
function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  // check if task is empty
  if (event.value === "") {
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }
  // task already exist
  tasks.forEach(task => {
    if (task.task === event.value) {
      alert("Task already exist!");
      event.value = currentTask;
      return;
    }
  });
  // update task
  tasks.forEach(task => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });
  // update local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
*/

const baseUrl = "https://crudcrud.com/api/"

const apiKey = "f9b826b952484353ad67fcc35b8d5a3c"
const url = baseUrl + apiKey;
endpointTodos = `${url}/todos`;

let todos = [];
loadTodos();

function newElement() {
  var inputValue = document.getElementById("input").value;
  if(!inputValue){
    alert("Todo harus di isi!");
    return;
  }
  const todo = {
    title: inputValue,
    checked: false,
  };

  fetch(endpointTodos, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((response) => response.json())
    .then((todo)=>{
      createList(todo);
    })
}

function createList(todo) {
  const li = document.createElement("li");
  li.dataset.id = todo._id;
  li.innerText = todo.title;
  li.onclick = checkTodo;
  var button = document.createElement("BUTTON")
  var txt = document.createTextNode("\u00D7")
  button.className = "close";
  button.onclick = closeTodo;
  button.appendChild(txt)
  
  if (todo.checked) {
    li.classList.toggle("checked");
  }
  li.appendChild(button);
  document.getElementById("listUL").appendChild(li);
}

function closeTodo(e) {
  e.stopPropagation();
  const id = this.parentElement.dataset.id;
  let confirmed = confirm("Apakah ingin menghapus kegiatan ini?");
  if(confirmed) {
    if(todos != null) {
      fetch(endpointTodos + "/" + id, {
        method: "DELETE",
      }).then((response) => {
        const index = todos.findIndex((todo) => todo.id = id);
        todos.splice(index, 1);
        this.parentElement.remove();
      });
    }
  }
}

function checkTodo() {
  const id = this.dataset.id;
  if (todos != null) {
    const index = todos.findIndex((todo) => todo._id = id);
    const todo = todos[index];
    console.log(todo);
    if (todo) {
      todo.checked = !todo.checked;

      fetch(endpointTodos + "/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo.title,
          checked: todo.checked,
        }),
      })
        .then((updated) => updated.json())
        .then((todo) => console.log(todo));
        todos[index] = todo;
    }
  }
  this.classList.toggle("checked");
}

function loadTodos() {
  fetch(endpointTodos)
      .then((response) => response.json())
      .then((data) =>{
            todos = data;
            todos.forEach((todo) => {
              createList(todo);
            })
      })
}
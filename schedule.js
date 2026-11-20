// Element ids and classes needed:
// taskInput
// addTaskButton
// taskList

let taskInput = document.getElementById("taskInput");
let addTaskButton = document.getElementById("addTaskButton");
let taskList = document.getElementById("taskList");
let tasks = [];

// This block restores saved tasks if browser storage is available.
try {
  let savedTasks = localStorage.getItem("scheduleTasks");
  if (savedTasks) {
    let parsedTasks = JSON.parse(savedTasks);
    if (Array.isArray(parsedTasks)) {
      tasks = parsedTasks;
    }
  }
} catch (error) {
  tasks = [];
}

// This block saves the current task list.
function saveTasks() {
  try {
    localStorage.setItem("scheduleTasks", JSON.stringify(tasks));
  } catch (error) {
    // Tasks still work for this page visit if storage is unavailable.
  }
}

// This block draws tasks, checkboxes, and delete buttons.
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    let item = document.createElement("li");
    let label = document.createElement("label");
    let checkbox = document.createElement("input");
    let text = document.createElement("span");
    let deleteButton = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    text.textContent = task.text;
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    if (task.done) {
      item.classList.add("done");
    }

    checkbox.addEventListener("change", function () {
      tasks[index].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    label.appendChild(checkbox);
    label.appendChild(text);
    item.appendChild(label);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  });
}

// This block adds a non-empty task.
function addTask() {
  let text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  tasks.push({ text: text, done: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
  taskInput.focus();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskStatus = document.getElementById("taskStatus");
let tasks = [];
let storageWarning = "";

try {
  const savedTasks = localStorage.getItem("scheduleTasks");
  if (savedTasks) {
    try {
      const parsedTasks = JSON.parse(savedTasks);
      if (Array.isArray(parsedTasks)) {
        tasks = parsedTasks.filter(function (task) {
          return task && typeof task.text === "string" && typeof task.done === "boolean";
        });
        if (tasks.length !== parsedTasks.length) {
          storageWarning = "Some saved tasks were invalid and could not be loaded.";
        }
      } else {
        storageWarning = "Saved tasks could not be read. You can start a new list.";
      }
    } catch (error) {
      storageWarning = "Saved tasks could not be read. You can start a new list.";
    }
  }
} catch (error) {
  storageWarning = "Saving is unavailable in this browser; tasks will be lost when you leave this page.";
}

function saveTasks(message) {
  try {
    localStorage.setItem("scheduleTasks", JSON.stringify(tasks));
    storageWarning = "";
    taskStatus.textContent = message;
  } catch (error) {
    storageWarning = "Saving is unavailable in this browser; tasks will be lost when you leave this page.";
    taskStatus.textContent = storageWarning;
  }
}

function renderTasks() {
  taskList.replaceChildren();

  if (tasks.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "task-empty";
    emptyItem.textContent = "No tasks yet. Add one above.";
    taskList.appendChild(emptyItem);
    return;
  }

  tasks.forEach(function (task) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const text = document.createElement("span");
    const deleteButton = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark " + task.text + " complete");
    text.textContent = task.text;
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Delete " + task.text);

    if (task.done) {
      item.classList.add("done");
    }

    checkbox.addEventListener("change", function () {
      task.done = checkbox.checked;
      saveTasks("Task updated.");
      renderTasks();
    });

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (currentTask) {
        return currentTask !== task;
      });
      saveTasks("Task deleted.");
      renderTasks();
    });

    label.appendChild(checkbox);
    label.appendChild(text);
    item.appendChild(label);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  });
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = taskInput.value.trim();

  if (!text) {
    taskStatus.textContent = "Enter a task before adding it.";
    taskInput.focus();
    return;
  }

  tasks.push({ text: text, done: false });
  taskInput.value = "";
  saveTasks("Task added.");
  renderTasks();
  taskInput.focus();
});

renderTasks();
if (storageWarning) {
  taskStatus.textContent = storageWarning;
}

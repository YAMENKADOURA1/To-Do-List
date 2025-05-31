document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

let myButton = document.getElementById("submit");

myButton.addEventListener("click", () => {
  let myTask = document.querySelector("input").value;

  if (myTask === "") {
    alert("Task Field Shouldn't Be Empty");
  } else {
    addTask(myTask);
    saveTask(myTask); // Save task to localStorage
  }
});

function addTask(myTask) {
  let taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  let checkButton = document.createElement("input");
  checkButton.setAttribute("type", "radio");

  let taskName = document.createElement("p");
  taskName.textContent = myTask;
  taskName.classList.add("task-Name");

  let closeButton = document.createElement("button");
  closeButton.textContent = "✖";
  closeButton.classList.add("close-btn");

  // Strike-through when radio button is checked
  checkButton.addEventListener("change", () => {
    taskName.style.textDecoration = checkButton.checked
      ? "line-through"
      : "none";
    taskName.style.color = checkButton.checked ? "#888" : "#000";
  });

  // Remove task from localStorage when deleted
  closeButton.addEventListener("click", () => {
    taskCard.remove();
    removeTask(myTask); // Update localStorage
  });

  taskCard.appendChild(checkButton);
  taskCard.appendChild(taskName);
  taskCard.appendChild(closeButton);

  document.querySelector(".container").appendChild(taskCard);
}

// Function to save task to localStorage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTask(task));
}

// Function to remove task from localStorage
function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t !== task); // Remove the specific task
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

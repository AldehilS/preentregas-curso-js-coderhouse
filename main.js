import { Task } from "./js/models/Task.js";
import { getTasks, saveTasks } from "./js/utils/tasks-management.js";
import { setTaskListMaxHeight } from "./js/utils/calc-tasklist-height.js";
import { labelTopFormAnimation } from "./js/animations/label-top-animation.js";
import { refreshTaskList } from "./js/utils/refresh-tasklist.js";

// Get the main components of the page
const taskList = document.querySelector(".tasklist");
const actionButtons = taskList.querySelectorAll("button");
const deleteAllTasksButton = actionButtons[0];
const addNewTaskButton = actionButtons[1];
const userInfo = document.querySelector(".user-info");
const logoutButton = userInfo.querySelector("button");
const userNameText = userInfo.querySelectorAll("span")[1];

// Try to get the authentication status from the session storage
const authenticated = sessionStorage.getItem("authenticated");

// If the user is not authenticated, redirect to the login page
if (!authenticated) {
  window.location.href = "pages/login.html";
}

// Display the username in the user info section
userNameText.innerText = authenticated;

// Event listener to adjust the task list max-height when the window is resized
window.addEventListener("resize", setTaskListMaxHeight);

// onClick for the add new task button
addNewTaskButton.onclick = () => {
  addNewTaskButton.disabled = true; // Disable the button
  const newTaskTemplate = document.getElementById("new-task-template");
  const clone = newTaskTemplate.content.cloneNode(true);

  taskList.insertBefore(clone, addNewTaskButton);

  // Resize the task list max-height to fit the new form
  setTaskListMaxHeight();

  const newTaskForm = document.querySelector(".new-task-form");
  labelTopFormAnimation(newTaskForm);

  newTaskForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#task-title").value;
    const description = document.querySelector("#task-description").value;
    const dueDate = document.querySelector("#task-due-date").value;

    // Get the tasks from the local storage or an empty array
    const tasks = getTasks();

    // Add the new task to the tasks array
    tasks.push(new Task("user", title, description, dueDate));

    // Save the tasks array to the local storage
    saveTasks(tasks);

    // Enable the add new task button
    addNewTaskButton.disabled = false;

    // Refresh the task list
    refreshTaskList();

    // Remove the new task form
    newTaskForm.remove();

    // Resize the task list
    setTaskListMaxHeight();
  });
};

// onClick for the delete all tasks button
deleteAllTasksButton.onclick = () => {
  // Clear the local storage
  localStorage.removeItem("tasks");

  // Refresh the task list
  refreshTaskList();
};

// onClick for the logout button
logoutButton.onclick = () => {
  // Remove the authentication status from the session storage
  sessionStorage.removeItem("authenticated");
  // Redirect to the login page
  window.location.href = "pages/login.html";
};

// Call the function to display the tasks when the page loads
refreshTaskList();

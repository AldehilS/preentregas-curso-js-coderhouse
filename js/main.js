import { Task } from './Task.js';

const taskList = document.querySelector(".tasklist");
const actionButtons = taskList.querySelectorAll("button");
const deleteAllTasksButton = actionButtons[0];
const addNewTaskButton = actionButtons[1];

// Function to display the tasks on the page
function refreshTaskList() {
  // Clear the task list
  const taskListUl = taskList.querySelector("ul");
  taskListUl.innerHTML = "";

  // Get the tasks from the local storage or an empty array
  // TODO: Filter the tasks by the user
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const tasksNumber = tasks.length;
  
  // If there are no tasks...
  if (tasksNumber === 0) {
    deleteAllTasksButton.disabled = true; // Disable the button
    const noTasksp = document.createElement("p");
    noTasksp.innerText = "No tasks to display";
    noTasksp.id = "no-tasks";
    taskList.insertBefore(noTasksp, addNewTaskButton);
    return;
  }

  // Enable the delete all tasks button
  deleteAllTasksButton.disabled = false;

  // Delete the 'No tasks to display' message if it exists
  const taskListp = taskList.querySelector("#no-tasks");
  if (taskListp) {
    taskList.removeChild(taskListp);
  }


  // Create a new unordered list
  tasks.forEach((task) => {
    const taskTemplate = document.getElementById('task-template');
    const clone = taskTemplate.content.cloneNode(true);
    const title = clone.querySelector("h3")
    const p_elements = clone.querySelectorAll("p")
    const description = p_elements[0];
    const dueDate = p_elements[1];
    const deleteButton = clone.querySelector("button");

    // TODO: To correctly delete the task, it is needed to validate that the title is unique
    deleteButton.onclick = () => {
      // Get the tasks from the local storage or an empty array
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      // Filter the tasks to remove the task with the title of the current task
      const newTasks = tasks.filter((t) => t.title !== task.title);

      // Save the new tasks array to the local storage
      localStorage.setItem('tasks', JSON.stringify(newTasks));

      // Refresh the task list
      refreshTaskList();
    };

    title.innerText = `Title: ${task.title}`;
    description.innerText = `Description: ${task.description}`;
    dueDate.innerText = `Due date: ${task.dueDate}`;

    taskListUl.append(clone);
  });
}

// onClick for the add new task button
addNewTaskButton.onclick = () => {
  addNewTaskButton.disabled = true; // Disable the button
  const newTaskTemplate = document.getElementById('new-task-template');
  const clone = newTaskTemplate.content.cloneNode(true);

  taskList.insertBefore(clone, addNewTaskButton);

  const newTaskForm = document.querySelector(".new-task-form");
  newTaskForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#task-title").value;
    const description = document.querySelector("#task-description").value;
    const dueDate = document.querySelector("#task-due-date").value;

    // Get the tasks from the local storage or an empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task to the tasks array
    tasks.push(new Task("user", title, description, dueDate));

    // Save the tasks array to the local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Enable the add new task button
    addNewTaskButton.disabled = false;
    
    // Refresh the task list
    refreshTaskList();

    // Remove the new task form
    newTaskForm.remove();
  })
};

// onClick for the delete all tasks button
deleteAllTasksButton.onclick = () => {
  // Clear the local storage
  localStorage.removeItem('tasks');

  // Refresh the task list
  refreshTaskList();
};

// Try to get the authentication status from the session storage
const authenticated = sessionStorage.getItem('authenticated');

// If the user is not authenticated, redirect to the login page
if (!authenticated) {
  window.location.href = "pages/login.html";
}

// Call the function to display the tasks when the page loads
refreshTaskList();
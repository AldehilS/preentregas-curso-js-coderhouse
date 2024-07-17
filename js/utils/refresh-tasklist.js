import { getTasks, saveTasks } from "./tasks-management.js";
import { setTaskListMaxHeight } from "./calc-tasklist-height.js";

/** 
 * Function to display the tasks on the page
 * @param {string} username - The username to filter the tasks
 */
export function refreshTaskList(username) {
  const taskList = document.querySelector(".tasklist");
  const taskListUl = taskList.querySelector("ul");
  const deleteAllTasksButton = taskList.querySelector("div button");
  const addNewTaskButton = taskList.querySelector("& > button");

  // Clear the task list
  taskListUl.innerHTML = "";

  setTaskListMaxHeight();

  // Get the tasks from the local storage or an empty array
  // TODO: Filter the tasks by the user
  const tasks = getTasks(username);
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
    const taskTemplate = document.getElementById("task-template");
    const clone = taskTemplate.content.cloneNode(true);
    const title = clone.querySelector("h3");
    const p_elements = clone.querySelectorAll("p");
    const description = p_elements[0];
    const dueDate = p_elements[1];
    const deleteButton = clone.querySelector("button");

    // TODO: To correctly delete the task, it is needed to validate that the title is unique
    deleteButton.onclick = () => {
      // Get the tasks from the local storage or an empty array
      const tasks = getTasks(username);

      // Filter the tasks to remove the task with the title of the current task
      const newTasks = tasks.filter((t) => t.title !== task.title);

      // Save the new tasks array to the local storage
      saveTasks(newTasks, username);

      // Refresh the task list
      refreshTaskList(username);
    };

    title.innerText = `Title: ${task.title}`;
    description.innerText = `Description: ${task.description}`;
    dueDate.innerText = `Due date: ${task.dueDate}`;

    taskListUl.append(clone);
  });
}
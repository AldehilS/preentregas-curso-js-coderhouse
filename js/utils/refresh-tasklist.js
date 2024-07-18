import { getTasks, saveTasks } from "./tasks-management.js";
import { setTaskListMaxHeight } from "./calc-tasklist-height.js";

/** 
 * Function to display the tasks on the page
 * @param {string} username - The username to filter the tasks
 * @param {string} filter - The filter to apply to the task list
 */
export function refreshTaskList(username, filter = "allTasks") {
  const taskList = document.querySelector(".tasklist");
  const taskListUl = taskList.querySelector("ul");
  const deleteAllTasksButton = taskList.querySelector("div button");
  const addNewTaskButton = taskList.querySelector("& > button");

  // Clear the task list
  taskListUl.innerHTML = "";

  setTaskListMaxHeight();

  // Get the tasks from the local storage or an empty array
  const tasks = getTasks(username);

  // Filter the tasks to show
  let tasksToShow = [...tasks];
  switch (filter) {
    case "myDay": // Show the tasks for today
      tasksToShow = tasks.filter((task) => {
        const today = new Date();
        const dueDate = new Date(`${task.dueDate}T00:00:00`);
        return (
          dueDate.getDate() === today.getDate() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getFullYear() === today.getFullYear()
        );
      });
      break;
    // TODO: Implement a way to mark tasks as important
    case "important": // Show tasks marked as important
      tasksToShow = tasks.filter((task) => task.important);
      break;
    case "planned": // Show tasks with a due date greater than today
      tasksToShow = tasks.filter((task) => {
        const today = new Date();
        const dueDate = new Date(task.dueDate);
        return dueDate > today;
      });
      break;
    default:
      break;
    }

  const tasksNumber = tasksToShow.length;

  // If there are no tasks...
  if (tasksNumber === 0) {
    deleteAllTasksButton.disabled = true; // Disable the button
    const noTasksp = taskList.querySelector("#no-tasks");
    if (!noTasksp) {
      const newTaskForm = taskList.querySelector(".new-task-form");
      const newp = document.createElement("p");
      newp.innerText = "No tasks to display";
      newp.id = "no-tasks";
      if (newTaskForm) {
        taskList.insertBefore(newp, newTaskForm);
        return;
      }
      taskList.insertBefore(newp, addNewTaskButton);
    }
    return;
  }

  // Sort the tasks by due date in ascending order
  tasksToShow.sort((a, b) => {
    const dateA = new Date(`${a.dueDate}T00:00:00`);
    const dateB = new Date(`${b.dueDate}T00:00:00`);
    return dateA - dateB;
  });

  // Enable the delete all tasks button
  deleteAllTasksButton.disabled = false;

  // Delete the 'No tasks to display' message if it exists
  const taskListp = taskList.querySelector("#no-tasks");
  if (taskListp) {
    taskList.removeChild(taskListp);
  }

  // Create a new unordered list
  tasksToShow.forEach((task) => {
    const taskTemplate = document.getElementById("task-template");
    const clone = taskTemplate.content.cloneNode(true);
    const title = clone.querySelector("h3");
    const p_elements = clone.querySelectorAll("p");
    const description = p_elements[0];
    const dueDate = p_elements[1];
    const deleteButton = clone.querySelector("button");
    const cloneLi = clone.querySelector("li");

    // TODO: To correctly delete the task, it is needed to validate that the title is unique
    deleteButton.onclick = (event) => {
      event.stopPropagation();

      // Get the tasks from the local storage or an empty array
      const tasks = getTasks(username);

      // Filter the tasks to remove the task with the title of the current task
      const newTasks = tasks.filter((t) => t.title !== task.title);

      // Save the new tasks array to the local storage
      saveTasks(newTasks, username);

      // Refresh the task list
      refreshTaskList(username, filter);
    };

    // Add event listener to mark the task as completed when clicked
    cloneLi.addEventListener("click", () => {
      cloneLi.classList.toggle("task-completed");
      task.toggleCompleted();
      const newTasks = tasks.map((t) => (t.title === task.title ? task : t));
      saveTasks(newTasks, username);
    })

    title.innerText = `Title: ${task.title}`;
    description.innerText = `Description: ${task.description}`;
    dueDate.innerText = `Due date: ${task.dueDate}`;

    if (task.completed) {
      cloneLi.classList.add("task-completed");
    }

    taskListUl.append(clone);
  });
}

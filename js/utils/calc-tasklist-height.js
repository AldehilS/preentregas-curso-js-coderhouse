// Function to calculate the max height of the task list
export function setTaskListMaxHeight() {
  const taskList = document.querySelector(".tasklist");
  const taskListUl = taskList.querySelector("ul");
  const newTaskForm = taskList.querySelector(".new-task-form");
  const addNewTaskButton = taskList.querySelector("& > button");
  const banner = taskList.querySelector("& > div");

  // Get the tasklist section height
  const taskListHeight = taskList.clientHeight;

  // Get the banner height
  const bannerHeight = banner.clientHeight;
  const bannerMarginBottom = parseInt(
    window.getComputedStyle(banner).marginBottom
  );

  // Get the new task form height if it exists
  const formHeight = newTaskForm ? newTaskForm.clientHeight : 0;

  // Get the add new task button height
  const buttonHeight = addNewTaskButton.clientHeight;

  // Set the max height of the task list ul
  taskListUl.style.maxHeight = `${
    taskListHeight -
    bannerHeight -
    bannerMarginBottom -
    formHeight -
    buttonHeight
  }px`;
}

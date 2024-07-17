// Function to calculate the max height of the task list
export function setTaskListMaxHeight() {
    const taskList = document.querySelector(".tasklist");
    const taskListUl = taskList.querySelector("ul");
    const newTaskForm = taskList.querySelector(".new-task-form");

    // Get the tasklist section height
    const taskListHeight = taskList.clientHeight;
    
    // Get the new task form height if it exists
    let formHeight = 0;
    if (newTaskForm) {
      formHeight = newTaskForm.clientHeight;
    }
  
    // Set the max height of the task list ul
    taskListUl.style.maxHeight = `${(taskListHeight * 0.6) - formHeight}px`;
  }
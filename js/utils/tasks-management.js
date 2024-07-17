/**
 * Get tasks from local storage
 * @param {String} username - The username to filter the tasks
 * @returns {Array} tasks
 */
export function getTasks(username) {
  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const userTasks = allTasks.filter((task) => task.assignedUser === username);
  console.log(userTasks);
  return userTasks;
}

/**
 * Save tasks to local storage
 * @param {Array} tasks - The tasks to save
 * @param {String} username - The username to filter the tasks
 */
export function saveTasks(tasks, username) {
  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const notUserTasks = allTasks.filter((task) => task.assignedUser !== username);
  const newTasks = [...notUserTasks, ...tasks];
  localStorage.setItem("tasks", JSON.stringify(newTasks));
}

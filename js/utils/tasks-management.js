/**
 * TODO: Right now all the operations are performed on tasks of every user.
 * It is needed to permorm them only on the tasks of the authenticated user.
 *  */

/**
 * Get tasks from local storage
 * @returns {Array} tasks
 */
export function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

/**
 * Save tasks to local storage
 * @param {Array} tasks
 */
export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

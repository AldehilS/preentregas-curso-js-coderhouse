import { Task } from "../models/Task.js";

/**
 * Get tasks from local storage
 * @param {String} username - The username to filter the tasks
 * @returns {Array<Task>} tasks
 */
export function getTasks(username) {
  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const userTasks = allTasks
    .filter((task) => task.assignedUser === username)
    .map(
      (task) =>
        new Task(
          task.assignedUser,
          task.title,
          task.description,
          task.dueDate,
          task.completed
        )
    );
  return userTasks;
}

/**
 * Save tasks to local storage
 * @param {Array<Task>} tasks - The tasks to save
 * @param {String} username - The username to filter the tasks
 */
export function saveTasks(tasks, username) {
  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const notUserTasks = allTasks.filter(
    (task) => task.assignedUser !== username
  );
  const newTasks = [...notUserTasks, ...tasks];
  localStorage.setItem("tasks", JSON.stringify(newTasks));
}

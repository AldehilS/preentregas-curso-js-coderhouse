// Class Task that represents a task with a description and a completed state
class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }

  toString() {
    return this.description + (this.completed ? " (completed)" : " (pending...)");
  }
}

// Show options menu and validate that the user chooses a valid option
function displayMenu(userName) {
  // Objeto que contiene las opciones del menú de la aplicación
  // Permite la escalabilidad de la aplicación al poder agregar más opciones
  // de manera ordenada.
  const menu = {
    0: "Exit",
    1: "List tasks",
    2: "Add task",
    3: "Delete task",
  };

  //  Format the menu object to a string
  const menuString = Object.keys(menu)
  .map((key) => `${key}. ${menu[key]}`)
  .join('\n');

  // Display the prompt with the formatted menu
  let userChoice = Number(
    prompt(userName + "\nChoose an option:\n" + menuString)
  );

  while (isNaN(userChoice) || userChoice < 0 || userChoice > menu.length - 1) {
    userChoice = Number(
      prompt(userName + "\nChoose a valid option:\n" + menuString)
    );
  }

  return userChoice;
}

// Obtain the user name evaluating that it is not an empty string or null
function requestUserName() {
  let userInputName = prompt("Enter your name: ").trim();
  while (userInputName === null || userInputName === "") {
    userInputName = prompt("Enter a valid name: ").trim();
  }

  return userInputName;
}

// Returns a string to represent the registered tasks in a list
function showTasks(tasks) {
  let registeredTasks = "Registered tasks: \n";
  for (let i = 0; i < tasks.length; i++) {
    registeredTasks += (i + 1).toString() + ". " + tasks[i].toString() + "\n";
  }

  return registeredTasks;
}

let tasks = [];

let userName = requestUserName();
let selectedOption = displayMenu(userName);

/**
 * It was used a while loop to keep the application running until the user
 * chooses the option to exit. This way the user can keep using the application
 * without having to run it again.
 */
while (true) {
  switch (selectedOption) {
    case 0:
      // Exit
      alert("Goodbye " + userName + "!!!");
      userName = "";
      break;
    case 1:
      // List tasks
      if (tasks.length === 0) {
        alert("No tasks registered");
      } else {
        let registeredTasks = showTasks(tasks);
        alert(registeredTasks);
      }
      break;
    case 2:
      // Add task
      let newTask = prompt("Enter the task: ").trim();
      while (newTask !== null && newTask === "") {
        newTask = prompt("Enter the task: ").trim();
      }
      if (newTask !== null) {
        const task = new Task(newTask);
        tasks.push(task);
        alert("New task added successfully");
      }
      break;
    case 3:
      // Delete task
      if (tasks.length === 0) {
        alert("No tasks registered");
      } else {
        let registeredTasks = showTasks(tasks) + "0. Cancel\n";
        let taskToDelete = Number(
          prompt(registeredTasks + "Enter the number of the task to delete: ")
        );
        while (
          isNaN(taskToDelete) ||
          taskToDelete < 0 ||
          taskToDelete > tasks.length
        ) {
          taskToDelete = Number(
            prompt(
              registeredTasks +
                "Enter a valid number of the task to delete: "
            )
          );
        }

        if (taskToDelete !== 0) {
          tasks.splice(taskToDelete - 1, 1);
          alert("Task deleted successfully");
        }
      }
      break;
    default:
      alert("Not valid option!!!");
      break;
  }

  if (userName === "") {
    userName = requestUserName();
  }

  selectedOption = displayMenu(userName);
}

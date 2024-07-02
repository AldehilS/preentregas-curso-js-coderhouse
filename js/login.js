import { User } from "./User.js";

// Get the form element, the username and password fields
const loginForm = document.querySelector("form");
const usernameField = loginForm.querySelector("#username");
const passwordField = loginForm.querySelector("#password");

/**
 * Due to this course doesn't include databases,
 * or any backend service to validate the users
 * I used a hardcoded list of allowed users to simulate
 * the authentication.
 * The users are stored in the local storage and there can also
 * be added new users with the sign in form.
 */

const defaulUsers = [
  new User("Admin" ,"admin", "admin"),
  new User("Test User" ,"test_user", "test_password"),
];

// Try to get the users from the local storage
const localStoredUsers = localStorage.getItem("users");
// If there are no users, create an empty array, otherwise parse the string
let users = localStoredUsers ? JSON.parse(localStoredUsers) : [];

// Check if the default usernames are already in the local storage
defaulUsers.forEach((defaultUser) => {
  const repeatedUsername = users.find((localStoredUser) => localStoredUser.username === defaultUser.username);
  if (!repeatedUsername) {
    users.push(defaultUser);
  }
})
// Store the users in the local storage
localStorage.setItem("users", JSON.stringify(users));

// -----------------------------------------------------

/**
 * Event listener for the form submission
 * Validate the username and password
 */
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = usernameField.value;
  const password = passwordField.value;

  // Simulate the authentication
  const user = users.find((user) => (
    user.username === username && 
      user.password === password
  ));

  if (user) {
    sessionStorage.setItem("authenticated", true);
    window.location.href = "../index.html";
  } else {
    // If the user is not allowed, show an alert
    // TODO: Show a message with sweet alert/toastify library instead of an alert
    const pAlert = loginForm.querySelector("p");

    // If there is no alert, create a new one
    if (!pAlert) {
      const newp = document.createElement("p");
      newp.innerText = "Invalid username or password";
      newp.style.color = "red";
      loginForm.appendChild(newp);
    }
  }
});

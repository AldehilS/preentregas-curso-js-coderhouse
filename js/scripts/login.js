import { User } from "../models/User.js";
import { labelTopFormAnimation } from "../animations/label-top-animation.js";

// Get the form element, the username and password fields
const loginForm = document.querySelector("form");
const usernameField = loginForm.querySelector("#username");
const passwordField = loginForm.querySelector("#password");
const submitButton = loginForm.querySelector("button");

labelTopFormAnimation(loginForm);

/**
 * Due to this course doesn't include databases,
 * or any backend service to validate the users
 * I used a hardcoded json of allowed default users to simulate
 * the authentication.
 * The users are stored in the local storage and there can also
 * be added new users with the sign in form.
 */

// Fetch the default users from the json file
const defaultUsers = fetch("../assets/json/default-users.json")
  .then((response) => response.json())
  .then((data) => {
    const users = data.map(
      (user) => new User(user.name, user.username, user.password)
    );
    return users;
  })
  .catch((error) => {
    console.error("Error fetching the default users", error);
    return [];
  });

// Try to get the users from the local storage
const localStoredUsers = localStorage.getItem("users");
// If there are no users, create an empty array, otherwise parse the string
let users = localStoredUsers ? JSON.parse(localStoredUsers) : [];

defaultUsers
  .then((defaultUsers) => {
    // Check if the default usernames are already in the local storage
    defaultUsers.forEach((defaultUser) => {
      const repeatedUsername = users.find(
        (localStoredUser) => localStoredUser.username === defaultUser.username
      );
      if (!repeatedUsername) {
        users.push(defaultUser);
      }
    });
    // Store the users in the local storage
    localStorage.setItem("users", JSON.stringify(users));
  })
  .catch((error) => {
    console.error("Error getting the default users", error);
  });

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
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    sessionStorage.setItem("authenticated", JSON.stringify({username: user.username, name: user.name }));
    window.location.href = "../index.html";
  } else {
    // If the user is not allowed, show an alert
    const pAlert = loginForm.querySelector("#p-alert");

    // If there is no alert, create a new one
    if (!pAlert) {
      const newp = document.createElement("p");
      newp.innerText = "Invalid username or password";
      newp.style.color = "red";
      newp.id = "p-alert";
      loginForm.insertBefore(newp, submitButton);
    }
  }
});

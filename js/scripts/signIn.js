import { User } from "../models/User.js";
import { labelTopFormAnimation } from "../animations/label-top-animation.js";

// Get the form element, the name, username and password fields
const signInForm = document.querySelector("form");
const nameField = signInForm.querySelector("#name");
const usernameField = signInForm.querySelector("#username");
const passwordField = signInForm.querySelector("#password");

labelTopFormAnimation(signInForm);

/**
 * Due to this course doesn't include databases,
 * or any backend service to register the users
 * I used the local storage to store the users
 * and simulate the sign in process
 */
signInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameField.value;
  const username = usernameField.value;
  const password = passwordField.value;

  // Try to get the users from the local storage
  const localStoredUsers = localStorage.getItem("users");
  // If there are no users, create an empty array, otherwise parse the string
  let users = localStoredUsers ? JSON.parse(localStoredUsers) : [];

  // Check if the username is already in use
  const repeatedUsername = users.find((user) => user.username === username);
  if (repeatedUsername) {
    const pAlert = signInForm.querySelector("p");
    // If there is no alert, create a new one
    if (!pAlert) {
      const newp = document.createElement("p");
      newp.innerText =
        "This username is already in use, please choose another one";
      newp.style.color = "red";
      newp.id = "alert";
      signInForm.appendChild(newp);
    }
  } else {
    // If the username is not in use, create a new user and store it
    const user = new User(name, username, password);
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "../index.html";
  }
});

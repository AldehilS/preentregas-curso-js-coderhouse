/**
 * Animate the label to the top of the input field when the input is focused or has a value.
 */
export function labelTopFormAnimation(form) {
  
  // Add event listeners to the input fields to move the label to the top
  form.querySelectorAll("div > div").forEach((inputField) => {
    const label = inputField.querySelector("label");
    const input = inputField.querySelector("input");
  
    // If the input has a value, move the label to the top
    if (input.value) {
      label.classList.add("label-top-position");
    }
  
    // If the input is focused, move the label to the top
    input.addEventListener("focus", () => {
      label.classList.add("label-top-position");
    });
  
    // If the input is blurred and there is no value, move the label to the initial position
    input.addEventListener("blur", () => {
      // If input type is date, the label remains on top
      if (!input.value && input.type !== "date") {
        label.classList.remove("label-top-position");
      }
    });
  });
}


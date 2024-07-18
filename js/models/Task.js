export class Task {
  constructor(assignedUser, title, description, dueDate, completed) {
    this.assignedUser = assignedUser;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = completed || false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

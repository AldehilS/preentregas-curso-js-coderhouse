export class Task {
  constructor(assignedUser, title, description, dueDate) {
    this.assignedUser = assignedUser;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
  }
}

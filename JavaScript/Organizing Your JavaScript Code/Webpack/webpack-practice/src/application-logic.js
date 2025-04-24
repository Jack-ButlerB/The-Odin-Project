// Application Logic
import "./styles.css";
import { renderHomeTodoList } from "./render.js";

renderHomeTodoList();
class CreateTodoItem {
  constructor(
    title,
    description,
    project,
    dueDate,
    priority,
    notes,
    checklist
  ) {
    this.title = title;
    this.description = description;
    this.project = project;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
  }
}

console.log(
  new CreateTodoItem(
    "title",
    "description",
    "project",
    "dueDate",
    "priority",
    "This is the notes block for this todo Item"
  )
);

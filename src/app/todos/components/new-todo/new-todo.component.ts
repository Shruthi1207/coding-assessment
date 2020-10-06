import { Component } from "@angular/core";
import { TodosService } from "@app/todos/services/todos.service";

@Component({
  selector: "app-new-todo",
  styleUrls: ["./new-todo.component.scss"],
  templateUrl: "./new-todo.component.html"
})
export class AddTodoComponent {
  todo = "";

  constructor(private todosService: TodosService) {}

  add() {
    if (!this.todo) {
      return;
    }
    this.todosService.addTodo(this.todo);
    this.todo = "";
  }
}

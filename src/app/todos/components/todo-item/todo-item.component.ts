import { Component, Input, ElementRef, ViewChild } from "@angular/core";
import { TodosService } from "@app/todos/services/todos.service";
import { ITodo } from "@app/todos/interfaces";

@Component({
  selector: "app-todo-item",
  styleUrls: ["./todo-item.component.scss"],
  templateUrl: "./todo-item.component.html"
})
export class TodoItemComponent {
  @Input() todo: ITodo;
  @Input() index: number;
  @ViewChild("editTodo") editTodo: ElementRef;
  edit = false;

  constructor(private todosService: TodosService) {}

  removeTodo(index: number) {
    this.todosService.removeTodo(index);
  }

  toggleComplete(index: number) {
    this.todosService.toggleComplete(index);
  }

  editForm() {
    this.edit = true;
    setTimeout(() => {
      this.editTodo.nativeElement.focus();
    }, 0);
  }

  update(event: any, index: number) {
    this.edit = false;
    const { value } = event.target;
    this.todosService.updateTodo(index, value);
  }
}

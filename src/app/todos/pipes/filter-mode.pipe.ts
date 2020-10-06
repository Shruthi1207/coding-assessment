import { Pipe, PipeTransform } from "@angular/core";
import { ITodo } from "@app/todos/interfaces";
import { FILTER_MODES } from "@app/todos/constants/filter-modes";

@Pipe({ name: "filterMode" })
export class FilterModePipe implements PipeTransform {
  transform(todos: ITodo[], mode: FILTER_MODES): ITodo[] {
    switch (mode) {
      case "Active":
        return todos.filter((todo: ITodo) => {
          return !todo.completed;
        });
      case "Completed":
        return todos.filter((todo: ITodo) => {
          return todo.completed;
        });
      default:
        return todos;
    }
  }
}

import { Component, ChangeDetectorRef } from "@angular/core";
import { TodosService } from "@app/todos/services/todos.service";
import { Subscription } from "rxjs";
import { FILTER_MODES } from "@app/todos/constants/filter-modes";
import { ITodo } from "@app/todos/interfaces";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-todos-list",
  styleUrls: ["./todo-list.component.scss"],
  templateUrl: "./todo-list.component.html"
})
export class TodosListComponent {
  subscription: Subscription;
  todos: ITodo[] = [];
  filterSubscription: Subscription;
  mode: FILTER_MODES;
  edit = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private todosService: TodosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setMode(this.router.url);
    this.subscription = this.todosService.allTodos$.subscribe(todos => {
      this.todos = todos;
    });
    this.filterSubscription = this.todosService.filterMode$.subscribe(mode => {
      this.mode = mode;
    });
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setMode(path: string) {
    switch (path) {
      case "/active":
        this.todosService.changeFilterMode("Active");
        break;
      case "/completed":
        this.todosService.changeFilterMode("Completed");
        break;
      default:
        this.todosService.changeFilterMode("All");
        break;
    }
  }

  showNoTodosMessage(mode: FILTER_MODES) {
    const modes = ["Active", "Completed"];
    let todos = [];
    if (modes.indexOf(mode) !== -1) {
      switch (mode) {
        case "Active":
          todos = this.todos.filter((todo: ITodo) => {
            return !todo.completed;
          });
          return todos.length === 0;
        case "Completed":
          todos = this.todos.filter((todo: ITodo) => {
            return todo.completed;
          });
          return todos.length === 0;
      }
    }
    return false;
  }
}

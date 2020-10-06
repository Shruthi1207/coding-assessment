import { Component } from "@angular/core";
import { TodosService } from "@app/todos/services/todos.service";
import { Subscription } from "rxjs";
import { FILTER_MODES } from "@app/todos/constants/filter-modes";
import { ITodo } from "@app/todos/interfaces";
import { Router } from "@angular/router";
import { ITodosState } from "@app/todos/state/todos.reducer";
import { Store } from "@ngrx/store";
import * as todoSelectors from "@app/todos/state/todo.selectors";

@Component({
  selector: "app-footer",
  styleUrls: ["./footer.component.scss"],
  templateUrl: "./footer.component.html"
})
export class TodosFooterComponent {
  modeSubscription: Subscription;
  mode: FILTER_MODES;
  todosCount: number;
  activeCount: number;

  constructor(
    private todosService: TodosService,
    private router: Router,
    private store: Store<ITodosState>
  ) {}

  ngOnInit(): void {
    this.modeSubscription = this.todosService.filterMode$.subscribe(mode => {
      this.mode = mode;
    });

    this.store.select(todoSelectors.allTodos).subscribe((todos: ITodo[]) => {
      const count = (todos || []).length;
      this.todosCount = count;
    });

    this.store.select(todoSelectors.activeTodos).subscribe((todos: ITodo[]) => {
      const count = (todos || []).length;
      this.activeCount = count;
    });
  }

  ngOnDestroy(): void {
    if (this.modeSubscription) {
      this.modeSubscription.unsubscribe();
    }
  }

  changeMode(mode: string) {
    this.router.navigate([`/${mode}`]);
  }

  clearCompleted() {
    this.todosService.clearCompleted();
  }
}

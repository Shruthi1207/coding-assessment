import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodosService } from '@app/todos/services/todos.service';
import { Subscription } from 'rxjs';
import { ITodo } from '@app/todos/interfaces';
import { StorageService } from '@app/todos/services/storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  subscription: Subscription;
  todos: ITodo[] = [];

  constructor(private todosService: TodosService,
    private storageService: StorageService) {
  }

  ngOnInit(): void {
    const todos = this.storageService.getItem('todos') || [];
    if (todos.length > 0) {
      this.todosService.initTodos(todos);
    }
    this.subscription = this.todosService.allTodos$.subscribe(todos => {
      this.todos = todos;
      this.storageService.setItem('todos', this.todos);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

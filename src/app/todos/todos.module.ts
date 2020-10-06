import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CompleteAllComponent } from './components/complete-all/complete-all.component';
import { TodosListComponent } from './components/todo-list/todo-list.component';
import { TodosService } from './services/todos.service';
import { todosReducer } from './state/todos.reducer';
import { FilterModePipe } from '@app/todos/pipes/filter-mode.pipe';
import { TodoItemComponent } from '@app/todos/components/todo-item/todo-item.component';
import { TodosFooterComponent } from '@app/todos/components/footer/footer.component';
import { AddTodoComponent } from '@app/todos/components/new-todo/new-todo.component';

const DECLARATIONS = [
  CompleteAllComponent,
  TodosListComponent,
  FilterModePipe,
  TodoItemComponent,
  TodosFooterComponent,
  AddTodoComponent
];

@NgModule({
  declarations: [
    ...DECLARATIONS,
  ],
  exports: [
    ...DECLARATIONS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('todos', todosReducer),
  ],
  providers: [
    TodosService,
  ],
})
export class TodosModule { }

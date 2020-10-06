import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as todosState from './todos.reducer';
import { ITodo } from '@app/todos/interfaces';

export const todosSelector = createFeatureSelector<todosState.ITodosState>('todos');

export const allTodos = createSelector(
  todosSelector,
  todosState.todos,
);


export const activeTodos = createSelector(
  allTodos,
  (todos: ITodo[]) => {
    return todos.filter((todo: ITodo) => !todo.completed)
  },
);

export const filterModeSelector = createFeatureSelector<todosState.ITodosState>('filterMode');

export const filterMode = createSelector(
  todosSelector,
  todosState.filterMode,
);


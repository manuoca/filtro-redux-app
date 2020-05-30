import { Component, OnInit } from '@angular/core';
import * as fromFiltrosValidos from '../../filter/filter.actions';
import * as fromTodo from '../todo.actions';

import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;

  filtrosValidos: fromFiltrosValidos.filtrosValidos[] = ['todos', 'pendientes', 'completados'];
  filtroActual: fromFiltrosValidos.filtrosValidos;

  constructor( private store: Store<AppState>) {}

  ngOnInit() {
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.contarPendientes( state.todos );
    });
  }

  cambiarFiltro( nuevoFiltro: fromFiltrosValidos.filtrosValidos ) {
    const accion = new fromFiltrosValidos.SetFiltroAction( nuevoFiltro );
    this.store.dispatch( accion );
  }

  contarPendientes( todos: Todo[]) {
    this.pendientes = todos.filter( todo => !todo.completado ).length;
  }

  borrarCompletadosTodo() {
    const accion = new fromTodo.BorrarAllTodoAction();
    this.store.dispatch( accion );
  }
}

import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as fromTodo from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico', {static: false}) txtInputFisico: ElementRef;

  chkField: FormControl;
  txtInput: FormControl;

  editando: boolean;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.chkField = new FormControl( this.todo.completado);
    this.txtInput = new FormControl( this.todo.texto, Validators.required);
    console.log(this.todo);

    this.chkField.valueChanges.subscribe( () => {
      const accion = new fromTodo.ToggleTodoAction( this.todo.id);
      this.store.dispatch( accion );
    });
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    });
  }

  terminarEdicion() {
    const accion = new fromTodo.EditarTodoAction( this.todo.id , this.txtInput.value );
    this.editando = false;

    if (this.txtInput.invalid || (this.txtInput.value === this.todo.texto) ) {
      return;
    }
    this.store.dispatch( accion );
  }

  borrarTodo() {
    const accion = new fromTodo.BorrarTodoAction( this.todo.id );
    this.store.dispatch( accion );
  }
}

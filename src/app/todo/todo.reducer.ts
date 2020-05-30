import * as fromTodo from './todo.actions';
import { Todo } from './models/todo.model';

const todo1 = new Todo('Ir a comprar');
const todo2 = new Todo('Hacer la cena');
const todo3 = new Todo('Fregar los platos');

todo2.completado = true;

const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer(state = estadoInicial,
                            action: fromTodo.Acciones): Todo[] {

    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo( action.texto );
            console.log('todo', todo);
            return [ ...state, todo ];

        case fromTodo.TOGGLE_TODO:
            return state.map( todoEdit => {

                if (todoEdit.id === action.id ) {
                    // todoEdit.completado = true; ESTO NO SE PUEDE, DEBE CREARSE UN ARRAY NUEVO (REFERENCIA NUEVA)
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });

        case fromTodo.TOGGLE_ALL_TODO:
            return state.map( todoEdit => {
                                return {
                    ...todoEdit,
                    completado: action.completado
                }
            });

        case fromTodo.EDITAR_TODO:
            return state.map( todoEdit => {
                if (todoEdit.id === action.id ) {
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }
            });

        case fromTodo.BORRAR_TODO:
            return state.filter( todoEdit => todoEdit.id !== action.id );

        case fromTodo.BORRAR_ALL_TODO:
            return state.filter( todoEdit => !todoEdit.completado );

        default:
            return state;
    }

}

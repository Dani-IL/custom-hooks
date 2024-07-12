import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer";

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}
export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const handleNewTodo = (todo) => {
        const action = {
            type: 'Add TODO',
            payload: todo
        }
        dispatch(action);
    }
    const handleDeleteTodo = (id) => {
        dispatch({
            type: 'Delete TODO',
            payload: id
        });
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: 'Toggle TODO',
            payload: id
        });
    };

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => todo.done === false).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}

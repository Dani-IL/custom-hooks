export const todoReducer = (initialState, action) => {
switch (action.type) {
    case 'Add TODO':
        return [...initialState, action.payload];

    case 'Delete TODO':
        return initialState.filter(todo => todo.id !== action.payload);

    case 'Toggle TODO':
        return initialState.map(todo => {
            if (todo.id === action.payload) {
                return {
                    ...todo,
                    done: !todo.done
                }}
            return todo;
        });

    default:
        return initialState;
}

}
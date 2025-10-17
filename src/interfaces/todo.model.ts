export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
}

export interface TodoStore {
    // Estado
    todos: Todo[];
    filter: string;

    // Acciones
    addTodo: (text: string) => void;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, newText: string) => void;
    setFilter: (filter: string) => void;
    clearCompleted: () => void;
    getFilteredTodos: () => Todo[];
}

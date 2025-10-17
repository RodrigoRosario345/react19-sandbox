import type { Todo, TodoStore } from "@/interfaces/todo.model";
import { create } from "zustand";


export const useTodoStore = create<TodoStore>((set, get) => ({
    // Estado inicial
    todos: [],
    filter: 'all',

    // Acciones
    addTodo: (text: string) =>
        set((state: TodoStore) => ({
            todos: [
                ...state.todos,
                {
                    id: Date.now(),
                    text,
                    completed: false,
                    createdAt: new Date().toISOString(),
                },
            ],
        })),

    toggleTodo: (id: number) =>
        set((state: TodoStore) => ({
            todos: state.todos.map((todo: Todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
        })),

    deleteTodo: (id: number) =>
        set((state: TodoStore) => ({
            todos: state.todos.filter((todo: Todo) => todo.id !== id),
        })),

    updateTodo: (id: number, newText: string) =>
        set((state: TodoStore) => ({
            todos: state.todos.map((todo: Todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            ),
        })),

    setFilter: (filter: string) => set({ filter }),

    clearCompleted: () =>
        set((state: TodoStore) => ({
            todos: state.todos.filter((todo: Todo) => !todo.completed),
        })),

    getFilteredTodos: () => {
        const { todos, filter } = get();

        switch (filter) {
            case "active":
                return todos.filter((todo: Todo) => !todo.completed);
            case "completed":
                return todos.filter((todo: Todo) => todo.completed);
            default:
                return todos;
        }
    },
}));

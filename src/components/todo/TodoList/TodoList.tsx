import { useTodoStore } from "@/store/todo.store";
import { TodoItem } from "../TodoItem/TodoItem";

export function TodoList() {
    const todos = useTodoStore((state) => state.todos);
    const filter = useTodoStore((state) => state.filter);

    // Filtrar en el componente
    const filteredTodos = (() => {
        switch (filter) {
            case "active":
                return todos.filter((todo) => !todo.completed);
            case "completed":
                return todos.filter((todo) => todo.completed);
            default:
                return todos;
        }
    })();
    return (
        <div className="mt-4 border-t-2 border-gray-600 pt-4">
            {filteredTodos.length === 0 ? (
                <p className="text-center text-gray-400">No tasks available</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {filteredTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            )}
        </div>
    );
}

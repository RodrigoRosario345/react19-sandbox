import { FiltersTodo } from "../FiltersTodo/FiltersTodo";
import { FormTodo } from "../FormTodo/FormTodo";
import { TodoList } from "../TodoList/TodoList";

export function TodoContainer() {
    return (
        <div className="w-[600px] mx-auto font-sans bg-gray-800 p-4 rounded-lg text-white shadow-lg shadow-black/50 border border-gray-600">
            <div className="flex gap-4">
                <FormTodo mode="create" />
                <FiltersTodo />
            </div>
            <TodoList />
        </div>
    );
}

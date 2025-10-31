import { FiltersTask } from "../FiltersTask/FiltersTask";
import { FormTask } from "../FormTask/FormTask";
import { TaskList } from "../TaskList/TaskList";

export function TaskContainer() {
    return (
        <div className="w-[600px] mx-auto font-sans bg-gray-800 p-4 rounded-lg text-white shadow-lg shadow-black/50 border border-gray-600">
            <div className="flex gap-4">
                <FormTask mode="create" />
                <FiltersTask />
            </div>
            <TaskList />
        </div>
    );
}

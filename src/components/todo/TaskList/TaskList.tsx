import { useTaskStore } from "@/store/task.store";
import { TaskItem } from "../TaskItem/TaskItem";
import type { Task } from "@/interfaces/task.model";

export function TaskList() {
    const filter = useTaskStore((state) => state.filter);
    const tasks = useTaskStore((state) => state.tasks);
    const filteredTasks = (() => {
        switch (filter) {
            case "active":
                return tasks.filter((task: Task) => !task.completed);
            case "completed":
                return tasks.filter((task: Task) => task.completed);
            default:
                return tasks;
        }
    })();

    return (
        <div className="mt-4 border-t-2 border-gray-600 pt-4">
            {filteredTasks.length === 0 ? (
                <p className="text-center text-gray-400">No tasks available</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </ul>
            )}
        </div>
    );
}

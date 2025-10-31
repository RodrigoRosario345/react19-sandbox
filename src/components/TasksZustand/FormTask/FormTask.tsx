import { Button, Label, TextInput } from "flowbite-react";
import { MdTask } from "react-icons/md";
import { useTaskStore } from "@/store/task.store";
import { useState } from "react";
import type { Task } from "@/interfaces/task.model";

type FormMode = "create" | "edit";

interface FormTaskProps {
    mode: FormMode;
    task?: Task;
    onSuccess?: () => void;
}

export function FormTask({ mode, task, onSuccess }: FormTaskProps) {
    const addTask = useTaskStore((state) => state.addTask);
    const updateTask = useTaskStore((state) => state.updateTask);
    const [title, setTitle] = useState(task?.title ?? "");

    // Determinar si estamos editando
    const isEditing = mode === "edit";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedTitle = title.trim();
        if (!trimmedTitle) return;

        if (isEditing && task) {
            updateTask(task.id, trimmedTitle);
        } else {
            addTask(trimmedTitle);
            setTitle("");
        }

        // Llamar callback si existe (ej: cerrar modo edición)
        onSuccess?.();
    };

    const handleCancel = () => {
        if (isEditing) {
            // Restaurar texto original
            setTitle(task?.title ?? "");
        }
        onSuccess?.();
    };

    return (
        <form className={`flex-4 flex items-end gap-2 `} onSubmit={handleSubmit}>
            <div className="flex-4 flex flex-col gap-2">
                {!isEditing && <Label htmlFor="task">Add a new task</Label>}

                <TextInput
                    className="w-full"
                    id="task"
                    type="text"
                    icon={MdTask}
                    placeholder={isEditing ? "Edit task..." : "New task..."}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus={isEditing} 
                    required
                />
            </div>

            <div className="flex-1 flex gap-2">
                <Button className="flex-1 cursor-pointer" type="submit" color="blue">
                    {isEditing ? "Save" : "Add"}
                </Button>

                {isEditing && (
                    <Button
                        className="cursor-pointer"
                        type="button"
                        color="red"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
}

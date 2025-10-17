import { Button, Label, TextInput } from "flowbite-react";
import { MdTask } from "react-icons/md";
import { useTodoStore } from "@/store/todo.store";
import { useState } from "react";
import type { Todo } from "@/interfaces/todo.model";

type FormMode = "create" | "edit";

interface FormTodoProps {
    mode: FormMode;
    todo?: Todo;
    onSuccess?: () => void;
}

export function FormTodo({ mode, todo, onSuccess }: FormTodoProps) {
    const addTodo = useTodoStore((state) => state.addTodo);
    const updateTodo = useTodoStore((state) => state.updateTodo);
    const [text, setText] = useState(todo?.text ?? "");

    // Determinar si estamos editando
    const isEditing = mode === "edit";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedText = text.trim();
        if (!trimmedText) return;

        if (isEditing && todo) {
            updateTodo(todo.id, trimmedText);
        } else {
            addTodo(trimmedText);
            setText("");
        }

        // Llamar callback si existe (ej: cerrar modo edición)
        onSuccess?.();
    };

    const handleCancel = () => {
        if (isEditing) {
            // Restaurar texto original
            setText(todo?.text ?? "");
        }
        onSuccess?.();
    };

    return (
        <form className={`flex-1 flex items-end gap-2 `} onSubmit={handleSubmit}>
            <div className="flex-4 flex flex-col gap-2">
                {!isEditing && <Label htmlFor="task">Add a new task</Label>}

                <TextInput
                    className="w-full"
                    id="task"
                    type="text"
                    icon={MdTask}
                    placeholder={isEditing ? "Edit task..." : "New task..."}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
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

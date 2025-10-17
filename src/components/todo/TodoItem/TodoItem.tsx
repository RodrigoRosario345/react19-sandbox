import type { Todo } from "@/interfaces/todo.model";
import { useTodoStore } from "@/store/todo.store";
import { Button, Checkbox, Label } from "flowbite-react";
import { useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FormTodo } from "../FormTodo/FormTodo";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => toggleTodo(todo.id);
  const handleDelete = () => deleteTodo(todo.id);
  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleEditSuccess = () => setIsEditing(false);

  return (
    <div className="flex justify-between items-center gap-2 p-2 bg-gray-700 rounded border border-gray-600">
      {isEditing ? (
        <FormTodo mode="edit" todo={todo} onSuccess={handleEditSuccess} />
      ) : (
        <>
          <Checkbox
            className="p-3 bg-gray-800 cursor-pointer"
            id={`checkbox-${todo.id}`}
            checked={todo.completed}
            onChange={handleToggle}
          />

          <Label
            htmlFor={`checkbox-${todo.id}`}
            className={`flex-1 p-2 cursor-pointer transition-all ${todo.completed ? "line-through text-gray-400" : ""
              }`}
          >
            {todo.text}
          </Label>

          <div className="flex gap-2">
            <Button
              className="cursor-pointer"
              size="sm"
              color="green"
              onClick={handleEditToggle}
              title="Edit todo"
            >
              <MdModeEdit className="h-5 w-5" />
            </Button>

            <Button
              className="cursor-pointer"
              size="sm"
              color="red"
              onClick={handleDelete}
              title="Delete todo"
            >
              <MdDelete className="h-5 w-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

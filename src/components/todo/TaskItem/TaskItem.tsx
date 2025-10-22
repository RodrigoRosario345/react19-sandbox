import type { Task } from "@/interfaces/task.model";
import { useTaskStore } from "@/store/task.store";
import { Button, Checkbox, Label } from "flowbite-react";
import { useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FormTask } from "../FormTask/FormTask";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => toggleTask(task.id);
  const handleDelete = () => deleteTask(task.id);
  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleEditSuccess = () => setIsEditing(false);

  return (
    <div className="flex justify-between items-center gap-2 p-2 bg-gray-700 rounded border border-gray-600">
      {isEditing ? (
        <FormTask mode="edit" task={task} onSuccess={handleEditSuccess} />
      ) : (
        <>
          <Checkbox
            className="p-3 bg-gray-800 cursor-pointer"
            id={`checkbox-${task.id}`}
            checked={task.completed}
            onChange={handleToggle}
          />

          <Label
            htmlFor={`checkbox-${task.id}`}
            className={`flex-1 p-2 cursor-pointer transition-all ${task.completed ? "line-through text-gray-400" : ""
              }`}
          >
            {task.title}
          </Label>

          <div className="flex gap-2">
            <Button
              className="cursor-pointer"
              size="sm"
              color="green"
              onClick={handleEditToggle}
              title="Edit task"
            >
              <MdModeEdit className="h-5 w-5" />
            </Button>

            <Button
              className="cursor-pointer"
              size="sm"
              color="red"
              onClick={handleDelete}
              title="Delete task"
            >
              <MdDelete className="h-5 w-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

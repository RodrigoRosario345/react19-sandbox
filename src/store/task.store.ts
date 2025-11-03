import type { Task, TaskStore } from "@/interfaces/task.model";
import { create } from "zustand";

export const useTaskStore = create<TaskStore>((set) => ({
    // Estado inicial
    tasks: [],
    filter: 'all',

    // Acciones
    addTask: (title: string) =>
        set((state: TaskStore) => ({
            tasks: [
                ...state.tasks,
                {
                    id: Date.now(),
                    title,
                    completed: false,
                    createdAt: new Date().toISOString(),
                },
            ],
        })),

    toggleTask: (id: number) =>
        set((state: TaskStore) => ({
            tasks: state.tasks.map((task: Task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ),
        })),

    deleteTask: (id: number) =>
        set((state: TaskStore) => ({
            tasks: state.tasks.filter((task: Task) => task.id !== id),
        })),

    updateTask: (id: number, newTitle: string) =>
        set((state: TaskStore) => ({
            tasks: state.tasks.map((task: Task) =>
                task.id === id ? { ...task, title: newTitle } : task
            ),
        })), 

    setFilter: (filter: string) => set({ filter }),

    clearCompleted: () =>
        set((state: TaskStore) => ({
            tasks: state.tasks.filter((task: Task) => !task.completed),
        })),
}));

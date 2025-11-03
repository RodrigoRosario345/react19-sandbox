export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface TaskStore {
  // Estado
  tasks: Task[];
  filter: string;

  // Acciones
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newTitle: string) => void;
  setFilter: (filter: string) => void;
  clearCompleted: () => void;
}

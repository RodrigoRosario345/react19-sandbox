import { Title } from "@/components";
import { TaskContainer } from "@/components/todo";

export function TaskPage() {
    return (
        <>
            <Title>
                <span className="text-white">LISTA DE TAREAS</span>
            </Title>
            <TaskContainer />
        </>
    );
}

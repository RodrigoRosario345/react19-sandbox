import { Title } from "@/components";
import { TodoContainer } from "@/components/todo";

export function TodoPage() {
    return (
        <>
            <Title>
                <span className="text-white">LISTA DE TAREAS</span>
            </Title>
            <TodoContainer />
        </>
    );
}

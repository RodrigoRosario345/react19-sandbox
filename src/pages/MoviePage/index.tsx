import { Title } from "@/components";
import { Outlet } from "react-router-dom";

export function MoviePage() {

    return (
        <>
            <Title>
                <span className="text-white">PELICULAS</span>
            </Title>
            <Outlet />
        </>
    )
}
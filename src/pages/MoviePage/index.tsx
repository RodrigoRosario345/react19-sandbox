import { Title } from "@/components";
import { MovieContainer } from "@/components/movies_supabase";

export function MoviePage() {

    return (
        <>
            <Title>
                <span className="text-white">PELICULAS</span>
            </Title>
            <MovieContainer />
        </>
    )
}
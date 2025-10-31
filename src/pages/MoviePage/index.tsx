import { Title } from "@/components";
import { MovieContainer } from "@/components/MoviesSupabase";

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
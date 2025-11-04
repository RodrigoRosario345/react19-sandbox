import FuzzyText from "@/components/fuzzyText";
import { InfiniteScroll } from "@/components/InfiniteScroll";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { carruselInfiniteAnimation } from "@/utils/gsap";
import { useEffect } from "react";
import { MovieItem } from "../MovieItem/MovieItem";
import type { ErrorType, Movie } from "@/interfaces/movie.model";
import { useMovieStore } from "@/store/movie.store";

export function MovieList() {
    const movies: Movie[] = useMovieStore((state) => state.movies);
    const loading: boolean = useMovieStore((state) => state.loading);
    const error: ErrorType = useMovieStore((state) => state.error);
    const fetchMovies = useMovieStore((state) => state.fetchMovies);

    useEffect(() => {
        fetchMovies();
    }, []);


    if (loading) return <LoadingSpinner />;
    if (error) return <FuzzyText>{error.message}</FuzzyText>;

    return (
        <>
            {
                movies.length === 0 ? (
                    <p className="mt-10 text-center text-2xl text-white">No hay películas disponibles.</p>
                ) : (
                    <InfiniteScroll<Movie>
                        // Datos
                        items={movies}
                        renderItem={(item, index) => (
                            <MovieItem movie={item} key={index} />
                        )}
                        // Animación
                        spacing={0.2}
                        animateFunc={carruselInfiniteAnimation}
                    >
                    </InfiniteScroll>

                )
            }
        </>
    );
}

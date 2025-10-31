import FuzzyText from "@/components/fuzzyText";
import { InfiniteScroll } from "@/components/InfiniteScroll";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { supabase } from "@/lib/supabase";
import { carruselInfiniteAnimation } from "@/utils/gsap";
import type { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { MovieItem } from "../MovieItem/MovieItem";
import type { Movie } from "@/interfaces/movie.model";

type ErrorType = PostgrestError | null;

export function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<ErrorType>(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        const { data, error } = await supabase.from("movies").select("*");

        if (error) {
            setError(error);
        }
        console.log("Movies fetched:", data);
        setMovies(data ?? []);
        setLoading(false);
    };

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
                    />
                )
            }
        </>
    );
}

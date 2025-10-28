import FuzzyText from "@/components/fuzzyText";
import { LoadingSpinner } from "@/components/loadingSpinner";
import type { Tables } from "@/interfaces/database.model";
import { supabase } from "@/lib/supabase";
import type { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type ErrorType = PostgrestError | null;
type Movie = Tables<"movies">;

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

        setMovies(data ?? []);
        setLoading(false);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <FuzzyText>{error.message}</FuzzyText>;

    return (
        <>
            {movies.length === 0
                ? (<p className="text-center text-gray-400">No movies available</p>)
                : (<>
                    {
                        movies.map((movie: Movie) => (
                            <ul key={movie.id}>
                                <li>{movie.title}</li>
                                <li>{movie.description}</li>
                            </ul>
                        ))
                    }
                </>)
            }
        </>

    );
}

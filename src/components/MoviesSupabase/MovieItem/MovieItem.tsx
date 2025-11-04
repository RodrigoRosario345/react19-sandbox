import type { Movie } from "@/interfaces/movie.model";
import { useMovieStore } from "@/store/movie.store";


interface MovieItemProps {
    movie: Movie;
}

export function MovieItem({ movie }: MovieItemProps) {
    const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie);

    const toggleDetail = () => {
        setSelectedMovie(movie);
    };

    return (
        <>
            <div
                className="size-full rounded-2xl 
                            shadow-[5px_5px_3px_rgba(0,0,0,0.5),-5px_-5px_3px_rgba(255,255,255,0.5)] 
                            hover:scale-105 transition-all cursor-pointer"
                onClick={toggleDetail}
            >
                <img
                    className="size-full rounded-2xl object-cover"
                    src={movie.poster_url!}
                    alt={movie.title}
                />
            </div>
        </>
    );
}

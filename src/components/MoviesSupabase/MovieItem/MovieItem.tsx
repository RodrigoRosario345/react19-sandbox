import type { Movie } from "@/interfaces/movie.model";

interface MovieItemProps {
    movie: Movie;
}

export function MovieItem({ movie }: MovieItemProps) {

    return (
        <div className="size-full rounded-2xl shadow-[5px_5px_3px_rgba(0,0,0,0.5),-5px_-5px_3px_rgba(255,255,255,0.5)] hover:scale-105 transition-all cursor-pointer">
            {/* <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <p>{movie.release_year}</p>
            <p>{movie.duration_minutes}</p>
            <p>{movie.rating}</p>
            <p>{movie.genre}</p>
            <p>{movie.director}</p>
            <a href={movie.trailer_url!}>Watch Trailer</a> */}
            <img className="size-full rounded-2xl object-cover" src={movie.poster_url!} alt={movie.title} />
        </div>
    )
}

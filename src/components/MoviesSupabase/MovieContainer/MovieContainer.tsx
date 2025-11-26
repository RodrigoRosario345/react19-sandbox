import { Link } from "react-router-dom";
import { MovieList } from "../MovieList/MovieList";
import { useMovieStore } from "@/store/movie.store";
import { Modal } from "@/components/ui";

export function MovieContainer() {
    const operationResult = useMovieStore((state) => state.operationResult);

    return (
        <div className="flex flex-col">
            <Link className="ml-auto font-sans bg-orange-500 text-white px-4 py-2 rounded transition-colors hover:bg-orange-400" to="create">New Movie</Link>
            <MovieList />
            {operationResult && (<Modal {...operationResult} />)}
        </div>
    );
}

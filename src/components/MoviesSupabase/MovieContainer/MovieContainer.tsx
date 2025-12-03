import { Link } from "react-router-dom";
import { MovieList } from "../MovieList/MovieList";

export function MovieContainer() {
    console.log("se renderiza movie container");
    return (
        <div className="flex flex-col">
            <Link className="ml-auto font-sans bg-orange-500 text-white px-4 py-2 rounded transition-colors hover:bg-orange-400" to="create">New Movie</Link>
            <MovieList />
        </div>
    );
}

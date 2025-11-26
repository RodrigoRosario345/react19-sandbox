// MovieItemDetail.tsx
import { Button } from "@/components/ui";
import { useModal } from "@/hooks";
import { useMovieStore } from "@/store/movie.store";
import { IoClose, IoStar } from "react-icons/io5";
import { PiLineVertical } from "react-icons/pi";

function getHoursMinutes(totalMinutes: number | null): string {
    if (totalMinutes === null) return "";

    const MINUTES_PER_HOUR = 60;
    const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
    const remainingMinutes = totalMinutes % MINUTES_PER_HOUR;

    return [
        hours ? `${hours}h` : "",
        remainingMinutes ? `${remainingMinutes}m` : "",
    ].join(" ").trim();
}

export function MovieItemDetail() {
    const movie = useMovieStore((state) => state.selectedMovie);
    const clearSelectedMovie = useMovieStore((state) => state.clearSelectedMovie);
    const { backdropRef, modalRef, closeModal } = useModal({ shouldAnimate: !!movie, onClose: clearSelectedMovie });

    if (!movie) return null;

    return (
        <>
            {/* Backdrop/Overlay para cerrar al hacer clic fuera */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 scale-100 opacity-100"
                onClick={closeModal}
                ref={backdropRef}
            />

            {/* Modal */}
            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100
                           bg-gray-100 rounded-2xl shadow-2xl z-50
                           w-[90vw] max-w-[800px] h-auto max-h-[90vh] 
                           overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Evita que cierre al hacer clic dentro
                ref={modalRef}
            >
                {/* Botón cerrar */}
                <Button
                    parentMethod={closeModal}
                    className="absolute top-4 right-4 z-20 text-white hover:text-white/70"
                    aria-label="close"
                >
                    <IoClose className="size-10" />
                </Button>

                {movie.background_url && (
                    <div
                        className="absolute inset-0 mb-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${movie.background_url})` }}
                    >
                        <div className="absolute inset-0 bg-black/70" />
                    </div>
                )}

                {/* Contenido */}
                <div className="relative font-sans px-10 py-16 flex gap-6">
                    <div className="flex-1 rounded-lg overflow-hidden ">
                        {movie.poster_url && (
                            <img
                                src={movie.poster_url}
                                alt={movie.title}
                                className="size-full object-cover rounded-lg"
                            />
                        )}
                    </div>
                    <div className="flex-2 space-y-2 text-white">
                        <h3 className="text-2xl font-semibold">{movie.title}</h3>
                        <p className="text-gray-400 text-lg">{movie.release_year}</p>
                        <p className="text-sm text-gray-300 flex items-center">
                            <span className="">
                                {getHoursMinutes(movie.duration_minutes)}
                            </span>
                            <PiLineVertical />
                            <span className="font-semibold">{movie.genre}</span>
                        </p>
                        <div className="flex gap-2 items-center text-xl">
                            <IoStar color="yellow" />
                            <p>
                                <span>{movie.rating}</span>
                                <span className="diagonal-fractions text-gray-400">/10</span>
                            </p>
                        </div>
                        <p className="text-gray-200">{movie.description}</p>

                        <div className="flex gap-4">
                            <span className="text-gray-400">Directed by</span>
                            <span className="text-gray-100">{movie.director}</span>
                        </div>

                        <div className="flex gap-4 text-white">
                            {movie.trailer_url && (
                                <a
                                    href={movie.trailer_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    Ver Tráiler
                                </a>
                            )}
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                            >
                                Ver Ahora
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

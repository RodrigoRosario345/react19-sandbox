// MovieItemDetail.tsx
import { Button } from "@/components/ui";
import { useMovieStore } from "@/store/movie.store";
import type { GSAPTimeline } from "@/types/infiniteScroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

gsap.registerPlugin(useGSAP);

function animateElements(elements: HTMLDivElement[]): GSAPTimeline {
    const timeline = gsap.timeline();

    elements.forEach((element: HTMLDivElement, index) => {
        timeline.from(
            element,
            {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: "back.out(1.7)",
            },
            index * 0.05
        );
    });

    return timeline;
}
export function MovieItemDetail() {
    const movie = useMovieStore((state) => state.selectedMovie);
    const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const backdropRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<GSAPTimeline | null>(null);

    const toggleDetail = useCallback(() => {
        const timeline = timelineRef.current;

        if (!timeline) {
            // Si no hay timeline, cierra directamente
            setSelectedMovie(null);
            return;
        }

        // Si la animación está activa, no hacer nada
        if (timeline.isActive()) return;

        timeline.reverse();

        // Espera a que termine la animación antes de cerrar
        timeline.eventCallback("onReverseComplete", () => {
            setSelectedMovie(null);
            // Limpiar el callback para evitar memoria leak
            timeline.eventCallback("onReverseComplete", null);
        });
    }, [setSelectedMovie]);

    useGSAP(
        () => {
            // Solo se anima si hay movie y modalRef
            if (!movie || !modalRef.current || !backdropRef.current) return;

            const elements: HTMLDivElement[] = [
                backdropRef.current,
                modalRef.current,
            ];

            // Crea un timeline para que inicie automáticamente
            timelineRef.current = animateElements(elements);
        },
        { dependencies: [movie], scope: modalRef }
    );

    useEffect(() => {
        if (!movie) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') toggleDetail();
        };

        window.addEventListener('keydown', handleEscape);
        return () => {
            console.log('Removing escape listener');
            window.removeEventListener('keydown', handleEscape)
        };
    }, [movie, toggleDetail]);

    if (!movie) return null;

    return (
        <>
            {/* Backdrop/Overlay para cerrar al hacer clic fuera */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 scale-100 opacity-100"
                onClick={toggleDetail}
                ref={backdropRef}
            />

            {/* Modal */}
            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100
                           bg-gray-100 rounded-2xl shadow-2xl z-50
                           w-[90vw] max-w-[800px] h-auto max-h-[90vh] 
                           overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()} // Evita que cierre al hacer clic dentro
                ref={modalRef}
            >
                {/* Botón cerrar */}
                <Button
                    parentMethod={toggleDetail}
                    className="absolute top-4 right-4 z-10"
                    aria-label="close"
                >
                    <IoClose className="size-10" />
                </Button>

                {/* Contenido */}
                <div className="space-y-4 font-sans">
                    <h3 className="text-2xl font-bold pr-8">{movie.title}</h3>

                    {movie.poster_url && (
                        <img
                            src={movie.poster_url}
                            alt={movie.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    )}

                    <p className="text-gray-700">{movie.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-semibold">Año:</span> {movie.release_year}
                        </div>
                        <div>
                            <span className="font-semibold">Duración:</span>{" "}
                            {movie.duration_minutes} min
                        </div>
                        <div>
                            <span className="font-semibold">Rating:</span> {movie.rating}
                        </div>
                        <div>
                            <span className="font-semibold">Género:</span> {movie.genre}
                        </div>
                    </div>

                    <div>
                        <span className="font-semibold">Director:</span> {movie.director}
                    </div>

                    {movie.trailer_url && (
                        <a
                            href={movie.trailer_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Ver Tráiler
                        </a>
                    )}
                </div>
            </div>
        </>
    );
}

import type { MovieStore } from "@/interfaces/movie.model";
import { supabase } from "@/lib/supabase";
import { create } from "zustand";

export const useMovieStore = create<MovieStore>((set) => ({
    selectedMovie: null,
    movies: [],
    loading: false,
    error: null,
    operationResult: null,
    fetchMovies: async () => {
        set({ loading: true, error: null });
        const { data, error } = await supabase.from("movies").select("*");

        if (error) {
            set({ error, loading: false });
            return;
        }

        set({ movies: data ?? [], loading: false });
    },
    setSelectedMovie: (movie) => set({ selectedMovie: movie }),
    addMovie: async (movie) => {
        set({ loading: true, operationResult: null });

        const { data, error } = await supabase
            .from("movies")
            .insert(movie)
            .select()
            .single();

        if (error) {
            set({
                loading: false,
                operationResult: {
                    type: "add",
                    status: "error",
                    message: error.message || "Something went wrong please try again!!",
                },
            });
            return;
        }

        set((state) => ({
            loading: false,
            movies: [...state.movies, data],
            operationResult: {
                type: "add",
                status: "success",
                message: "The movie has been created successfully",
            },
        }));
    },
    clearOperationResult: () => set({ operationResult: null })
}));

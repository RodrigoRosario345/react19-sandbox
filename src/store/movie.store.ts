import type { MovieStore } from "@/interfaces/movie.model";
import { supabase } from "@/lib/supabase";
import { create } from "zustand";

export const useMovieStore = create<MovieStore>((set) => ({
    selectedMovie: null,
    movies: [],
    loading: false,
    error: null,
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
}));


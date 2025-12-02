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
        console.log("data received:", data);
        set({ movies: data ?? [], loading: false });
    },
    setSelectedMovie: (movie) => set({ selectedMovie: movie }),
    clearSelectedMovie: () => set({ selectedMovie: null }),
    addMovie: async (movie) => {
        set({ loading: true, operationResult: null });

        const { error } = await supabase
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

        set(() => ({
            loading: false,
            operationResult: {
                type: "add",
                status: "success",
                message: "The movie has been created successfully",
            },
        }));
    },
    updateMovie: async (movie) => {

        const { data, error } = await supabase
            .from("movies")
            .update(movie)
            .eq("id", movie.id!)
            .select()
            .single();

        if (error) {
            set({
                operationResult: {
                    type: "edit",
                    status: "error",
                    message: error.message || "Something went wrong please try again!!",
                },
            });
            return;
        }

        set(() => ({
            selectedMovie: data,
            operationResult: {
                type: "edit",
                status: "success",
                message: "The movie has been updated successfully",
            },
        }));
    },
    deleteMovie: async (id) => {
        const { error } = await supabase.from("movies").delete().eq("id", id);
        if (error) {
            set({
                operationResult: {
                    type: "delete",
                    status: "error",
                    message: error.message || "Something went wrong please try again!!",
                },
            });
            return;
        }
        set(() => ({
            operationResult: {
                type: "delete",
                status: "success",
                message: "The movie has been deleted successfully",
            },
        }));
    },
    clearOperationResult: () => set({ operationResult: null })
}));

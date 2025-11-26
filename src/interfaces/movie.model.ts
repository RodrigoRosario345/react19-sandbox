import type { PostgrestError } from "@supabase/supabase-js";
import type { Tables, TablesInsert, TablesUpdate } from "./database.model";
import z from "zod";

export type Movie = Tables<"movies">;

export type MovieInsert = TablesInsert<"movies">;

export type MovieUpdate = TablesUpdate<"movies">;

export type ErrorType = PostgrestError | null;

export const schemaMovieInsert = z.object({
  background_url: z
    .string()
    .url("Background URL must be a valid URL")
    .nullable()
    .optional(),
  description: z.string().nullable().optional(),
  director: z.string().nullable().optional(),
  duration_minutes: z
    .string()
    .min(2, "Duration minutes must be at least 2 characters long")
    .transform((val: string) => parseInt(val))
    .pipe(
      z
        .number("Duration minutes must be a number")
        .positive("Duration minutes must be a positive number")
    )
    .transform((val: number) => val.toString())
    .nullable()
    .optional(),
  genre: z.string().nullable().optional(),
  poster_url: z
    .string()
    .url("Poster URL must be a valid URL")
    .nullable()
    .optional(),
  rating: z
    .transform((val: string) => parseInt(val))
    .pipe(
      z
        .number("Rating must be a number")
        .min(0, "Rating must be at least 0")
        .max(10, "Rating must be at most 10")
    )
    .transform((val: number) => val.toString())
    .nullable()
    .optional(),
  release_year: z
    .transform((val: string) => +val)
    .pipe(
      z
        .number("Release year must be a number")
        .positive("Release year must be a positive number")
    )
    .transform((val: number) => {
      console.log("value return: ", val)
      return val.toString()
    })
    .pipe(
      z
        .string()
        .min(4, "Release year must be at least 4 characters long"))
    .nullable()
    .optional(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  trailer_url: z
    .string()
    .url("Trailer URL must be a valid URL")
    .nullable()
    .optional(),
});

export type MovieSchemaInsert = z.infer<typeof schemaMovieInsert>;

export interface OperationResult {
  type?: 'add' | 'edit' | 'delete';
  status: 'success' | 'error';
  message: string;
}

export interface MovieStore {
  // Estado
  selectedMovie: Movie | null;
  movies: Movie[];
  loading: boolean;
  error: ErrorType;
  operationResult: OperationResult | null;
  // filter: string;

  // Acciones
  fetchMovies: () => Promise<void>;
  addMovie: (movie: MovieInsert) => Promise<void>;
  // updateMovie: (movie: MovieUpdate) => Promise<void>;
  // deleteMovie: (id: string) => Promise<void>;
  setSelectedMovie: (movie: Movie | null) => void;
  clearSelectedMovie: () => void;
  clearOperationResult: () => void;
  // setFilter: (filter: string) => void;
}

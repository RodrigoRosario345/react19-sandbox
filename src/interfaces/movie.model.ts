import type { PostgrestError } from "@supabase/supabase-js";
import type { Tables, TablesInsert, TablesUpdate } from "./database.model";

export type Movie = Tables<"movies">;

export type MovieInsert = TablesInsert<'movies'>;

export type MovieUpdate = TablesUpdate<'movies'>;

export type ErrorType = PostgrestError | null;

export interface MovieStore {
  // Estado
  movies: Movie[];
  // selectedMovie: Movie | null;
  loading: boolean;
  error: ErrorType;
  // filter: string;

  // Acciones
  fetchMovies: () => Promise<void>;
  // getMovieById: (id: string) => Promise<Movie | null>;
  // addMovie: (movie: MovieInsert) => Promise<void>;
  // updateMovie: (movie: MovieUpdate) => Promise<void>;
  // deleteMovie: (id: string) => Promise<void>;
  // setSelectedMovie: (movie: Movie | null) => void;
  // setFilter: (filter: string) => void;
}



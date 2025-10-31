import type { Tables } from "./database.model";

export type Movie = Tables<"movies">;

export interface MovieInsert {
  title: string;
  description?: string | null;
  release_year?: number | null;
  duration_minutes?: number | null;
  rating?: number | null;
  genre?: string | null;
  director?: string | null;
  poster_url?: string | null;
  trailer_url?: string | null;
}

export interface MovieUpdate {
  id: string;
  title?: string;
  description?: string | null;
  release_year?: number | null;
  duration_minutes?: number | null;
  rating?: number | null;
  genre?: string | null;
  director?: string | null;
  poster_url?: string | null;
  trailer_url?: string | null;
}


export interface MovieStore {
  // Estado
  movies: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
  filter: string;

  // Acciones
  fetchMovies: () => Promise<void>;
  getMovieById: (id: string) => Promise<Movie | null>;
  addMovie: (movie: MovieInsert) => Promise<void>;
  updateMovie: (movie: MovieUpdate) => Promise<void>;
  deleteMovie: (id: string) => Promise<void>;
  setSelectedMovie: (movie: Movie | null) => void;
  setFilter: (filter: string) => void;
  getFilteredMovies: () => Movie[];
}



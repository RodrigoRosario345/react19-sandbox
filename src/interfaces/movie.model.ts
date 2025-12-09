import type { PostgrestError } from "@supabase/supabase-js";
import type { Tables, TablesInsert, TablesUpdate } from "./database.model";
import z from "zod";
import type { SelectOption } from "./input";

export type Movie = Tables<"movies">;

export type MovieInsert = TablesInsert<"movies">;

export type MovieUpdate = TablesUpdate<"movies">;

export type ErrorType = PostgrestError | null;

export const MovieGenresArray = [
  "action",
  "comedy",
  "drama",
  "horror",
  "romance",
  "sci-fi",
  "thriller",
] as const;

export const schemaMovie = z.object({
  background_url: z
    .string()
    .url("Background URL must be a valid URL")
    .nullable()
    .optional(),
  description: z
    .string()
    .transform((val) => val.trim())
    .nullable()
    .optional(),
  director: z.string().nullable().optional(),
  duration_minutes: z
    .string()
    .regex(/^-?\d+$/, "Duration must be a valid number")
    .nullable()
    .transform((val: string | null) =>
      !val || val === "" ? null : parseInt(val)
    )
    .pipe(z.number().positive("Must be positive").nullable())
    .optional(),
  genre: z.enum(MovieGenresArray, "Genre must be one of the predefined values"),
  poster_url: z
    .string()
    .url("Poster URL must be a valid URL")
    .nullable()
    .optional(),
  rating: z
    .string()
    .regex(/^\d+(\.\d)?$/, "Rating must be a valid number")
    .nullable()
    .transform((val: string | null) =>
      !val || val === "" ? null : parseFloat(val)
    )
    .pipe(
      z
        .number()
        .min(0, "Rating must be at least 0")
        .max(10, "Rating must be at most 10")
        .nullable()
    )
    .optional(),
  release_year: z
    .string()
    .regex(/^-?\d+$/, "Release year must be a valid number")
    .length(4, "Release year must be 4 characters long")
    .nullable()
    .transform((val: string | null) =>
      !val || val === "" ? null : parseInt(val)
    )
    .pipe(
      z.number().positive("Release year must be a positive number").nullable()
    )
    .optional(),
  title: z
    .string("The field title is required")
    .min(3, "Title must be at least 3 characters long")
    .transform((val) => val.trim()),
  trailer_url: z
    .string()
    .url("Trailer URL must be a valid URL")
    .nullable()
    .optional(),
});

export type MovieGenre = (typeof MovieGenresArray)[number];

export const MOVIE_GENRES: SelectOption<MovieGenre>[] = [
  { value: "action", label: "Action" },
  { value: "comedy", label: "Comedy" },
  { value: "drama", label: "Drama" },
  { value: "horror", label: "Horror" },
  { value: "romance", label: "Romance" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "thriller", label: "Thriller" },
];

export type MovieSchema = z.infer<typeof schemaMovie>;
export type MovieSchemaInput = z.input<typeof schemaMovie>;
export type MovieSchemaOutput = z.output<typeof schemaMovie>;

export interface OperationResult {
  type?: "add" | "edit" | "delete";
  status: "success" | "error";
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
  updateMovie: (movie: MovieUpdate) => Promise<void>;
  deleteMovie: (id: string) => Promise<void>;
  setSelectedMovie: (movie: Movie | null) => void;
  clearSelectedMovie: () => void;
  clearOperationResult: () => void;
  // setFilter: (filter: string) => void;
}

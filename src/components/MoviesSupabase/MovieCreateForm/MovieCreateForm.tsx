import { ControllerInput } from "@/components/ui";
import { schemaMovieInsert, type MovieInsert, type MovieSchemaInsert } from "@/interfaces/movie.model";
import { sanitizeRatingInput } from "@/utils/input/onlyNumbers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Datepicker, Label, Textarea, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";

export function MovieCreateForm() {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<MovieSchemaInsert>({ mode: "onChange", resolver: zodResolver(schemaMovieInsert) });

    const onSubmit = (data: MovieSchemaInsert) => {
        console.log("Data insert movie: ", data);
    };

    return (
        <div className="font-sans">
            <form
                className="m-auto flex max-w-xl flex-col gap-4 bg-gray-800 p-6 rounded-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-lg font-semibold text-white">Create New Movie</h1>
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    error={errors.title}
                    name="title"
                    label="Title"
                    placeholder="Enter movie title"
                    required
                // validation={{
                //     minLength: { value: 3, message: "Title must be at least 3 characters long" }
                // }}
                />
                <div>
                    <div className="mb-2">
                        <Label htmlFor="description">Description</Label>
                    </div>
                    <Textarea
                        id="description"
                        placeholder="Enter movie description"
                        required
                        rows={4}
                    />
                </div>
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    error={errors.director}
                    name="director"
                    label="Director"
                    placeholder="Enter movie director"
                />
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    error={errors.release_year}
                    name="release_year"
                    label="Release Year"
                    placeholder="Enter movie release year"
                />
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    error={errors.duration_minutes}
                    name="duration_minutes"
                    label="Duration Minutes"
                    placeholder="Enter movie duration in minutes"
                    // validation={{
                    //     minLength: { value: 2, message: "Duration must be at least 2 characters long" },
                    //     pattern: { value: /^[0-9]+$/, message: "Duration must be a number" }
                    // }}
                />
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    error={errors.rating}
                    name="rating"
                    label="Rating"
                    placeholder="Enter movie rating"
                    setError={setError}
                    transformValue={sanitizeRatingInput}
                />
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    error={errors.genre}
                    name="genre"
                    label="Genre"
                    placeholder="Enter movie genre"
                />
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    error={errors.background_url}
                    name="background_url"
                    label="Background URL"
                    placeholder="Enter movie background URL"
                />
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    error={errors.poster_url}
                    name="poster_url"
                    label="Poster URL"
                    placeholder="Enter movie poster URL"
                />
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    error={errors.trailer_url}
                    name="trailer_url"
                    label="Trailer URL"
                    placeholder="Enter movie trailer URL"
                />
                <Button className="cursor-pointer" type="submit">
                    Create Movie
                </Button>
            </form>
        </div>
    );
}

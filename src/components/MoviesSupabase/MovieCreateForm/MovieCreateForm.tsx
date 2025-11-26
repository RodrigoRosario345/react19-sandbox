import { ControllerInput } from "@/components/ui/form/ControllerInput";
import { ControllerSelect } from "@/components/ui/form/ControllerSelect";
import { ControllerTextarea } from "@/components/ui/form/ControllerTextarea";
import { MOVIE_GENRES, schemaMovieInsert, type MovieSchemaInsert } from "@/interfaces/movie.model";
import { useMovieStore } from "@/store/movie.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export function MovieCreateForm() {
    const addMovie = useMovieStore((state) => state.addMovie)
    const { control, handleSubmit } = useForm<MovieSchemaInsert>({
        mode: "onChange",
        resolver: zodResolver(schemaMovieInsert),
    });
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    const onSubmit = (data: MovieSchemaInsert) => {
        addMovie(
            {
                ...data,
                release_year: +data.release_year!,
                duration_minutes: +data.duration_minutes!,
                rating: +data.rating!
            }
        );
        goBack();
    };

    return (
        <div className="font-sans">
            <Button
                onClick={goBack}
                color="dark"
                className="sticky top-[60px] left-0 mb-5 cursor-pointer"
            >
                <HiOutlineArrowLeft className="h-6 w-6" />
            </Button>
            <form
                className="m-auto flex max-w-xl flex-col gap-4 bg-gray-800 p-6 rounded-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-lg font-semibold text-white">Create New Movie</h1>
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    name="title"
                    label="Title"
                    placeholder="Enter movie title"
                    required
                // validation={{
                //     minLength: { value: 3, message: "Title must be at least 3 characters long" }
                // }}
                />
                <ControllerTextarea<MovieSchemaInsert>
                    control={control}
                    name="description"
                    label="Description"
                    placeholder="Enter movie description"
                />
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    name="director"
                    label="Director"
                    placeholder="Enter movie director"
                />
                <div className="flex gap-2.5">
                    <ControllerInput<MovieSchemaInsert>
                        control={control}
                        name="release_year"
                        label="Release Year"
                        placeholder="Enter movie release year"
                    />
                    <ControllerInput<MovieSchemaInsert>
                        control={control}
                        name="duration_minutes"
                        label="Duration Minutes"
                        placeholder="Enter movie duration in minutes"
                    // validation={{
                    //     minLength: { value: 2, message: "Duration must be at least 2 characters long" },
                    //     pattern: { value: /^[0-9]+$/, message: "Duration must be a number" }
                    // }}
                    />
                </div>
                <div className="flex gap-2.5">
                    <ControllerInput<MovieSchemaInsert>
                        control={control}
                        name="rating"
                        label="Rating"
                        placeholder="Enter movie rating"
                    />
                    <ControllerSelect<MovieSchemaInsert>
                        control={control}
                        name="genre"
                        label="Genre"
                        placeholder="Select movie genre"
                        options={MOVIE_GENRES}
                    />
                </div>
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    name="background_url"
                    label="Background URL"
                    placeholder="Enter movie background URL"
                />
                <ControllerInput<MovieSchemaInsert>
                    control={control}
                    name="poster_url"
                    label="Poster URL"
                    placeholder="Enter movie poster URL"
                />
                <ControllerInput<MovieSchemaInsert>
                    control={control}
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

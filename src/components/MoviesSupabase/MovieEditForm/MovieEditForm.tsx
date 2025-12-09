import { ControllerInput } from "@/components/ui";
import { ControllerSelect } from "@/components/ui/form/ControllerSelect";
import { ControllerTextarea } from "@/components/ui/form/ControllerTextarea";
import { MOVIE_GENRES, schemaMovie, type MovieSchema, type MovieSchemaInput, type MovieSchemaOutput } from "@/interfaces/movie.model";
import { useMovieStore } from "@/store/movie.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export function MovieEditForm() {
    const movie = useMovieStore((state) => state.selectedMovie);
    const updateMovie = useMovieStore((state) => state.updateMovie)
    const { control, handleSubmit } = useForm<MovieSchemaInput, any, MovieSchema>({
        mode: "onChange",
        resolver: zodResolver(schemaMovie),
        defaultValues: {
            title: movie?.title || "",
            description: movie?.description || "",
            director: movie?.director || "",
            release_year: movie?.release_year?.toString() || "",
            duration_minutes: movie?.duration_minutes?.toString() || "",
            rating: movie?.rating?.toString() || "",
            genre: movie?.genre?.toLocaleLowerCase() as MovieSchema["genre"] || "",
            background_url: movie?.background_url || "",
            poster_url: movie?.poster_url || "",
            trailer_url: movie?.trailer_url || "",
        },
    });
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    const onSubmit = async (data: MovieSchema) => {
        console.log(data);
        if (!movie) return;
        await updateMovie({
            ...data,
            id: movie.id,
            release_year: +data.release_year!,
            duration_minutes: +data.duration_minutes!,
            rating: +data.rating!
        });
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
                <h1 className="text-lg font-semibold text-white">Edit Movie</h1>
                <ControllerInput<MovieSchemaInput, MovieSchemaOutput>
                    control={control}
                    name="title"
                    label="Title"
                    placeholder="Enter movie title"
                    required
                />
                <ControllerTextarea<MovieSchemaInput, MovieSchemaOutput>
                    control={control}
                    name="description"
                    label="Description"
                    placeholder="Enter movie description"
                />
                <ControllerInput<MovieSchemaInput, MovieSchemaOutput>
                    control={control}
                    name="director"
                    label="Director"
                    placeholder="Enter movie director"
                />
                <div className="flex gap-2.5">
                    <ControllerInput<MovieSchemaInput, MovieSchemaOutput>
                        control={control}
                        name="release_year"
                        label="Release Year"
                        placeholder="Enter movie release year"
                    />
                    <ControllerInput<MovieSchemaInput, MovieSchemaOutput>
                        control={control}
                        name="duration_minutes"
                        label="Duration Minutes"
                        placeholder="Enter movie duration in minutes"
                    />
                </div>
                <div className="flex gap-2.5">
                    <ControllerInput<MovieSchemaInput, MovieSchemaOutput>
                        control={control}
                        name="rating"
                        label="Rating"
                        placeholder="Enter movie rating"
                    />
                    <ControllerSelect<MovieSchemaInput, MovieSchemaOutput>
                        control={control}
                        name="genre"
                        label="Genre"
                        placeholder="Select movie genre"
                        options={MOVIE_GENRES}
                    />
                </div>
                <ControllerInput<MovieSchemaInput, MovieSchemaOutput>
                    control={control}
                    name="background_url"
                    label="Background URL"
                    placeholder="Enter movie background URL"
                />
                <ControllerInput<MovieSchemaInput, MovieSchemaOutput>
                    control={control}
                    name="poster_url"
                    label="Poster URL"
                    placeholder="Enter movie poster URL"
                />
                <ControllerInput<MovieSchemaInput, MovieSchemaOutput>
                    control={control}
                    name="trailer_url"
                    label="Trailer URL"
                    placeholder="Enter movie trailer URL"
                />
                <Button className="cursor-pointer" type="submit">
                    Update Movie
                </Button>
            </form>
        </div>
    );
}
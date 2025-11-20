import { ControllerInput } from "@/components/ui";
import type { MovieInsert } from "@/interfaces/movie.model";
import { onlyNumbers } from "@/utils/input/onlyNumbers";
import { Button, Datepicker, Label, Textarea, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";




export function MovieCreateForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<MovieInsert>({ mode: "onChange" });

    const onSubmit = (data: MovieInsert) => {
        console.log("Data insert movie: ", data);
    };

    return (
        <div className="font-sans">
            <form
                className="m-auto flex max-w-xl flex-col gap-4 bg-gray-800 p-6 rounded-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-lg font-semibold text-white">Create New Movie</h1>
                <ControllerInput<MovieInsert>
                    control={control}
                    error={errors.title}
                    name="title"
                    label="Title"
                    placeholder="Enter movie title"
                    required
                    validation={{
                        minLength: { value: 3, message: "Title must be at least 3 characters long" }
                    }}
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
                <div>
                    <div className="mb-2">
                        <Label htmlFor="release_year">Release Year</Label>
                    </div>
                    <Datepicker
                        language="en"
                        labelTodayButton="Today"
                        labelClearButton="Clear"
                    />
                </div>
                <ControllerInput<MovieInsert>
                    control={control}
                    error={errors.duration_minutes}
                    name="duration_minutes"
                    label="Duration Minutes"
                    placeholder="Enter movie duration in minutes"
                    validation={{
                        minLength: { value: 2, message: "Duration must be at least 2 characters long" },
                        pattern: { value: /^[0-9]+$/, message: "Duration must be a number" }
                    }}
                />
                <ControllerInput<MovieInsert>
                    control={control}
                    error={errors.rating}
                    name="rating"
                    label="Rating"
                    placeholder="Enter movie rating"
                    validation={{
                        min: { value: 0, message: "Rating must be at least 0" },
                        max: { value: 10, message: "Rating must be at most 10" }
                    }}
                    transformValue={onlyNumbers}
                />
                <div>
                    <div className="mb-2">
                        <Label htmlFor="genre">Genre</Label>
                    </div>
                    <TextInput
                        id="genre"
                        type="text"
                        placeholder="Enter movie genre"
                        shadow
                    />
                </div>
                <Button className="cursor-pointer" type="submit">
                    Create Movie
                </Button>
            </form>
        </div>
    );
}

// hooks/useControllerField.ts
import { useController, type Control, type FieldValues, type Path } from "react-hook-form";

export interface BaseControllerProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    disabled?: boolean;
    helperText?: string;
    required?: boolean;
    className?: string;
}

export function useControllerField<T extends FieldValues>(
    name: Path<T>,
    control: Control<T>,
    required?: boolean
) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: {
            required: required ? `This field is required` : false,
        },
    });

    const hasError = !!error;
    const colorState = hasError ? "failure" : "gray";

    return {
        field,
        error,
        hasError,
        colorState,
    };
}

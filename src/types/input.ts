import type { FieldValues, UseFormSetError } from "react-hook-form";

export type DataError = {
    field: string;
    type: string;
};

export type InputTransformer = <T extends FieldValues>(
    currentValue: string,
    setError?: UseFormSetError<T>,
    dataError?: DataError
) => string;

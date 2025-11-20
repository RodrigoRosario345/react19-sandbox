import { HelperText, Label, TextInput } from "flowbite-react";
import { Controller, type Control, type FieldError, type FieldValues, type Path, type RegisterOptions } from "react-hook-form";
import type { ComponentProps } from "react";
import type { InputTransformer } from "@/types/input";

export interface ControllerInputProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    control: Control<T>;
    type?: ComponentProps<typeof TextInput>["type"];
    disabled?: boolean;
    helperText?: string;
    required?: boolean;
    className?: string;
    error?: FieldError
    validation?: RegisterOptions<T>;
    transformValue?: InputTransformer
}

export function ControllerInput<T extends FieldValues>({
    name,
    label,
    placeholder = "",
    control,
    type = "text",
    disabled = false,
    helperText,
    required = false,
    className,
    error,
    validation,
    transformValue
}: ControllerInputProps<T>) {
    const hasError = !!error;
    const colorState = hasError ? "failure" : "gray";

    return (
        <div className={`flex flex-col gap-2 ${className}`}>

            <Label htmlFor={name} className={hasError ? "text-red-500!" : ""}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            <Controller
                name={name}
                control={control}
                rules={
                    {
                        required: required ? `The ${label} field is required.` : false,
                        ...validation
                    }
                }
                render={({ field }) => (
                    <TextInput
                        {...field}
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        color={colorState}
                        disabled={disabled}
                        shadow
                        value={field.value || ''}
                        aria-invalid={hasError}
                        aria-describedby={
                            hasError ? `${name}-error` :
                                helperText ? `${name}-helper` : undefined
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const transformedValue = transformValue ? transformValue(e.target.value, field.value) : e.target.value;
                            field.onChange(transformedValue);
                        }}
                    />
                )}
            />

            {hasError && (
                <HelperText className="-mt-1" id={`${name}-error`} color="failure" role="alert">
                    {error.message}
                </HelperText>
            )}

            {!hasError && helperText && (
                <HelperText id={`${name}-helper`}>
                    {helperText}
                </HelperText>
            )}
        </div>

    );
}
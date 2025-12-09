import { useControllerField, type BaseControllerProps } from "@/hooks";
import { HelperText, Label, TextInput } from "flowbite-react";
import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";

export interface ControllerInputProps<T extends FieldValues, TT> extends BaseControllerProps<T, TT> {
    type?: ComponentProps<typeof TextInput>["type"];
    placeholder?: string;
}

export function ControllerInput<T extends FieldValues, TT>({
    name,
    label,
    control,
    type = "text",
    placeholder = "",
    disabled = false,
    helperText,
    required = false,
    className,
}: ControllerInputProps<T, TT>) {
    const { field, error, hasError, colorState } = useControllerField(name, control, required)

    return (
        <div className={`flex-1 flex flex-col gap-2 ${className}`}>
            <Label htmlFor={name} className={hasError ? "text-red-500!" : ""}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            <TextInput
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                color={colorState}
                disabled={disabled}
                value={field.value || ""}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            />

            {hasError && (
                <HelperText className="-mt-1" id={`${name}-error`} color="failure" role="alert">
                    {error?.message}
                </HelperText>
            )}

            {!hasError && helperText && (
                <HelperText id={`${name}-helper`}>{helperText}</HelperText>
            )}
        </div>
    );
}
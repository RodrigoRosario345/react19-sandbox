import { useControllerField, type BaseControllerProps } from "@/hooks";
import { HelperText, Label, Textarea } from "flowbite-react";
import type { FieldValues } from "react-hook-form";

export interface ControllerTextareaProps<T extends FieldValues>
    extends BaseControllerProps<T> {
    placeholder?: string;
    rows?: number;
}

export function ControllerTextarea<T extends FieldValues>({
    name,
    label,
    control,
    placeholder = "",
    rows = 4,
    disabled = false,
    helperText,
    required = false,
    className,
}: ControllerTextareaProps<T>) {
    const { field, error, hasError, colorState } = useControllerField(name, control, required);
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <Label htmlFor={name} className={hasError ? "text-red-500!" : ""}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            <Textarea
                {...field}
                id={name}
                placeholder={placeholder}
                rows={rows}
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

import { useControllerField, type BaseControllerProps } from "@/hooks";
import type { SelectOption } from "@/interfaces/input";
import { HelperText, Label, Select } from "flowbite-react";
import type { FieldValues } from "react-hook-form";

export interface ControllerSelectProps<T extends FieldValues, TT>
    extends BaseControllerProps<T, TT> {
    options: SelectOption[];
    placeholder?: string;
}

export function ControllerSelect<T extends FieldValues, TT>({
    name,
    label,
    control,
    options,
    placeholder = "Select an option",
    disabled = false,
    helperText,
    required = false,
    className,
}: ControllerSelectProps<T, TT>) {
    const { field, error, hasError, colorState } = useControllerField(
        name,
        control,
        required
    );
    return (
        <div className={`flex-1 flex flex-col gap-2 ${className}`}>
            <Label htmlFor={name} className={hasError ? "text-red-500!" : ""}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            <Select
                {...field}
                id={name}
                color={colorState}
                disabled={disabled}
                value={field.value || ""}
                aria-invalid={hasError}
                aria-describedby={
                    hasError ? `${name}-error` : helperText ? `${name}-helper` : undefined
                }
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>

            {hasError && (
                <HelperText
                    className="-mt-1"
                    id={`${name}-error`}
                    color="failure"
                    role="alert"
                >
                    {error?.message}
                </HelperText>
            )}

            {!hasError && helperText && (
                <HelperText id={`${name}-helper`}>{helperText}</HelperText>
            )}
        </div>
    );
}

import type { InputTransformer } from "@/types/input";

export const sanitizeRatingInput: InputTransformer = (currentValue, setError, dataError) => {
    if (!currentValue.trim()) return currentValue;

    const cleaned = currentValue.replace(/[^0-9.]/g, '');

    // Validate: numbers 0–10 with optional decimal (as typing)
    const validFormat = /^(10|\d(?:\.\d?)?)$/.test(cleaned);

    if (!validFormat) {
        if (setError && dataError) {
            // Usamos setTimeout para que el error se establezca DESPUÉS de que
            // React Hook Form procese el onChange (que de otro modo limpiaría este error)
            setTimeout(() => {
                setError(dataError.field as any, {
                    type: dataError.type,
                    message: "Rating must be a number between 0 and 10"
                });
            }, 0);
        }
        return "";
    };

    const value = parseFloat(cleaned);
    if (isNaN(value) || value > 10) return "";

    return cleaned;
};

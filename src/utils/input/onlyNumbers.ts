import type { InputTransformer } from "@/types/input";

// validate number input range 0 to 10 only accepting numbers and decimal examples like 0, 1, 2.5, 10, etc.
export const onlyNumbers: InputTransformer = (currentValue, prevValue) => {

    const numberValue = parseFloat(currentValue.trim());
    if (isNaN(numberValue) || numberValue < 0 || numberValue > 10) {
        return "";
    }


    return numberValue.toString();
};
import type { User } from "@/interfaces/user.model";
import type {
    RegisterOptions,
    UseFormRegister,
} from "react-hook-form";

type Field = "text" | "email" | "password" ;


interface InputProps {
    type: Field ;
    placeholder: string;
    name: keyof User;
    register: UseFormRegister<User>;
    validation?: RegisterOptions<User>;
    error?: string;
}

export function Input({
    type,
    placeholder,
    name,
    register,
    validation,
    error,
}: InputProps) {
    const styleError: string = error
        ? "outline-2 outline-red-500"
        : "";

    return (
        <div className="w-full flex flex-col gap-2">
            <input
                className={`bg-gray-200 placeholder:text-gray-500 text-gray-800 px-2.5 py-1.5 rounded-md focus:outline-2 focus:outline-violet-700 ${styleError}`}
                type={type}
                placeholder={placeholder}
                {...register(name, validation)}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    );
}

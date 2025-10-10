interface InputProps {
    type: "text" | "email" | "password";
    placeholder: string;
}
export function Input({ type, placeholder }: InputProps) {
    return (
        <input
            className="w-full bg-gray-200 placeholder:text-gray-500 text-gray-800 px-2.5 py-1.5 rounded-md focus:outline-2 focus:outline-violet-700"
            type={type}
            placeholder={placeholder}
        ></input>
    );
}

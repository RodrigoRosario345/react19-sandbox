interface ButtonProps {
    type?: "button" | "submit" | "reset";
    className?: string;
    children: React.ReactNode;
    parentMethod?: () => void
    disabled?: boolean;
}

export function Button(
    { type = "button", className, children, parentMethod, disabled = false }: ButtonProps) {
    return (
        <button className={`cursor-pointer transition-all ${className ?? ''}`} type={type} onClick={parentMethod} disabled={disabled}>
            {children}
        </button>
    );
}

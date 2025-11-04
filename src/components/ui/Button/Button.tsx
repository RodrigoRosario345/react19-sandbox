interface ButtonProps {
    type?: "button" | "submit" | "reset";
    className?: string;
    children: React.ReactNode;
    parentMethod?: () => void
}

export function Button(
    { type = "button", className, children, parentMethod }: ButtonProps) {
    return (
        <button className={`cursor-pointer transition-all ${className ?? ''}`} type={type} onClick={parentMethod}>
            {children}
        </button>
    );
}

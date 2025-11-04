interface ButtonProps {
    type?: "button" | "submit" | "reset";
    style?: string;
    children: React.ReactNode;
    parentMethod: () => void
}

export function Button(
    { type = "button", style, children, parentMethod }: ButtonProps) {
    return (
        <button className={`cursor-pointer transition-all ${style ?? ''}`} type={type} onClick={parentMethod}>
            {children}
        </button>
    );
}

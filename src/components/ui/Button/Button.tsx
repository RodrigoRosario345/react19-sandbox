interface Props {
    type: "button" | "submit" | "reset";
    style: string;
    children: React.ReactNode;
}

export function Button({ type, style, children }: Props) {
    return (
        <button className={`cursor-pointer transition-all ${style}`} type={type}>
            {children}
        </button>
    );
}

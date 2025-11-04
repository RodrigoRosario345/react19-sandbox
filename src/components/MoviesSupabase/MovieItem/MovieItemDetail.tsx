interface MovieItemDetailProps {
    children?: React.ReactNode;
    isDetailVisible: boolean;
}

export function MovieItemDetail({ children, isDetailVisible }: MovieItemDetailProps) {
    const visibilityClass = isDetailVisible ? 'scale-100 opacity-100 h-[600px] w-[800px]' : 'scale-0 opacity-0 size-0 pointer-events-none';

    return (
        <div className={`fixed top-6/12 left-6/12 -translate-6/12 bg-gray-100 rounded-2xl transition-all duration-500 ${visibilityClass}`}
        >
            {children}
        </div>
    )
}
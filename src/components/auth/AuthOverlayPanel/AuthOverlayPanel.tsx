interface AuthOverlayPanelProps {
    ref: React.Ref<HTMLDivElement>;
}
export function AuthOverlayPanel({ ref }: AuthOverlayPanelProps) {
    return (
        <div className="w-8/12 h-full absolute top-0 left-[calc(50%_+_20px)] bg-violet-800 rounded-[140px] 
        flex items-center" ref={ref}> 
        </div>
    );
}

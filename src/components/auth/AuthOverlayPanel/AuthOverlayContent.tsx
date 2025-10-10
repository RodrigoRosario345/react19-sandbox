import type { AuthMode } from "@/types";

interface Props {
    mode: AuthMode;
    styles: string;
    onToggle: () => void;
    ref: React.Ref<HTMLDivElement>;
}
const OVERLAY_CONFIG = {
    login: {
        title: "Welcome Back!",
        dividerText: "Enter your personal details to use all of site features",
        navigateText: "SIGN IN",
    },
    signup: {
        title: "Hello, Friend!",
        dividerText:
            "Register with your personal details to use all of site features",
        navigateText: "SIGN UP",
    },
} as const;

export function AuthOverlayContent({ mode, styles, onToggle, ref }: Props) {
    const config = OVERLAY_CONFIG[mode];

    return (
        <div
            className={`text-center text-white w-6/12 absolute top-6/12 translate-y-[-50%] p-10  ${styles}`}
            ref={ref}
        >
            <h1 className="text-3xl font-bold">{config.title}</h1>
            <p className="font-semibold mt-6 mb-7">{config.dividerText}</p>
            <button
                onClick={onToggle}
                className="border-2 border-gray-300 px-8 py-1 rounded-lg scale-100 hover:scale-110 cursor-pointer transition-all"
            >
                {config.navigateText}
            </button>
        </div>
    );
}

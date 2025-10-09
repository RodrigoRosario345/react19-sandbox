import type { ReactElement } from "react";
import {
    FaFacebookF,
    FaGithub,
    FaGooglePlusG,
    FaLinkedinIn,
} from "react-icons/fa6";

interface SOCIAL_PROVIDER {
    id: number;
    icon: ReactElement;
    label: string;
}

const SOCIAL_PROVIDERS: SOCIAL_PROVIDER[] = [
    { id: 1, icon: <FaGooglePlusG />, label: "Google" },
    { id: 2, icon: <FaFacebookF />, label: "Facebook" },
    { id: 3, icon: <FaGithub />, label: "Github" },
    { id: 4, icon: <FaLinkedinIn />, label: "LinkedIn" },
];

export function SocialButtons() {
    return (
        <div className="flex gap-1.5 p-2">
            {SOCIAL_PROVIDERS.map((provider: SOCIAL_PROVIDER) => (
                <a
                    key={provider.id}
                    className="border-2 border-gray-300 p-2.5 rounded-lg scale-100 hover:scale-110 hover:border-violet-700 cursor-pointer transition-all"
                >
                    {provider.icon}
                </a>
            ))}
        </div>
    );
}

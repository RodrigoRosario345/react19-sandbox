import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface PropsPanel {
    text: string;
    style: string;
    transformStyle?: string;
}

const panelData: PropsPanel[] = [
    { text: "1", style: "bg-red-500/75" },
    { text: "2", style: "bg-blue-500/75" },
    { text: "3", style: "bg-green-500/75" },
    { text: "4", style: "bg-purple-500/75" },
    { text: "5", style: "bg-yellow-500/75" },
    { text: "6", style: "bg-pink-500/75" },
    { text: "7", style: "bg-indigo-500/75" },
    { text: "8", style: "bg-orange-500/75" },
    { text: "9", style: "bg-teal-500/75" },
];

function Panel({ text, style, transformStyle }: PropsPanel) {
    return (
        <div
            className={`panel w-[186px] h-[116px] rounded-md border absolute top-2.5 left-2.5 text-center text-8xl flex justify-center items-center ${style} `}
            style={{ transform: transformStyle }}
        >
            <p>{text}</p>
        </div>
    );
}
type Element<T> = T | null;

export function Carrusel() {
    const galleryRef = useRef<Element<HTMLDivElement>>(null);
    const querySelectorAll = gsap.utils.selector(galleryRef);
    const tz: number = Math.round((186 / 2) / Math.tan(Math.PI / panelData.length));
    const anglePanel: number = Math.round(360 / panelData.length);

    useGSAP(
        () => {
            // SecuenceAnimation(box.current as HTMLDivElement);
            const tl = gsap.timeline();
            const carrusel = querySelectorAll(".carrusel");
            tl.to(carrusel, {
                // rotateX: -4,
                rotateY: 360,
                duration: 4,
                ease: "linear"
            })
        },
        { dependencies: [], scope: galleryRef }
    );

    return (
        <div className="size-[210px] relative perspective-midrange m-auto" ref={galleryRef}>
            <div className="carrusel w-full h-full absolute top-6/12 transform-3d">
                {panelData.map(({ text, style }: PropsPanel, i) => {
                    const transformStyle: string = `rotateY(${anglePanel * i}deg) translateZ(${tz + 10}px)`;
                    return (
                        <Panel
                            key={text}
                            text={text}
                            style={style}
                            transformStyle={transformStyle}
                        ></Panel>
                    );
                })}
            </div>
        </div>
    );
}

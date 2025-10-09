import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(SplitText, useGSAP);


interface Props {
  children: ReactNode
}


export function Title({ children }: Props) {
  const title = useRef(null);

  useGSAP(
    () => {
      SplitText.create(title.current, {
        type: "chars",
        charsClass: "chars++",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.chars, {
            y: -100,
            scale: 0,
            rotate: -90,
            stagger: 0.05,
            duration: 1,
            ease: "bounce.out"
          }),
      });
    },
    { dependencies: [], scope: title }
  );

  return (
    <h1
      className="title pt-[50px] text-6xl sm:text-8xl text-center mb-2 text-shadow-saiyan text-shadow-black"
      ref={title}
    >
      {children}
    </h1>
  );
}

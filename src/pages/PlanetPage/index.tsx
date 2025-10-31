// import { Title } from "@/components";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { Draggable } from "gsap/Draggable";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useRef, type ReactNode } from "react";



// gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

// // Helper type para ScrollTrigger con propiedades personalizadas
// type ScrollTriggerWithWrapping = ScrollTrigger & { wrapping?: boolean };

// type GSAPTween = gsap.core.Tween;
// type GSAPTimeline = gsap.core.Timeline;


// const animateFunc = (element: HTMLLIElement): GSAPTimeline => {
//   const tl = gsap.timeline();
//   tl.fromTo(
//     element,
//     {
//       scale: 0,
//       opacity: 0,
//     },
//     {
//       scale: 1,
//       opacity: 1,
//       zIndex: 100,
//       duration: 0.5,
//       yoyo: true,
//       repeat: 1,
//       ease: "power1.in",
//       immediateRender: false,
//     }
//   ).fromTo(
//     element.children[1],
//     {
//       xPercent: 0,
//     },
//     {
//       duration: 0.1,
//       xPercent: -100,
//       yoyo: true,
//       repeat: 1,
//       ease: "power1.in",
//       immediateRender: false,
//     },
//     0.4
//   ).fromTo(
//     element,
//     { xPercent: 400 },
//     {
//       xPercent: -400,
//       duration: 1,
//       ease: "none",
//       immediateRender: false,
//     },
//     0
//   );
//   return tl;
// };

// function buildSeamlessLoop(
//   items: HTMLLIElement[],
//   spacing: number,
//   animateFunc: (element: HTMLLIElement) => GSAPTimeline
// ): GSAPTimeline {
//   let overlap = Math.ceil(1 / spacing); // => 10
//   let startTime = items.length * spacing + 0.5; // => 1.2
//   let loopTime = (items.length + overlap) * spacing + 1; // => 2.7
//   let rawSequence = gsap.timeline({ paused: true });
//   let seamlessLoop = gsap.timeline({
//     paused: true,
//     repeat: -1,
//     onRepeat() {
//       // works around a super rare edge case bug that's fixed GSAP 3.6.1
//       this._time === this._dur && (this._tTime += this._dur - 0.01);
//     },
//   });
//   let l: number = items.length + overlap * 2; // 27
//   let time: number = 0;
//   let index: number = 0;

//   for (let i = 0; i < l; i++) {
//     index = i % items.length;
//     time = +(i * spacing).toFixed(1);
//     // console.log(
//     //   `index card: ${index + 1} => start time: ${time} => halfway: ${time + 0.4} => end time: ${time + 1}`
//     // );
//     rawSequence.add(animateFunc(items[index]), time);
//     i <= items.length && seamlessLoop.add("label" + i, time);
//   }
//   rawSequence.time(startTime);
//   seamlessLoop
//     .to(rawSequence, {
//       // anima from the previous state defined up to the current time
//       time: loopTime, // => 2.7
//       duration: loopTime - startTime, // => 1.5
//       ease: "none",
//     })
//     .fromTo(
//       rawSequence, // anima from the time "from" up to the time "to" but in reverse
//       { time: overlap * spacing + 1 }, // => 2
//       {
//         time: startTime, // => 1.2
//         duration: startTime - (overlap * spacing + 1), // -0.8
//         immediateRender: false,
//         ease: "none",
//       }
//     );
//   // console.log("seamlessLoop duration: ", seamlessLoop.duration());
//   // si el timeline dura 1.5s de su tiempo total y además se repite infinitamente, entonces si al
//   // saltar por ejemplo 1.7s, el timeline continuará desde 0.2s (1.7 - 1.5 = 0.2)
//   // esto es crucial para el scroll infinito
//   // seamlessLoop.totalTime(1.7);
//   return seamlessLoop;
// }

// interface ScrollTriggerConfig {
//   snapTime: SnapTimeCallback;
//   scrubTween: GSAPTween;
//   currentIterationRef: React.RefObject<number>;
//   loopTimeline: GSAPTimeline;
//   startDistance?: string | number;
//   endDistance?: string;
//   pinSelector?: string | HTMLDivElement;
// }

// /**
//   Crea un ScrollTrigger para animaciones de scroll infinito
//   @param config - Configuración del scroll trigger
//   @returns Instancia de ScrollTrigger
//  /
// function createInfiniteScrollTrigger(
//   config: ScrollTriggerConfig
// ): ScrollTrigger {
//   const {
//     snapTime,
//     scrubTween,
//     currentIterationRef,
//     loopTimeline,
//     startDistance = 0,
//     endDistance = "+=3000px",
//     pinSelector = ".gallery",
//   } = config;

//   return ScrollTrigger.create({
//     start: startDistance,
//     end: endDistance,
//     pin: pinSelector,// elemento a fijar durante el scroll
//     // scrub: true,
//     markers: true,
//     scroller: ".planets-page", // contenedor con overflow scroll
//     onUpdate(self) {
//       const selfWithWrapping = self as ScrollTriggerWithWrapping;

//       if (self.progress === 1 && self.direction > 0 && !selfWithWrapping.wrapping) {
//         wrapForward(self, currentIterationRef);
//       } else if (self.progress < 1e-5 && self.direction < 0 && !selfWithWrapping.wrapping) {
//         wrapBackward({
//           trigger: self,
//           currentIterationRef,
//           scrubTween,
//           loopTimeline,
//         });
//       } else {
//         // Nota: scrubTween.vars.totalTime es la propiedad identica a time que nos permite controlar el playhead del timeline
//         // con ello nos permite ir animando haciendo saltos como lo hace seek
//         scrubTween.vars.totalTime = snapTime(
//           (currentIterationRef.current + self.progress) * loopTimeline.duration()
//         );
//         // console.log("scrubTween jump: ", scrubTween.vars.totalTime);
//         scrubTween.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
//         selfWithWrapping.wrapping = false;
//       }
//     },
//   });
// }

// function wrapForward(
//   trigger: ScrollTrigger,
//   currentIterationRef: React.RefObject<number>
// ) {
//   // when the ScrollTrigger reaches the end, loop back to the beginning seamlessly
//   currentIterationRef.current++;
//   (trigger as ScrollTriggerWithWrapping).wrapping = true;
//   trigger.scroll(trigger.start + 1);
// }

// interface WrapBackwardConfig {
//   trigger: ScrollTrigger;
//   currentIterationRef: React.RefObject<number>;
//   scrubTween: GSAPTween;
//   loopTimeline: GSAPTimeline;
// }

// function wrapBackward(config: WrapBackwardConfig) {
//   const { trigger, currentIterationRef, scrubTween, loopTimeline } = config;
//   // when the ScrollTrigger reaches the start again (in reverse), loop back to the end seamlessly
//   currentIterationRef.current--;
//   if (currentIterationRef.current < 0) {
//     // to keep the playhead from stopping at the beginning, we jump ahead 10 iterations
//     currentIterationRef.current = 9;
//     loopTimeline.totalTime(
//       loopTimeline.totalTime() + loopTimeline.duration() * 10
//     );
//     scrubTween.pause(); // otherwise it may update the totalTime right before the trigger updates, making the starting value different than what we just set above.
//   }
//   (trigger as ScrollTriggerWithWrapping).wrapping = true;
//   trigger.scroll(trigger.end - 1);
// }

// interface TweenOptions {
//   duration?: number;
//   ease?: string | gsap.EaseFunction;
//   startPaused?: boolean;
// }

// interface ScrubTweenConfig {
//   loopTimeline: GSAPTimeline;
//   options?: TweenOptions;
// }

// /**
//   Crea un tween para scrubbing suave del timeline
//   @param config - Configuración del scrub tween
//   @returns Tween de GSAP para controlar el playhead
//  /
// const createScrubTween = (config: ScrubTweenConfig): GSAPTween => {
//   const { loopTimeline, options = {} } = config;

//   const { duration = 0.5, ease = "power3", startPaused = true } = options;

//   return gsap.to(loopTimeline, {
//     totalTime: 0,
//     duration,
//     ease,
//     paused: startPaused,
//     onUpdate() {
//       console.log(`loopTimeline totalTime (start: ${loopTimeline.totalTime()}, end: ${this.vars.totalTime})`);
//     }
//   });
// };

// type SnapTimeCallback = (offset: number) => number;

// interface ScrollToOffsetConfig {
//   totalTime: number;
//   currentIterationRef: React.RefObject<number>;
//   scrubTween: GSAPTween;
//   loopTimeline: GSAPTimeline;
//   trigger: ScrollTrigger;
// }
// /**
//   Hace scroll a un offset específico en el timeline, manejando el wrapping automático
//   @param config - Configuración para el scroll
//   @returns void - La función maneja el scroll internamente
//  /
// function scrollToOffset(config: ScrollToOffsetConfig): void {
//   const { totalTime, currentIterationRef, loopTimeline, scrubTween, trigger } = config;

//   // Calcular tiempo ajustado y progreso
//   const timelineDuration: number = loopTimeline.duration();
//   const progress: number = (totalTime - timelineDuration * currentIterationRef.current) / timelineDuration;
//   const scrollPosition: number = trigger.start + progress * (trigger.end - trigger.start);

//   if (progress > 1) {
//     wrapForward(trigger, currentIterationRef);
//   } else if (progress < 0) {
//     wrapBackward({
//       trigger,
//       currentIterationRef,
//       scrubTween,
//       loopTimeline,
//     });
//   } else {
//     trigger.scroll(scrollPosition);
//   }
// }

// interface CardProps {
//   children: ReactNode;
// }

// function Card({ children }: CardProps) {
//   return (
//     <div className="card w-full h-[95%] rounded-2xl absolute top-0 left-0">
//       <div className="card-front size-full bg-blue-800 rounded-2xl absolute inset-0 flex justify-center items-center text-3xl cursor-all-scroll z-20 shadow-md shadow-blue-950">
//         {children}
//       </div>
//       <div className="card-back w-full h-[90%] absolute top-[5%] left-0 bg-amber-400 p-4 rounded-s-2xl z-10">
//         <p className="font-sans text-base line-clamp-9">
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, blanditiis,
//           accusantium hic iure earum sapiente, laudantium quae voluptatibus nam amet at ab eaque.
//           Nulla tenetur voluptatibus quibusdam error temporibus reprehenderit.
//           Nulla tenetur voluptatibus quibusdam error temporibus reprehenderit.
//         </p>
//       </div>
//     </div>
//   );
// }

// interface NavigationControlsProps {
//   onNext: () => void;
//   onPrevious: () => void;
// }

// function NavigationControls({ onNext, onPrevious }: NavigationControlsProps) {
//   const buttonClasses =
//     "border-[3px] border-black px-3.5 rounded-lg cursor-pointer hover:border-white hover:text-white transition-all focus:outline-none";

//   return (
//     <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xl text-center">
//       <button
//         onClick={onPrevious}
//         className={`${buttonClasses} mr-6`}
//         aria-label="Previous card"
//       >
//         Prev
//       </button>
//       <button
//         onClick={onNext}
//         className={`${buttonClasses}`}
//         aria-label="Next card"
//       >
//         Next
//       </button>
//     </div>
//   );
// }
// todo carrusel infinito con scrollTrigger y gsap, primera opción todo en un solo archivo
// function PlanetsPage() {
//   const galleryRef = useRef<HTMLDivElement>(null);
//   const querySelectorAll = gsap.utils.selector(galleryRef);
//   const iterationRef = useRef<number>(0);
//   const spacing: number = 0.1;
//   let snapTime: SnapTimeCallback;
//   let loopTimeline: GSAPTimeline;
//   let scrubTween: GSAPTween;
//   let trigger: ScrollTrigger;

//   const handleNavigateNext = () =>
//     scrollToOffset({
//       totalTime: scrubTween.vars.totalTime + spacing,
//       currentIterationRef: iterationRef,
//       loopTimeline,
//       scrubTween,
//       trigger,
//     });

//   const handleNavigatePrevious = () =>
//     scrollToOffset({
//       totalTime: scrubTween.vars.totalTime - spacing,
//       currentIterationRef: iterationRef,
//       loopTimeline,
//       scrubTween,
//       trigger,
//     });

//   useGSAP(
//     () => {
//       const cards = querySelectorAll<HTMLLIElement>(".card");
//       gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

//       snapTime = gsap.utils.snap(spacing);
//       loopTimeline = buildSeamlessLoop(cards, spacing, animateFunc);

//       scrubTween = createScrubTween({ loopTimeline });

//       trigger = createInfiniteScrollTrigger({
//         snapTime,
//         scrubTween,
//         currentIterationRef: iterationRef,
//         loopTimeline,
//         pinSelector: galleryRef.current!,
//       });
//     },
//     { dependencies: [] }
//   );

//   return (
//     <>
//       <Title>
//         <span className="text-white">PLANETAS</span>
//       </Title>
//       <div className="planets-page h-[18rem] overflow-y-auto overflow-x-hidden no-scrollbar">
//         <div className="gallery w-full h-full relative" ref={galleryRef}>
//           <div className="cards w-[14rem] h-full relative top-0 left-6/12 -translate-x-6/12">
//             {[1, 2, 3, 4, 5, 6, 7].map((num, i) => {
//               return (
//                 <Card key={i}>
//                   <p>Card {num}</p>
//                 </Card>
//               );
//             })}
//           </div>
//           <NavigationControls
//             onNext={handleNavigateNext}
//             onPrevious={handleNavigatePrevious}
//           />
//         </div>
//         <div className="drag-proxy absolute"></div>
//       </div>
//     </>
//   );
// }

// export default PlanetsPage;

// function PlanetsPageFirstOption() {
//   const galleryRef = useRef<Element<HTMLDivElement>>(null);
//   const cardsRef = useRef<HTMLLIElement[]>([]);

//   useGSAP(
//     () => {
//       console.log("cardsRef.current: ", cardsRef.current);
//       const cards = gsap.utils.toArray<HTMLLIElement>(cardsRef.current)
//       gsap.set(cardsRef.current, { xPercent: 400, opacity: 0, scale: 0 });
//       const spacing = 0.1;
//       const snapTime = gsap.utils.snap(spacing);
//       buildSeamlessLoop(cards, spacing, animateFunc);
//     },
//     { dependencies: [], scope: galleryRef }
//   );

//   return (
//     <>
//       <div className="gallery w-full relative h-[18rem]" ref={galleryRef}>
//         <ul className="cards w-[14rem] h-full absolute top-0 left-6/12 -translate-x-6/12">
//           {[1, 2, 3, 4, 5, 6, 7].map((num, i) => {
//             return (
//               <Li key={i} ref={(e) => (cardsRef.current[i] = e)} >
//                 {/*  */}
//                 <h1></h1>
//                 <p>Card {num}</p>
//               </Li>
//             );
//           })}
//         </ul>
//         <div className="actions absolute top-[105%] left-6/12 -translate-x-6/12 text-lg">
//           <button className="prev border-[3px] border-black px-3 rounded-2xl mr-1 cursor-pointer hover:border-white hover:text-white">
//             Prev
//           </button>
//           <button className="next border-[3px] border-black px-3 rounded-2xl cursor-pointer hover:border-white hover:text-white">
//             Next
//           </button>
//         </div>
//       </div>
//       <div className="drag-proxy absolute"></div>
//     </>
//   );
// }
import { Title } from "@/components";
import { PlanetContainer } from "@/components/planets";

export function PlanetPage() {

  return (
    <>
      <Title>
        <span className="text-white">PLANETAS</span>
      </Title>
      <PlanetContainer />
    </>
  );
}
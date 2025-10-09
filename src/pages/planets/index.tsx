import { Title } from "@/components";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

type GSAPTween = gsap.core.Tween;
type GSAPTimeline = gsap.core.Timeline;

const animateFunc = (element: HTMLLIElement): GSAPTimeline => {
  const tl = gsap.timeline();
  tl.fromTo(
    element,
    {
      scale: 0,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      zIndex: 100,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: "power1.in",
      immediateRender: false,
    }
  ).fromTo(
    element,
    { xPercent: 400 },
    {
      xPercent: -400,
      duration: 1,
      ease: "none",
      immediateRender: false,
    },
    0
  );
  return tl;
};

function buildSeamlessLoop(
  items: HTMLLIElement[],
  spacing: number,
  animateFunc: (element: HTMLLIElement) => GSAPTimeline
): GSAPTimeline {
  let overlap = Math.ceil(1 / spacing); // => 10
  let startTime = items.length * spacing + 0.5; // => 1.2
  let loopTime = (items.length + overlap) * spacing + 1; // => 2.7
  let rawSequence = gsap.timeline({ paused: true });
  let seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      // works around a super rare edge case bug that's fixed GSAP 3.6.1
      this._time === this._dur && (this._tTime += this._dur - 0.01);
    },
  });
  let l: number = items.length + overlap * 2; // 27
  let time: number = 0;
  let index: number = 0;

  for (let i = 0; i < l; i++) {
    index = i % items.length;
    time = +(i * spacing).toFixed(1);
    // console.log(`index: ${index} => start time: ${time} => start end: ${time + 1}`)
    rawSequence.add(animateFunc(items[index]), time);
    i <= items.length && seamlessLoop.add("label" + i, time);
  }
  rawSequence.time(startTime);
  seamlessLoop
    .to(rawSequence, {
      // anima from the previous state defined up to the current time
      time: loopTime - 0.1, // => 2.7
      duration: loopTime - startTime, // => 1.5
      ease: "none",
    })
    .fromTo(
      rawSequence, // anima from the time "from" up to the time "to" but in reverse
      { time: overlap * spacing + 1 }, // => 2
      {
        time: startTime, // => 1.2
        duration: startTime - (overlap * spacing + 1), // -0.8
        immediateRender: false,
        ease: "none",
      },
    );
  return seamlessLoop;
}

type ScrollWrapCallback = (
  iterationDelta: number,
  scrollToPosition: number
) => void;

interface ScrollTriggerConfig {
  playhead: Playhead;
  wrapCallback: ScrollWrapCallback;
  wrapTime: WrapTimeCallback,
  scrubTween: GSAPTween;
  currentIteration: number;
  loopTimeline: GSAPTimeline;
  startDistance?: string | number;
  endDistance?: string;
  pinSelector?: string | HTMLDivElement;
}

/**
 * Crea un ScrollTrigger para animaciones de scroll infinito
 * @param config - Configuración del scroll trigger
 * @returns Instancia de ScrollTrigger
 */
function createInfiniteScrollTrigger(
  config: ScrollTriggerConfig
): ScrollTrigger {
  const {
    playhead,
    wrapCallback,
    wrapTime,
    currentIteration,
    loopTimeline,
    startDistance = 0,
    endDistance = "+=3000px",
    pinSelector = ".gallery",
  } = config;

  let scrubTween = config.scrubTween;

  let lastScrollY = 0;
  let scrollVelocity = 0;

  return ScrollTrigger.create({
    start: startDistance,
    end: endDistance,
    pin: pinSelector,
    // scrub: true,
    // markers: true,
    scroller: ".planets-page",
    onUpdate(self) {
      const currentScroll = self.scroll();
      const scrollThreshold = 1;
      const endThreshold = self.end - 1;

      scrollVelocity = Math.abs(currentScroll - lastScrollY);
      lastScrollY = currentScroll;

      // Wrapping
      if (currentScroll > endThreshold) {
        return wrapCallback(1, 2);
      }
      if (currentScroll < scrollThreshold && self.direction < 0) {
        return wrapCallback(-1, self.end - 2);
      }

      // Salto brusco - aplicar directamente
      if (scrollVelocity > 1000) {
        const jumpValue = self.direction < 0 ? 0 : 1.40;

        scrubTween.kill();

        playhead.offset = jumpValue;

        scrubTween = createScrubTween({
          playhead,
          loopTimeline,
          wrapTime
        })

        // Aplicar directamente a la timeline sin restart
        // scrubTween.progress(jumpValue / loopTimeline.duration());
        // scrubTween.invalidate().restart();
        return;
      }

      // Scroll normal
      const newOffset = (currentIteration + self.progress) * loopTimeline.duration();

      if (Math.abs(scrubTween.vars.offset - newOffset) > 0.001) {
        scrubTween.vars.offset = newOffset;
        scrubTween.invalidate().restart();
      }
    },
  });
}

type WrapTimeCallback = (offset: number) => number;

interface Playhead {
  offset: number;
}

interface TweenOptions {
  duration?: number;
  ease?: string | gsap.EaseFunction;
  startPaused?: boolean;
}

interface ScrubTweenConfig {
  playhead: Playhead;
  loopTimeline: GSAPTimeline;
  wrapTime: WrapTimeCallback;
  options?: TweenOptions;
}

/**
 * Crea un tween para scrubbing suave del timeline
 * @param config - Configuración del scrub tween
 * @returns Tween de GSAP para controlar el playhead
 */
const createScrubTween = (config: ScrubTweenConfig): GSAPTween => {
  const { playhead, loopTimeline, wrapTime, options = {} } = config;

  const { duration = 0.5, ease = "power3", startPaused = true } = options;

  return gsap.to(playhead, {
    offset: 0,
    duration,
    ease,
    paused: startPaused,
    onUpdate() {
      // Convierte el offset a un tiempo "seguro" en el timeline
      const safeTime = wrapTime(playhead.offset); // defined range between 0 and 1.5
      loopTimeline.time(safeTime);
      console.log("seamlessLoop moving: ", loopTimeline.time());
    },
  });
};

function progressToScroll(progress: number, trigger: ScrollTrigger): number {
  return gsap.utils.clamp(
    1,
    trigger.end - 1,
    gsap.utils.wrap(0, 1, progress) * trigger.end
  );
}

type SnapTimeCallback = (offset: number) => number;

interface ScrollToOffsetConfig {
  offset: number;
  snapTime: SnapTimeCallback;
  currentIteration: number;
  loopTimeline: GSAPTimeline;
  wrapCallback: ScrollWrapCallback;
  trigger: ScrollTrigger;
}

/**
 * Hace scroll a un offset específico en el timeline, manejando el wrapping automático
 * @param config - Configuración para el scroll
 * @returns void - La función maneja el scroll internamente
 */
function scrollToOffset(config: ScrollToOffsetConfig): void {
  const {
    offset,
    snapTime,
    currentIteration,
    loopTimeline,
    wrapCallback,
    trigger,
  } = config;

  // Calcular tiempo ajustado y progreso
  const snappedTime = snapTime(offset);
  const timelineDuration = loopTimeline.duration();
  const progress = (snappedTime - timelineDuration * currentIteration) / timelineDuration;
  const scrollPosition = progressToScroll(progress, trigger);

  // Verificar si necesita wrapping
  const needsWrapping = progress >= 1 || progress < 0;

  if (needsWrapping) {
    const iterationDelta = Math.floor(progress);
    return wrapCallback(iterationDelta, scrollPosition);
  }

  // Scroll normal dentro del rango válido
  trigger.scroll(scrollPosition);
}

interface LiProps {
  children: ReactNode;
}

function Li({ children }: LiProps) {
  return (
    <li className="card w-full h-[18rem] bg-blue-800 rounded-2xl absolute top-0 left-0 flex justify-center items-center text-3xl cursor-grab active:cursor-grabbing">
      {children}
    </li>
  );
}

interface NavigationControlsProps {
  onNext: () => void;
  onPrevious: () => void;
}

function NavigationControls({ onNext, onPrevious }: NavigationControlsProps) {
  const buttonClasses =
    "border-[3px] border-black px-3.5 rounded-lg cursor-pointer hover:border-white hover:text-white transition-all focus:outline-none";

  return (
    <div className="absolute top-[105%] left-1/2 -translate-x-1/2 text-xl text-center">
      <button
        onClick={onPrevious}
        className={`${buttonClasses} mr-1`}
        aria-label="Previous card"
      >
        Prev
      </button>
      <button
        onClick={onNext}
        className={`${buttonClasses}`}
        aria-label="Next card"
      >
        Next
      </button>
    </div>
  );
}

function PlanetsPage() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const querySelectorAll = gsap.utils.selector(galleryRef);
  let iteration: number = 0;
  const spacing: number = 0.1;
  let snapTime: SnapTimeCallback;
  const playhead: Playhead = { offset: 0 };
  let loopTimeline: GSAPTimeline;
  let wrapTime: WrapTimeCallback;
  let scrubTween: GSAPTween;
  let wrapCallback: ScrollWrapCallback;
  let trigger: ScrollTrigger;

  const handleNavigateNext = () =>
    scrollToOffset({
      offset: scrubTween.vars.offset + spacing,
      currentIteration: iteration,
      loopTimeline,
      snapTime,
      trigger,
      wrapCallback,
    });

  const handleNavigatePrevious = () =>
    scrollToOffset({
      offset: scrubTween.vars.offset - spacing,
      currentIteration: iteration,
      loopTimeline,
      snapTime,
      trigger,
      wrapCallback,
    });

  useGSAP(
    () => {
      const cards = querySelectorAll<HTMLLIElement>(".card");
      gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

      snapTime = gsap.utils.snap(spacing);
      loopTimeline = buildSeamlessLoop(cards, spacing, animateFunc);

      wrapTime = gsap.utils.wrap(0, loopTimeline.duration());
      scrubTween = createScrubTween({
        playhead,
        loopTimeline,
        wrapTime,
      });

      wrapCallback = (iterationDelta: number, scrollTo: number) => {
        iteration += iterationDelta;
        trigger.scroll(scrollTo);
        trigger.update(); // by default, when we trigger.scroll(), it waits 1 tick to update().
      };

      trigger = createInfiniteScrollTrigger({
        playhead,
        wrapCallback,
        wrapTime,
        scrubTween,
        currentIteration: iteration,
        loopTimeline,
        pinSelector: galleryRef.current!,
      });



      // ScrollTrigger.addEventListener("scrollEnd", () =>
      //   scrollToOffset({
      //     offset: scrubTween.vars.offset,
      //     currentIteration: iteration,
      //     loopTimeline,
      //     snapTime,
      //     trigger,
      //     wrapCallback,
      //   })
      // );
    },
    { dependencies: [] }
  );

  return (
    <>
      <Title>
        <span className="text-white">PLANETAS</span>
      </Title>
      <div className="planets-page h-[18rem] overflow-y-auto overflow-x-hidden no-scrollbar">

        <div className="gallery w-full h-full relative" ref={galleryRef}>
          <ul className="cards w-[14rem] h-full absolute top-0 left-6/12 -translate-x-6/12">
            {[1, 2, 3, 4, 5, 6, 7].map((num, i) => {
              return (
                <Li key={i}>
                  <p>Card {num}</p>
                </Li>
              );
            })}
          </ul>
          <NavigationControls
            onNext={handleNavigateNext}
            onPrevious={handleNavigatePrevious}
          />
        </div>
        <div className="drag-proxy absolute"></div>
      </div>
    </>

  );
}

export default PlanetsPage;

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

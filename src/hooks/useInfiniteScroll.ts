import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildSeamlessLoop, createScrubTween } from "@/utils/gsap/seamlessLoop";
import { createInfiniteScrollTrigger, scrollToOffset } from "@/utils/gsap/scrollTrigger";
import type { AnimateFunction, UseInfiniteScrollReturn, GSAPTimeline, GSAPTween, } from "@/types/infiniteScroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface UseInfiniteScrollOptions {
  spacing?: number;
  animateFunc: AnimateFunction<HTMLElement>;
  itemSelector: string;
  initialSetup?: (items: HTMLElement[]) => void;
  startDistance?: string | number;
  endDistance?: string;
  showMarkers?: boolean;
}

/**
 * Hook personalizado para manejar el infinite scroll con GSAP
 * Encapsula toda la lógica de animación, ScrollTrigger y navegación
 */
export function useInfiniteScroll(
  options: UseInfiniteScrollOptions
): UseInfiniteScrollReturn {
  const {
    spacing = 0.1,
    animateFunc,
    itemSelector,
    initialSetup,
    startDistance = 0,
    endDistance = "+=3000px",
    showMarkers = false,
  } = options;

  const scrollViewportRef = useRef<HTMLDivElement | null>(null);
  const scrollContentRef = useRef<HTMLDivElement | null>(null);

  const iterationRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);

  // Referencias para mantener los objetos GSAP
  const timelineRef = useRef<GSAPTimeline | null>(null);
  const scrubTweenRef = useRef<GSAPTween | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const snapTimeRef = useRef<((offset: number) => number) | null>(null);

  // const resetReferences = () => {
  //   iterationRef.current = 0;
  //   timelineRef.current = null;
  //   scrubTweenRef.current = null;
  //   triggerRef.current = null;
  //   snapTimeRef.current = null;
  //   setIsReady(false);
  // }

  // if (!isReady) {
  //   resetReferences();
  // }

  useGSAP(
    () => {
      if (!scrollViewportRef.current && !scrollContentRef.current) return;

      const querySelectorAll = gsap.utils.selector(scrollContentRef);
      const items = querySelectorAll<HTMLElement>(itemSelector);

      if (items.length === 0) {
        console.warn("No items found with selector:", itemSelector);
        return;
      }

      // Setup inicial de los items (opcional)
      if (initialSetup) {
        initialSetup(items);
      } else {
        // Setup por defecto
        gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });
      }

      // Crear snap function
      snapTimeRef.current = gsap.utils.snap(spacing);

      // Construir el seamless loop
      timelineRef.current = buildSeamlessLoop(items, spacing, animateFunc);

      // Crear el scrub tween
      scrubTweenRef.current = createScrubTween(timelineRef.current);

      // Crear el ScrollTrigger
      triggerRef.current = createInfiniteScrollTrigger({
        snapTime: snapTimeRef.current,
        scrubTween: scrubTweenRef.current,
        currentIterationRef: iterationRef,
        loopTimeline: timelineRef.current,
        startDistance,
        endDistance,
        pinSelector: scrollContentRef.current!,
        showMarkers,
        scrollerSelector: scrollViewportRef.current!,
      });

      setIsReady(true);
    },
    { dependencies: [], scope: scrollViewportRef }
  );

  const handleNext = () => {
    if (!scrubTweenRef.current || !timelineRef.current || !triggerRef.current) {
      return;
    }

    scrollToOffset({
      totalTime: scrubTweenRef.current.vars.totalTime + spacing,
      currentIterationRef: iterationRef,
      loopTimeline: timelineRef.current,
      scrubTween: scrubTweenRef.current,
      trigger: triggerRef.current,
    });
  };

  const handlePrevious = () => {
    if (!scrubTweenRef.current || !timelineRef.current || !triggerRef.current) {
      return;
    }

    scrollToOffset({
      totalTime: scrubTweenRef.current.vars.totalTime - spacing,
      currentIterationRef: iterationRef,
      loopTimeline: timelineRef.current,
      scrubTween: scrubTweenRef.current,
      trigger: triggerRef.current,
    });
  };

  return {
    scrollViewportRef,
    scrollContentRef,
    handleNext,
    handlePrevious,
    isReady,
  };
}

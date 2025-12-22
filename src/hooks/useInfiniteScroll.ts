import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildSeamlessLoop, createScrubTween } from "@/utils/gsap/seamlessLoop";
import { createInfiniteScrollTrigger, scrollToOffset } from "@/utils/gsap/scrollTrigger";
import type { AnimateFunction, UseInfiniteScrollReturn, GSAPTimeline, GSAPTween, } from "@/types/infiniteScroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface UseInfiniteScrollOptions<T> {
  items: T[];
  spacing?: number;
  animateFunc: AnimateFunction<HTMLElement>;
  itemSelector: string;
  initialSetup?: (items: HTMLElement[]) => void;
  startDistance?: string | number;
  endDistance?: string;
  showMarkers?: boolean;
  posInitItem?: number;
}
/**
 * Hook personalizado para manejar el infinite scroll con GSAP
 * Encapsula toda la lógica de animación, ScrollTrigger y navegación
 */
export function useInfiniteScroll<T>(
  options: UseInfiniteScrollOptions<T>
): UseInfiniteScrollReturn {
  const {
    items,
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

  useGSAP(
    () => {
      if (!scrollViewportRef.current && !scrollContentRef.current) return;

      console.log("Initializing Infinite Scroll Hook");

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
    { dependencies: [items.length], scope: scrollViewportRef }
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

  const handleMoveToItem = (itemIndex: number) => {
    if (!scrubTweenRef.current || !timelineRef.current || !triggerRef.current || !snapTimeRef.current) {
      return;
    }

    const targetTime = itemIndex * spacing;
    const snappedTime = snapTimeRef.current(targetTime);

    console.log("Moving to item index:", itemIndex, "at time:", snappedTime, "iterationRef:", iterationRef.current);

    scrollToOffset({
      totalTime: snappedTime,
      currentIterationRef: iterationRef,
      loopTimeline: timelineRef.current,
      scrubTween: scrubTweenRef.current,
      trigger: triggerRef.current,
    });
  }

  const reseatRefs = () => {
    timelineRef.current = null;
    scrubTweenRef.current = null;
    triggerRef.current = null;
    snapTimeRef.current = null;
    iterationRef.current = 0;
    setIsReady(false);
  };

  return {
    scrollViewportRef,
    scrollContentRef,
    triggerRef: triggerRef.current,
    handleNext,
    handlePrevious,
    handleMoveToItem,
    isReady,
    reseatRefs,
  };
}

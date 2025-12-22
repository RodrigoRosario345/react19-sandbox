import { ScrollTrigger } from "gsap/ScrollTrigger";
import type {
  ScrollTriggerConfig,
  ScrollTriggerWithWrapping,
  ScrollToOffsetConfig,
  WrapBackwardConfig,
} from "@/types/infiniteScroll";


/**
 * Hace wrap hacia adelante cuando el ScrollTrigger llega al final
 */
export function wrapForward(
  trigger: ScrollTrigger,
  currentIterationRef: React.RefObject<number>
): void {
  if (currentIterationRef.current !== null) {
    currentIterationRef.current++;
  }
  (trigger as ScrollTriggerWithWrapping).wrapping = true;
  trigger.scroll(trigger.start + 1);
}

/**
 * Hace wrap hacia atrás cuando el ScrollTrigger llega al inicio
 */
export function wrapBackward(config: WrapBackwardConfig): void {
  const { trigger, currentIterationRef, scrubTween, loopTimeline } = config;

  if (currentIterationRef.current !== null) {
    currentIterationRef.current--;

    if (currentIterationRef.current < 0) {
      // Para evitar que el playhead se detenga al principio, saltamos 10 iteraciones
      currentIterationRef.current = 9;
      loopTimeline.totalTime(
        loopTimeline.totalTime() + loopTimeline.duration() * 10
      );
      scrubTween.pause();
    }
  }

  (trigger as ScrollTriggerWithWrapping).wrapping = true;
  trigger.scroll(trigger.end - 1);
}

/**
 * Crea un ScrollTrigger para animaciones de scroll infinito
 */
export function createInfiniteScrollTrigger(
  config: ScrollTriggerConfig
): ScrollTrigger {
  const {
    snapTime,
    scrubTween,
    currentIterationRef,
    loopTimeline,
    startDistance = 0,
    endDistance = "+=3000px",
    pinSelector = ".gallery",
    showMarkers = false,
    scrollerSelector,
  } = config;
  let isInitializing = true;

  return ScrollTrigger.create({
    start: startDistance,
    end: endDistance,
    pin: pinSelector,
    markers: showMarkers,
    scroller: scrollerSelector,
    onUpdate(self) {
      const selfWithWrapping = self as ScrollTriggerWithWrapping;

      if (self.progress === 1 && self.direction > 0 && !selfWithWrapping.wrapping) {
        wrapForward(self, currentIterationRef);
      } else if (self.progress < 1e-5 && self.direction < 0 && !selfWithWrapping.wrapping) {
        wrapBackward({
          trigger: self,
          currentIterationRef,
          scrubTween,
          loopTimeline,
        });
      } else {

        let nextTime: number = snapTime((currentIterationRef.current! + self.progress) * loopTimeline.duration());

        if (isInitializing) {
          const scrollPosition: number = localStorage.getItem("nextTime") ? parseFloat(localStorage.getItem("nextTime")!) : 0;
          nextTime = localStorage.getItem("nextSnappedTime") ? parseFloat(localStorage.getItem("nextSnappedTime")!) : nextTime;
          currentIterationRef.current = localStorage.getItem("currentIteration") ? parseInt(localStorage.getItem("currentIteration")!) : currentIterationRef.current;
          self.scroll(scrollPosition);
          isInitializing = false;
        }

        localStorage.setItem("nextTime", `${self.scroll()}`);
        localStorage.setItem("nextSnappedTime", `${nextTime}`);
        localStorage.setItem("currentIteration", `${currentIterationRef.current}`);
        scrubTween.vars.totalTime = nextTime;
        scrubTween.invalidate().restart();
        selfWithWrapping.wrapping = false;
        scrubTween.duration(0.5);
      }
    },
  });
}

/**
 * Hace scroll a un offset específico en el timeline
 */
export function scrollToOffset(config: ScrollToOffsetConfig): void {
  const { totalTime, currentIterationRef, loopTimeline, scrubTween, trigger } =
    config;
  const timelineDuration = loopTimeline.duration();
  const progress = (totalTime - timelineDuration * currentIterationRef.current!) / timelineDuration;
  const scrollPosition = trigger.start + progress * (trigger.end - trigger.start);

  if (progress > 1) {
    wrapForward(trigger, currentIterationRef);
  } else if (progress < 0) {
    wrapBackward({
      trigger,
      currentIterationRef,
      scrubTween,
      loopTimeline,
    });
  } else {
    trigger.scroll(scrollPosition);
  }
}

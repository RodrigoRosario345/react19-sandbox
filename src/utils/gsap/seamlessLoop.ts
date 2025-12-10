import gsap from "gsap";
import type { AnimateFunction, GSAPTimeline } from "@/types/infiniteScroll";

/**
 * Construye un loop infinito seamless con las animaciones
 * @param items - Array de elementos HTML a animar
 * @param spacing - Espacio temporal entre animaciones (default: 0.1)
 * @param animateFunc - Función que define cómo animar cada elemento
 * @returns Timeline de GSAP configurado para loop infinito
 */
export function buildSeamlessLoop<T extends HTMLElement>(
  items: T[],
  spacing: number,
  animateFunc: AnimateFunction<T>,
  posInitItem: number
): GSAPTimeline {
  const overlap = Math.ceil(1 / spacing);
  const startTime = items.length * spacing + 0.5;
  const loopTime = (items.length + overlap) * spacing + 1;

  const rawSequence = gsap.timeline({ paused: true });
  const seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      // Workaround para edge case bug (fijado en GSAP 3.6.1)
      this._time === this._dur && (this._tTime += this._dur - 0.01);
    },
  });

  const totalIterations = items.length + overlap * 2;

  for (let i = 0; i < totalIterations; i++) {
    const index = i % items.length;
    const time = +(i * spacing).toFixed(1);
    console.log("Adding animation for item", index, "at time", time);
    rawSequence.add(animateFunc(items[index]), time);

    // if (i <= items.length) {
    //   seamlessLoop.add("label" + i, time);
    // }
  }

  // console.log({ startTime, loopTime });
  rawSequence.time(startTime + (posInitItem * spacing));

  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none",
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: "none",
      }
    );

  return seamlessLoop;
}

/**
 * Crea un tween para scrubbing suave del timeline
 * @param loopTimeline - Timeline principal del loop
 * @param duration - Duración del scrub (default: 0.5)
 * @param ease - Función de easing (default: "power3")
 * @returns Tween de GSAP para controlar el playhead
 */
export function createScrubTween(
  loopTimeline: GSAPTimeline,
  duration: number = 0.5,
  ease: string | gsap.EaseFunction = "power3"
): gsap.core.Tween {
  return gsap.to(loopTimeline, {
    totalTime: 0,
    duration,
    ease,
    paused: true,
  });
}

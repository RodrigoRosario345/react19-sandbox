import gsap from "gsap";
import type { GSAPTimeline } from "@/types/infiniteScroll";

/**
 * Animación de carta con flip horizontal
 * Ideal para elementos tipo carta con frente y reverso
 */
export function carruselInfiniteAnimation(element: HTMLElement): GSAPTimeline {
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
  )
    .fromTo(
      element.children[1],
      {
        xPercent: 0,
      },
      {
        duration: 0.1,
        xPercent: -100,
        yoyo: true,
        repeat: 1,
        ease: "power1.in",
        immediateRender: false,
      },
      0.4
    )
    .fromTo(
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
}

/**
 * Animación simple de fade y slide
 * Buena para listas o galerías simples
 */
export function fadeSlideAnimation(element: HTMLElement): GSAPTimeline {
  const tl = gsap.timeline();

  tl.fromTo(
    element,
    {
      x: 100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      immediateRender: false,
    }
  ).fromTo(
    element,
    { x: 0 },
    {
      x: -100,
      duration: 0.6,
      ease: "power2.in",
      immediateRender: false,
    },
    0.6
  );

  return tl;
}

/**
 * Animación de escala con bounce
 * Perfecta para elementos que necesitan llamar la atención
 */
export function bounceScaleAnimation(element: HTMLElement): GSAPTimeline {
  const tl = gsap.timeline();

  tl.fromTo(
    element,
    {
      scale: 0,
      rotation: -180,
      opacity: 0,
    },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
      immediateRender: false,
    }
  ).to(element, {
    scale: 0.9,
    duration: 0.2,
    yoyo: true,
    repeat: 1,
    ease: "power1.inOut",
  });

  return tl;
}

/**
 * Animación 3D de rotación
 * Efecto de profundidad con perspectiva
 */
export function rotate3DAnimation(element: HTMLElement): GSAPTimeline {
  const tl = gsap.timeline();

  tl.fromTo(
    element,
    {
      rotationY: -90,
      opacity: 0,
      transformPerspective: 1000,
    },
    {
      rotationY: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power2.out",
      immediateRender: false,
    }
  ).to(element, {
    rotationY: 90,
    opacity: 0,
    duration: 0.7,
    ease: "power2.in",
  });

  return tl;
}

/**
 * Animación de zoom suave
 * Para transiciones elegantes y minimalistas
 */
export function zoomAnimation(element: HTMLElement): GSAPTimeline {
  const tl = gsap.timeline();

  tl.fromTo(
    element,
    {
      scale: 0.5,
      opacity: 0,
    },
    {
      scale: 1.1,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
      immediateRender: false,
    }
  )
    .to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power1.inOut",
    })
    .to(element, {
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    });

  return tl;
}

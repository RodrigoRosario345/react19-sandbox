import type { ReactNode } from "react";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

// Tipos base de GSAP
export type GSAPTween = gsap.core.Tween;
export type GSAPTimeline = gsap.core.Timeline;

// ScrollTrigger con propiedades personalizadas
export type ScrollTriggerWithWrapping = ScrollTrigger & { wrapping?: boolean };

// Callback para snap de tiempo
export type SnapTimeCallback = (offset: number) => number;

// Función de animación personalizable
export type AnimateFunction<T = HTMLElement> = (element: T) => GSAPTimeline;

// Configuración del infinite scroll
export interface InfiniteScrollConfig<T = any> {
  items: T[];
  spacing?: number;
  animateFunc: AnimateFunction<HTMLElement>;
  renderItem: (item: T, index: number) => ReactNode;
  containerClassName?: string;
  itemClassName?: string;
  startDistance?: string | number;
  endDistance?: string;
  showMarkers?: boolean;
  showNavigation?: boolean;
  scrollerSelector?: string;
}

// Configuración del ScrollTrigger
export interface ScrollTriggerConfig {
  snapTime: SnapTimeCallback;
  scrubTween: GSAPTween;
  currentIterationRef: React.RefObject<number>;
  loopTimeline: GSAPTimeline;
  startDistance?: string | number;
  endDistance?: string;
  pinSelector?: string | HTMLDivElement;
  showMarkers?: boolean;
  scrollerSelector?: string | HTMLDivElement;
}

// Configuración del scrub tween
export interface ScrubTweenConfig {
  loopTimeline: GSAPTimeline;
  options?: TweenOptions;
}

export interface TweenOptions {
  duration?: number;
  ease?: string | gsap.EaseFunction;
  startPaused?: boolean;
}

// Configuración para scroll a offset
export interface ScrollToOffsetConfig {
  totalTime: number;
  currentIterationRef: React.RefObject<number>;
  scrubTween: GSAPTween;
  loopTimeline: GSAPTimeline;
  trigger: ScrollTrigger;
}

// Configuración para wrap backward
export interface WrapBackwardConfig {
  trigger: ScrollTrigger;
  currentIterationRef: React.RefObject<number>;
  scrubTween: GSAPTween;
  loopTimeline: GSAPTimeline;
}

// Return type del hook
export interface UseInfiniteScrollReturn {
  scrollViewportRef: React.RefObject<HTMLDivElement | null>;
  scrollContentRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: ScrollTrigger | null;
  handleNext: () => void;
  handlePrevious: () => void;
  handleMoveToItem: (index: number) => void;
  isReady: boolean;
  reseatRefs: () => void;
}
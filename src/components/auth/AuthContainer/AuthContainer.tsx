
import type { User } from "@/interfaces/user.model";
import type { AuthMode } from "@/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { AuthForm } from "../AuthForm/AuthForm";
import { AuthOverlayPanel } from "../AuthOverlayPanel/AuthOverlayPanel";
import { AuthOverlayContent } from "../AuthOverlayPanel/AuthOverlayContent";

gsap.registerPlugin(useGSAP);

// ==================== TYPES ====================
type ElementRef<T extends HTMLElement = HTMLElement> = React.RefObject<T>;
type AuthTimeline = gsap.core.Timeline;

interface AuthFormsTimelineConfig {
  loginFormRef: ElementRef<HTMLFormElement>;
  signupFormRef: ElementRef<HTMLFormElement>;
  overlayPanelRef: ElementRef<HTMLDivElement>;
  loginContentRef: ElementRef<HTMLDivElement>;
  signupContentRef: ElementRef<HTMLDivElement>;
}

// ==================== CONSTANTS ====================
const ANIMATION_CONFIG = {
  duration: {
    main: 1.5,
    fade: 0.75,
  },
  ease: "power1.inOut",
  positions: {
    formSlideXPercent: 50,
    overlaySlideXPercent: -100,
    formXOffset: "40px",
    overlayXOffset: "-40px",
    contentXOffset: "20px",
    contentNegativeXOffset: "-20px",
  },
  opacity: {
    visible: 1,
    hidden: 0,
  },
} as const;

// Valores iniciales para gsap.set()
const INITIAL_STATES = {
  loginContent: {
    xPercent: 0,
    opacity: ANIMATION_CONFIG.opacity.hidden,
  },
  signupContent: {
    xPercent: -100,
    x: ANIMATION_CONFIG.positions.contentXOffset,
    opacity: ANIMATION_CONFIG.opacity.visible,
  },
  loginForm: {
    xPercent: 0,
    opacity: ANIMATION_CONFIG.opacity.visible,
  },
  signupForm: {
    xPercent: 50,
    opacity: ANIMATION_CONFIG.opacity.hidden,
    display: "none",
  },
} as const;

// ==================== ANIMATION FACTORY ====================
/**
 * Crea un timeline de GSAP para alternar entre formularios de login y signup
 *
 * Secuencia de animación:
 * 1. Overlay panel se desliza a la izquierda
 * 2. Formulario de login se oculta (fade out)
 * 3. Formulario de signup aparece (fade in)
 * 4. Contenido del overlay cambia
 *
 * @param config - Referencias a los elementos del DOM
 * @returns Timeline pausado en modo reversa para control manual
 */
function createAuthFormsTimeline(
  config: AuthFormsTimelineConfig
): AuthTimeline {
  const {
    loginFormRef,
    signupFormRef,
    overlayPanelRef,
    loginContentRef,
    signupContentRef,
  } = config;

  const { duration, ease, positions, opacity } = ANIMATION_CONFIG;

  const timeline = gsap.timeline({
    paused: true,
    reversed: true,
  });

  // Animación del panel overlay (se mueve a la izquierda)
  timeline.to(overlayPanelRef.current, {
    xPercent: positions.overlaySlideXPercent,
    x: positions.overlayXOffset,
    ease,
    duration: duration.main,
  });

  // Ocultar formulario de login
  timeline.to(
    loginFormRef.current,
    {
      xPercent: positions.formSlideXPercent,
      opacity: opacity.hidden,
      display: "none",
      ease,
      duration: duration.fade,
    },
    0 // Comienza al mismo tiempo que overlay
  );

  // Mostrar formulario de signup
  timeline.to(
    signupFormRef.current,
    {
      xPercent: 100,
      opacity: opacity.visible,
      display: "flex",
      ease,
      duration: duration.fade,
    },
    `-=${duration.fade}` // Se solapa con la animación anterior
  );

  // Mostrar contenido de login en el overlay
  timeline.to(
    loginContentRef.current,
    {
      opacity: opacity.visible,
      xPercent: 100,
      x: positions.contentNegativeXOffset,
      ease,
      duration: duration.fade,
    },
    `-=${duration.fade}` // Se solapa con la animación anterior
  );

  // Ocultar contenido de signup en el overlay
  timeline.to(
    signupContentRef.current,
    {
      opacity: opacity.hidden,
      xPercent: 0,
      ease,
      duration: duration.fade,
    },
    0 // Comienza al mismo tiempo que overlay
  );

  return timeline;
}

// ==================== COMPONENT ====================
export function AuthContainer() {
  // ===== REFS =====
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayPanelRef = useRef<HTMLDivElement>(null!);
  const loginContentRef = useRef<HTMLDivElement>(null!);
  const signupContentRef = useRef<HTMLDivElement>(null!);
  const loginFormRef = useRef<HTMLFormElement>(null!);
  const signupFormRef = useRef<HTMLFormElement>(null!);
  const timelineRef = useRef<AuthTimeline>(null!);
  const currentModeRef = useRef<AuthMode>("login");

  // ===== FORM HOOKS =====
  const loginUserForm = useForm<User>({ mode: "onChange" });
  const signupUserForm = useForm<User>({ mode: "onChange" });

  // ===== GSAP SETUP =====
  useGSAP(
    () => {
      // Establecer estados iniciales
      gsap.set(loginContentRef.current, INITIAL_STATES.loginContent);
      gsap.set(signupContentRef.current, INITIAL_STATES.signupContent);
      gsap.set(loginFormRef.current, INITIAL_STATES.loginForm);
      gsap.set(signupFormRef.current, INITIAL_STATES.signupForm);

      // Crear timeline y almacenarlo en ref
      timelineRef.current = createAuthFormsTimeline({
        loginFormRef,
        signupFormRef,
        overlayPanelRef,
        loginContentRef,
        signupContentRef,
      });
    },
    {
      scope: containerRef,
      dependencies: [],
    }
  );

  // ===== HANDLERS =====
  /**
   * Alterna entre los modos de login y signup
   * Previene clicks múltiples durante la animación activa
   */
  const handleToggleForms = useCallback(() => {
    const timeline = timelineRef.current;

    // Prevenir clicks durante animación
    if (timeline.isActive()) {
      return;
    }

    // Actualizar modo actual
    const nextMode: AuthMode =
      currentModeRef.current === "login" ? "signup" : "login";
    currentModeRef.current = nextMode;

    // Ejecutar animación según el modo
    if (nextMode === "signup") {
      signupUserForm.reset();
      timeline.play(); // Avanzar a signup
    } else {
      loginUserForm.reset();
      timeline.reverse(); // Regresar a login
    }
  }, [loginUserForm, signupUserForm]);

  return (
    <div
      ref={containerRef}
      className="w-[920px] h-[580px] relative overflow-hidden font-sans bg-white rounded-3xl shadow-2xl"
    >
      <AuthForm
        mode="login"
        ref={loginFormRef}
        styles="pl-10 pr-5"
        useForm={loginUserForm}
      />

      <AuthForm
        mode="signup"
        ref={signupFormRef}
        useForm={signupUserForm}
        styles="pl-5 pr-10"
      />

      <AuthOverlayPanel ref={overlayPanelRef} />

      <AuthOverlayContent
        mode="login"
        styles="right-full"
        onToggle={handleToggleForms}
        ref={loginContentRef}
      />

      <AuthOverlayContent
        mode="signup"
        styles="left-full"
        onToggle={handleToggleForms}
        ref={signupContentRef}
      />
    </div>
  );
}

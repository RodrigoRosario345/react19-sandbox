import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP);

export interface UseModalOptions {
    onClose: () => void;
    autoCloseDelay?: number;
    shouldAnimate?: boolean;
}

interface UseModalReturn {
    backdropRef: React.RefObject<HTMLDivElement | null>;
    modalRef: React.RefObject<HTMLDivElement | null>;
    closeModal: () => void;
}

function createModalAnimation(elements: HTMLDivElement[]): GSAPTimeline {
    const timeline = gsap.timeline();

    elements.forEach((element, index) => {
        timeline.from(
            element,
            {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: "back.out(1.7)",
            },
            index * 0.05
        );
    });

    return timeline;
}

export function useModal(options: UseModalOptions): UseModalReturn {
    const { onClose, autoCloseDelay, shouldAnimate = true } = options;
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<GSAPTimeline | null>(null);

    const closeModal = useCallback(() => {
        const timeline = timelineRef.current;

        if (!timeline) {
            onClose();
            return;
        }

        // Prevenir múltiples clics durante animación
        if (timeline.isActive()) return;

        timeline.reverse();

        timeline.eventCallback("onReverseComplete", () => {
            onClose();
            timeline.eventCallback("onReverseComplete", null);
        });
    }, [onClose]);

    // Animación de entrada
    useGSAP(
        () => {
            if (!shouldAnimate || !modalRef.current || !backdropRef.current) return;

            const elements = [backdropRef.current, modalRef.current];
            timelineRef.current = createModalAnimation(elements);
        },
        { dependencies: [shouldAnimate], scope: modalRef }
    );

    // Auto-cierre opcional
    useEffect(() => {
        if (!autoCloseDelay) return;

        const timer = setTimeout(closeModal, autoCloseDelay);
        return () => clearTimeout(timer);
    }, [autoCloseDelay, closeModal]);

    // Cerrar con ESC
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [closeModal]);

    // Previene scroll del body
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return {
        backdropRef,
        modalRef,
        closeModal,
    };
}
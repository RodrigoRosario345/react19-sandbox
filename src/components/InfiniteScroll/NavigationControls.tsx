import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

export interface NavigationControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  buttonClassName?: string;
  disabled?: boolean;
}

/**
 * Componente de controles de navegación reutilizable
 * Permite personalizar labels, estilos y estado disabled
 */
export function NavigationControls({
  onNext,
  onPrevious,
  buttonClassName = "absolute top-6/12 -translate-y-6/12 cursor-pointer rounded-full shadow-[4px_3px_5px_rgba(0,0,0,0.5)] text-4xl text-white hover:text-white/70 hover:scale-105 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed z-100",
  disabled = false,
}: NavigationControlsProps) {
  return (
    <>
      <button
        onClick={onPrevious}
        className={`${buttonClassName} left-0 -translate-x-6/12`}
        aria-label="Previous item"
        disabled={disabled}
      >
        <FaCircleArrowLeft />
      </button>
      <button
        onClick={onNext}
        className={`${buttonClassName} right-0 translate-x-6/12`}
        aria-label="Next item"
        disabled={disabled}
      >
        <FaCircleArrowRight />
      </button>
    </>
  );
}

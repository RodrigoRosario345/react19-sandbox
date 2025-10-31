import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

export interface NavigationControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  className?: string;
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
  className = "absolute inset-0 flex items-center justify-center gap-28",
  buttonClassName = "cursor-pointer rounded-full shadow-[4px_3px_5px_rgba(0,0,0,0.5)] text-4xl text-white hover:text-white/70 hover:scale-105 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  disabled = false,
}: NavigationControlsProps) {
  return (
    <div className={className}>
      <button
        onClick={onPrevious}
        className={`${buttonClassName} mr-6`}
        aria-label="Previous item"
        disabled={disabled}
      >
        <FaCircleArrowLeft />
      </button>
      <button
        onClick={onNext}
        className={buttonClassName}
        aria-label="Next item"
        disabled={disabled}
      >
        <FaCircleArrowRight />
      </button>
    </div>
  );
}

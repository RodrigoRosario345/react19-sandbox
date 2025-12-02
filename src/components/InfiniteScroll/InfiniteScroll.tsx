import type { ReactNode } from "react";
import type { AnimateFunction } from "@/types/infiniteScroll";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { NavigationControls } from "./NavigationControls";

export interface InfiniteScrollProps<T> {
  // Datos
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;

  // Animación
  animateFunc: AnimateFunction<HTMLElement>;
  spacing?: number;
  initialSetup?: (items: HTMLElement[]) => void;

  // Configuración de ScrollTrigger
  startDistance?: string | number;
  endDistance?: string;
  showMarkers?: boolean;

  // Estilos y clases
  scrollContentClassName?: string;
  itemsWrapperClassName?: string;
  itemClassName?: string;
  scrollContainerClassName?: string;

  // Navegación
  showNavigation?: boolean;
  navigationButtonClassName?: string;

  // Callbacks opcionales
  onNext?: () => void;
  onPrevious?: () => void;
  onReady?: () => void;

  // Children adicionales (opcional)
  children?: ReactNode;
}

/**
 * Componente InfiniteScroll completamente reutilizable
 * Acepta cualquier tipo de datos y función de renderizado
 * Totalmente personalizable mediante props
 */
export function InfiniteScroll<T>({
  items,
  renderItem,
  animateFunc,
  spacing = 0.1,
  initialSetup,
  startDistance = 0,
  endDistance = "+=3000px",
  showMarkers = false,
  scrollContentClassName = "w-full h-full relative",
  itemsWrapperClassName = "w-[14rem] h-[20rem] relative top-1/2 left-1/2 -translate-1/2",
  itemClassName = "card",
  scrollContainerClassName = "h-[22rem] overflow-y-auto overflow-x-hidden no-scrollbar",
  showNavigation = true,
  navigationButtonClassName,
  onNext,
  onPrevious,
  children,
}: InfiniteScrollProps<T>) {
  const { scrollViewportRef, scrollContentRef, handleNext, handlePrevious, isReady } =
    useInfiniteScroll({
      spacing,
      animateFunc,
      itemSelector: `.${itemClassName}`,
      initialSetup,
      startDistance,
      endDistance,
      showMarkers,
    });

  // Ejecutar callback cuando esté listo
  // if (isReady && onReady) {
  //   onReady();
  // }

  const handleNextClick = () => {
    handleNext();
    onNext?.();
  };

  const handlePreviousClick = () => {
    handlePrevious();
    onPrevious?.();
  };

  return (
    <div className={scrollContainerClassName} ref={scrollViewportRef}>
      <div className={scrollContentClassName} ref={scrollContentRef}>
        <div className={itemsWrapperClassName}>
          {items.map((item, index) => (
            <div key={index} className={`${itemClassName} w-full h-[95%] rounded-2xl absolute top-[2.5%] left-0`}>
              {renderItem(item, index)}
            </div>
          ))}
          {showNavigation && (
            <NavigationControls
              onNext={handleNextClick}
              onPrevious={handlePreviousClick}
              buttonClassName={navigationButtonClassName}
              disabled={!isReady}
            />
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

export interface PlanetItemProps {
  children: ReactNode;
  frontClassName?: string;
  backClassName?: string;
  backContent?: ReactNode;
}

/**
 * Componente Card con efecto flip
 * Tiene un frente y reverso personalizables
 */
export function PlanetItem({
  children,
  frontClassName = "size-full bg-blue-800 rounded-2xl absolute inset-0 flex justify-center items-center text-3xl text-white cursor-all-scroll z-20 shadow-md shadow-blue-950",
  backClassName = "w-full h-[90%] absolute top-[5%] left-0 bg-amber-400 p-4 rounded-s-2xl z-10",
  backContent,
}: PlanetItemProps) {
  return (
    <>
      <div className={frontClassName}>{children}</div>
      <div className={backClassName}>
        {backContent || (
          <p className="text-base line-clamp-9">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Asperiores, blanditiis, accusantium hic iure earum sapiente,
            laudantium quae voluptatibus nam amet at ab eaque. Nulla tenetur
            voluptatibus quibusdam error temporibus reprehenderit.
          </p>
        )}
      </div>
    </>
  );
}

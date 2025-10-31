import { InfiniteScroll } from "@/components/InfiniteScroll";
import { PlanetItem } from "../PlanetItem/PlanetItem";
import { carruselInfiniteAnimation } from "@/utils/gsap";

interface Planet {
    id: number;
    name: string;
    description?: string;
}

const planetsData: Planet[] = [
  { id: 1, name: "Mercurio", description: "El planeta más cercano al sol" },
  { id: 2, name: "Venus", description: "El planeta más caliente" },
  { id: 3, name: "Tierra", description: "Nuestro hogar" },
  { id: 4, name: "Marte", description: "El planeta rojo" },
  { id: 5, name: "Júpiter", description: "El planeta más grande" },
  { id: 6, name: "Saturno", description: "El planeta de los anillos" },
  { id: 7, name: "Urano", description: "El planeta inclinado" },
];


/**
 * Contenedor de planetas usando el componente InfiniteScroll reutilizable
 * Completamente desacoplada de la lógica de animación
 */
export function PlanetList() {
    return (
        <>
            {
                planetsData.length === 0 ? (
                    <p className="mt-10 text-center text-2xl text-white">No hay planetas disponibles.</p>
                ) : (
                    <InfiniteScroll<Planet>
                        // Datos
                        items={planetsData}
                        renderItem={(item, index) => (
                            <PlanetItem>
                                <div className="text-center">
                                    <h1 className="text-6xl font-bold">{index + 1}</h1>
                                    <p className="text-4xl font-bold">{item.name}</p>
                                    {item.description && (
                                        <p className="text-sm mt-2 opacity-80">{item.description}</p>
                                    )}
                                </div>
                            </PlanetItem>
                        )}
                        // Animación
                        animateFunc={carruselInfiniteAnimation}
                        spacing={0.1}
                        showMarkers={false}
                        // Callbacks opcionales
                        onNext={() => console.log("Navegando al siguiente")}
                        onPrevious={() => console.log("Navegando al anterior")}
                        onReady={() => console.log("InfiniteScroll listo")}
                    />
                )
            }
        </>

    );
}

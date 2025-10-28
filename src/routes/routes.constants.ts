export const ROUTES = {
  HOME: "/",
  CHARACTERS: "/characters",
  PLANETS: "/planets",
  AUTH: "/auth",
  TASK: "/task",
  MOVIES: "/movies",
  // SAGAS: '/sagas',
  // TRANSFORMATIONS: '/transformations',
  // BATTLES: '/battles',
} as const;

export const ROUTE_METADATA = {
  [ROUTES.AUTH]: {
    title: "Autenticación",
    description:
      "Test de Iniciar sesión o regístrarse para acceder a contenido exclusivo",
    name: "auth",
  },
  [ROUTES.TASK]: {
    title: "Lista de Tareas",
    description: "Gestiona tu lista de tareas con nuestra aplicación de Tareas",
    name: "task",
  },
  [ROUTES.MOVIES]: {
    title: "Películas",
    description: "Explora la colección de películas del universo Dragon Ball",
    name: "movies",
  },
  [ROUTES.CHARACTERS]: {
    title: "Personajes",
    description: "Explora los personajes del universo Dragon Ball",
    name: "characters",
  },
  [ROUTES.PLANETS]: {
    title: "Planetas",
    description: "Descubre los planetas del universo Dragon Ball",
    name: "planets",
  },
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

export const ROUTES = {
  HOME: '/',
  CHARACTERS: '/characters',
  PLANETS: '/planets',
  AUTH: '/auth',
  TODO: '/todo',
  // SAGAS: '/sagas',
  // TRANSFORMATIONS: '/transformations',
  // BATTLES: '/battles',
} as const;


export const ROUTE_METADATA = {
  [ROUTES.AUTH]: {
    title: 'Autenticación',
    description: 'Test de Iniciar sesión o regístrarse para acceder a contenido exclusivo',
    name: 'auth',
  },
  [ROUTES.TODO] : {
    title: 'Lista de Tareas',
    description: 'Gestiona tu lista de tareas con nuestra aplicación de Todo',
    name: 'todo',
  },
  [ROUTES.CHARACTERS]: {
    title: 'Personajes',
    description: 'Explora los personajes del universo Dragon Ball',
    name: 'characters',
  },
  [ROUTES.PLANETS]: {
    title: 'Planetas',
    description: 'Descubre los planetas del universo Dragon Ball',
    name: 'planets',
  },
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
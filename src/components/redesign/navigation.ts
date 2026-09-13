/**
 * Navegación del prototipo de rediseño.
 * Las rutas /trabajo, /proyectos-propios, /perfil y /contacto son
 * PENDIENTES de desarrollo: hoy enlazan a marcadores "en construcción".
 */
export const redesignNavItems = [
  { label: "Inicio", href: "/" },
  { label: "Trabajo", href: "/trabajo" },
  { label: "Perfil", href: "/perfil" },
  { label: "Contacto", href: "/contacto" },
] as const

/**
 * Escenas de la portada, observadas por el HUD de "El encuadre".
 */
export const scenes = [
  { id: "escena-1", label: "Presentación" },
  { id: "escena-2", label: "Trabajo" },
  { id: "escena-3", label: "Método" },
  { id: "escena-4", label: "Mirada" },
  { id: "escena-5", label: "Índice" },
] as const

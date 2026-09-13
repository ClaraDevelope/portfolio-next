import type { FrameSection } from "../TravelFrame"

/**
 * Datos de contacto reales del portfolio y secciones de la página
 * /contacto para el marco conductor y los puntos de progreso.
 * La página mantiene la atmósfera oscura continua de la exportación.
 */
export const CONTACT_EMAIL = "claramanzano.dev@gmail.com"
export const LINKEDIN_URL = "https://linkedin.com/in/clara-manzano-corona"

export const contactoFrameSections: readonly FrameSection[] = [
  { id: "contacto-principal", tone: "dark" },
  { id: "contacto-cierre", tone: "dark" },
]

export const contactoDotSections = [
  { id: "contacto-principal", label: "Contacto" },
  { id: "contacto-cierre", label: "Cierre" },
] as const

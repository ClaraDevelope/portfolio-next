import type { FrameSection } from "../TravelFrame"

/**
 * Secciones de la página /perfil para el marco conductor y los puntos de
 * progreso. El cierre es una franja compacta (NavStrip) sin encuadre, por
 * lo que no forma parte del recorrido del marco. Ritmo visual: apertura
 * clara con declaración, trayectoria oscura con cuatro etapas (el marco
 * las recorre) y dinámica de equipo en sepia.
 */
export const profileFrameSections: readonly FrameSection[] = [
  { id: "perfil-apertura", tone: "light" },
  { id: "perfil-trayectoria", tone: "dark" },
  { id: "perfil-dinamica", tone: "light" },
]

export const profileDotSections = [
  { id: "perfil-apertura", label: "Apertura" },
  { id: "perfil-trayectoria", label: "Trayectoria" },
  { id: "perfil-dinamica", label: "Equipo" },
] as const

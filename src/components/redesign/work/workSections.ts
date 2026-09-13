import type { FrameSection } from "../TravelFrame"

/**
 * Secciones de la página /trabajo para el marco conductor y los puntos
 * de progreso. Orden: apertura, proyectos desde cero, aplicación interna
 * en producción, los tres capítulos (sistemas, recorrido, cartografía) y
 * el cierre técnico de tecnologías. La franja compacta final (NavStrip)
 * no tiene encuadre, por lo que no forma parte del recorrido del marco.
 * Ritmo visual: apertura clara, carbón con los proyectos, marfil con la
 * aplicación, berenjena con diagrama de conexiones, sepia con tira de
 * fotogramas, cartografía oscura con mapa luminoso y cierre oscuro con
 * etiquetas claras.
 */
export const workFrameSections: readonly FrameSection[] = [
  { id: "trabajo-apertura", tone: "light" },
  { id: "trabajo-proyectos", tone: "dark" },
  { id: "trabajo-aplicacion", tone: "light" },
  { id: "trabajo-sistemas", tone: "dark" },
  { id: "trabajo-recorrido", tone: "light" },
  { id: "trabajo-cartografiar", tone: "dark" },
  { id: "trabajo-tecnologias", tone: "dark" },
]

export const workDotSections = [
  { id: "trabajo-apertura", label: "Apertura" },
  { id: "trabajo-proyectos", label: "Proyectos" },
  { id: "trabajo-aplicacion", label: "Aplicación" },
  { id: "trabajo-sistemas", label: "Sistemas" },
  { id: "trabajo-recorrido", label: "Recorrido" },
  { id: "trabajo-cartografiar", label: "Cartografiar" },
  { id: "trabajo-tecnologias", label: "Tecnologías" },
] as const

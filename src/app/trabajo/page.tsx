import type { Metadata } from "next"
import EditorialNavbar from "@/components/redesign/EditorialNavbar"
import EditorialFooter from "@/components/redesign/EditorialFooter"
import TravelFrame from "@/components/redesign/TravelFrame"
import SceneDots from "@/components/redesign/SceneDots"
import { workFrameSections, workDotSections } from "@/components/redesign/work/workSections"
import WorkOpening from "@/components/redesign/work/WorkOpening"
import WorkSystems from "@/components/redesign/work/WorkSystems"
import WorkProcess from "@/components/redesign/work/WorkProcess"
import WorkCartography from "@/components/redesign/work/WorkCartography"
import WorkTechnologies from "@/components/redesign/work/WorkTechnologies"
import WorkProjects from "@/components/redesign/work/WorkProjects"
import WorkPlatform from "@/components/redesign/work/WorkPlatform"
import NavStrip from "@/components/redesign/NavStrip"

/**
 * Página de Trabajo del rediseño editorial: introducción, cuatro proyectos
 * desarrollados desde cero, la evolución de una aplicación en producción y
 * los capítulos (hacer que sistemas distintos se entiendan, convertir un
 * proceso en un recorrido y cartografiar para comprender), más el cierre
 * técnico de tecnologías. El marco conductor conecta el recorrido (intro →
 * bloques de proyectos → circuito de la plataforma → esquema de
 * integración → fotogramas → zona de zoom del mapa → retícula de
 * tecnologías), y el cierre es una franja compacta de navegación. Contenido
 * basado en evidencia real, anonimizado.
 */
export const metadata: Metadata = {
  title: "Trabajo | Clara Manzano Corona",
  description:
    "Proyectos desarrollados desde cero y evolución de aplicaciones internas: automatización, integración de sistemas, calidad de datos y cartografía aplicada.",
}

export default function TrabajoPage() {
  return (
    <>
      <a
        href="#contenido-principal"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-sm focus-visible:bg-flame-orange focus-visible:px-4 focus-visible:py-2 focus-visible:font-sans focus-visible:text-caption focus-visible:font-semibold focus-visible:uppercase focus-visible:tracking-wider focus-visible:text-rich-ink"
      >
        Saltar al contenido
      </a>
      <EditorialNavbar />
      <main id="contenido-principal" tabIndex={-1} className="focus:outline-none">
        <WorkOpening />
        <WorkProjects />
        <WorkPlatform />
        <WorkSystems />
        <WorkProcess />
        <WorkCartography />
        <WorkTechnologies />
        <NavStrip
          id="trabajo-continuidad"
          links={[
            { label: "Conocer mi perfil", href: "/perfil" },
            { label: "Escribirme", href: "/contacto" },
          ]}
        />
      </main>
      <EditorialFooter />
      <TravelFrame sections={workFrameSections} />
      <SceneDots sections={workDotSections} ariaLabel="Progreso de la página de trabajo" />
    </>
  )
}

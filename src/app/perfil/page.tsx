import type { Metadata } from "next"
import EditorialNavbar from "@/components/redesign/EditorialNavbar"
import EditorialFooter from "@/components/redesign/EditorialFooter"
import TravelFrame from "@/components/redesign/TravelFrame"
import SceneDots from "@/components/redesign/SceneDots"
import { profileFrameSections, profileDotSections } from "@/components/redesign/profile/profileSections"
import PerfilOpening from "@/components/redesign/profile/PerfilOpening"
import PerfilJourney from "@/components/redesign/profile/PerfilJourney"
import PerfilDynamics from "@/components/redesign/profile/PerfilDynamics"
import NavStrip from "@/components/redesign/NavStrip"

/**
 * Página de Perfil del rediseño editorial.
 * Reconstrucción de la exportación de Stitch adaptada a la arquitectura del
 * proyecto, con la trayectoria real (Educación Social, Cooperativa La Otra,
 * formación en programación e Ingenalia Telecom). Sin sección de fotografía
 * ni de proyectos propios. El marco conductor recorre: declaración →
 * etapas de la trayectoria → valores, y el cierre es una franja compacta
 * de navegación.
 */
export const metadata: Metadata = {
  title: "Perfil | Clara Manzano Corona",
  description:
    "Trayectoria de Clara Manzano Corona: de la Educación Social a la ingeniería de software, pasando por la gestión cooperativa y la formación en programación.",
}

export default function PerfilPage() {
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
        <PerfilOpening />
        <PerfilJourney />
        <PerfilDynamics />
        <NavStrip
          id="perfil-continuidad"
          links={[
            { label: "Ver mi trabajo", href: "/trabajo" },
            { label: "Escribirme", href: "/contacto" },
          ]}
        />
      </main>
      <EditorialFooter />
      <TravelFrame sections={profileFrameSections} />
      <SceneDots sections={profileDotSections} ariaLabel="Progreso de la página de perfil" />
    </>
  )
}

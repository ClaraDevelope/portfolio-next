import type { Metadata } from "next"
import EditorialNavbar from "@/components/redesign/EditorialNavbar"
import EditorialFooter from "@/components/redesign/EditorialFooter"
import TravelFrame from "@/components/redesign/TravelFrame"
import SceneDots from "@/components/redesign/SceneDots"
import { contactoFrameSections, contactoDotSections } from "@/components/redesign/contacto/contactoSections"
import ContactMain from "@/components/redesign/contacto/ContactMain"
import ContactClosing from "@/components/redesign/contacto/ContactClosing"

/**
 * Página de Contacto del rediseño editorial.
 * Reconstrucción de la exportación de Stitch adaptada a la arquitectura del
 * proyecto, con datos reales del portfolio (email y LinkedIn). El marco
 * conductor descansa sobre la tarjeta protagonista y la de cierre.
 */
export const metadata: Metadata = {
  title: "Contacto | Clara Manzano Corona",
  description:
    "Escribe a Clara Manzano Corona por email o encuéntrala en LinkedIn. Valladolid.",
}

export default function ContactoPage() {
  return (
    <>
      <a
        href="#contenido-principal"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-sm focus-visible:bg-flame-orange focus-visible:px-4 focus-visible:py-2 focus-visible:font-sans focus-visible:text-caption focus-visible:font-semibold focus-visible:uppercase focus-visible:tracking-wider focus-visible:text-rich-ink"
      >
        Saltar al contenido
      </a>
      <EditorialNavbar />
      <main id="contenido-principal" tabIndex={-1} className="relative focus:outline-none">
        {/* Atmósfera ambiental de la exportación (degradados difusos) */}
        <div className="relative w-full overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-midnight-wine/40 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 rounded-full bg-secondary-container/20 blur-[140px]"
          />
          <ContactMain />
          <ContactClosing />
        </div>
      </main>
      <EditorialFooter />
      <TravelFrame sections={contactoFrameSections} />
      <SceneDots sections={contactoDotSections} ariaLabel="Progreso de la página de contacto" />
    </>
  )
}

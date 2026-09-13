"use client"

import { useEffect } from "react"
import EditorialNavbar from "@/components/redesign/EditorialNavbar"
import EditorialFooter from "@/components/redesign/EditorialFooter"
import TravelFrame from "@/components/redesign/TravelFrame"
import SceneDots from "@/components/redesign/SceneDots"
import SceneIntro from "@/components/redesign/scenes/SceneIntro"
import SceneWork from "@/components/redesign/scenes/SceneWork"
import SceneMethod from "@/components/redesign/scenes/SceneMethod"
import SceneMirada from "@/components/redesign/scenes/SceneMirada"
import ScenePortals from "@/components/redesign/scenes/ScenePortals"

/**
 * Portada del rediseño editorial (prototipo).
 * Los componentes del portfolio anterior se conservan en @/components
 * (hero, experience, projects, etc.) para reactivarlos si hace falta.
 */
export default function Page() {
  useEffect(() => {
    // Registro de visitas del portfolio (funcionalidad de producción documentada
    // en /privacy-policy). El servicio solo está disponible cuando se configura
    // NEXT_PUBLIC_BACKEND_URL en el despliegue; sin la variable (desarrollo
    // local) no se realiza la petición para no ensuciar la consola.
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    if (!backendUrl) return

    const urlParams = new URLSearchParams(window.location.search)
    const sourceParam = urlParams.get("source")

    const referrer = document.referrer
    const hostnameFromReferrer = referrer ? new URL(referrer).hostname : null

    const source = sourceParam || hostnameFromReferrer || "direct"

    fetch(`${backendUrl}/api?source=${source}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => console.log("Visita registrada:", data))
      .catch((err) => console.error("Error registrando visita:", err))
  }, [])

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
        <SceneIntro />
        <SceneWork />
        <SceneMethod />
        <SceneMirada />
        <ScenePortals />
      </main>
      <EditorialFooter />
      <TravelFrame />
      <SceneDots />
    </>
  )
}

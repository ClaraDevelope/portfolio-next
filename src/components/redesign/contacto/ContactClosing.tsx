import Link from "next/link"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"

/**
 * /contacto — Cierre.
 * Reconstrucción de la sección de cierre de la exportación de Stitch:
 * despedida y enlaces directos a Inicio, Trabajo y Perfil. La tarjeta de
 * cierre es el objetivo final del marco conductor.
 */
export default function ContactClosing() {
  return (
    <section
      id="contacto-cierre"
      aria-labelledby="titulo-contacto-cierre"
      className="relative w-full scroll-mt-28 px-margin-mobile pb-space-xl text-on-surface md:px-margin-tablet lg:px-margin"
    >
      <div
        data-frame-target
        className="mx-auto w-full max-w-5xl rounded-xl bg-surface-container-low/50 p-space-lg md:p-space-xl"
      >
        <div className="flex flex-col justify-between gap-space-lg md:flex-row md:items-center">
          <div className="max-w-md space-y-space-xs">
            <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-outline">
              Cierre de cuaderno
            </span>
            <p className="font-serif text-headline-sm font-normal text-on-surface">
              Gracias por tu tiempo y lectura.
            </p>
            <p className="font-sans text-caption text-on-surface-variant">
              Puedes seguir explorando mi trabajo y mi trayectoria, o volver al inicio.
            </p>
          </div>

          <nav
            aria-label="Navegación desde el contacto"
            className="flex flex-col items-start gap-space-md sm:flex-row sm:items-center"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-space-xs py-1 font-sans text-label-technical font-semibold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange rounded-sm"
            >
              <ArrowLeft
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Volver a Inicio
            </Link>
            <span aria-hidden="true" className="hidden text-outline-variant sm:inline">
              ·
            </span>
            <Link
              href="/trabajo"
              className="group inline-flex items-center gap-space-xs py-1 font-sans text-label-technical font-semibold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-flame-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange rounded-sm"
            >
              Ver Trabajo
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <span aria-hidden="true" className="hidden text-outline-variant sm:inline">
              ·
            </span>
            <Link
              href="/perfil"
              className="group inline-flex items-center gap-space-xs py-1 font-sans text-label-technical font-semibold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange rounded-sm"
            >
              Conocer mi Perfil
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </nav>
        </div>
      </div>
    </section>
  )
}

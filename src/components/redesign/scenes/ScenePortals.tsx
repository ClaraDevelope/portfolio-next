import Link from "next/link"
import { ArrowRight } from "lucide-react"

/**
 * Escena 05 — Puertas al resto de la web (carboncillo con acento coral).
 * Reconstrucción de la ESCENA 5 de Stitch con contenido revisado:
 * tres secciones (Trabajo, Perfil, Contacto), tono amable y sin
 * ofrecimientos comerciales.
 *
 * Las rutas enlazadas están PENDIENTES de desarrollo.
 */
const portals = [
  {
    index: "01 / Portafolio",
    title: "Trabajo",
    description: "Experiencia y casos profesionales.",
    href: "/trabajo",
    action: "Ver experiencia",
  },
  {
    index: "02 / Trayectoria",
    title: "Perfil",
    description: "Trayectoria y forma de trabajar.",
    href: "/perfil",
    action: "Conocer más",
  },
  {
    index: "03 / Diálogo",
    title: "Contacto",
    description: "Una forma directa de escribirme.",
    href: "/contacto",
    action: "Escribirme",
  },
] as const

export default function ScenePortals() {
  return (
    <section
      id="escena-5"
      aria-labelledby="titulo-escena-5"
      className="relative w-full scroll-mt-28 bg-rich-ink py-space-xl text-on-surface transition-colors duration-700 lg:py-32"
    >
      <div className="relative mx-auto w-full max-w-7xl space-y-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
          <div className="space-y-space-xs">
            <div className="flex items-center gap-space-sm font-sans text-label-technical font-semibold uppercase tracking-widest text-flame-orange">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame-orange" />
              <span>Escena 05 · Navegación</span>
            </div>
            <h2
              id="titulo-escena-5"
              className="font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] lg:text-headline-xl"
            >
              Continuar la <span className="font-light italic text-primary">lectura</span>
            </h2>
          </div>
          <p className="max-w-sm font-sans text-body-md text-on-surface-variant">
            El resto del portfolio, en tres paradas.
          </p>
        </div>

        {/* Objetivo final del marco conductor: se abre alrededor del índice
            completo y se desvanece para dejar paso a las puertas. */}
        <div data-frame-target className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portals.map(({ index, title, description, href, action }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex min-h-[300px] flex-col justify-between bg-surface-container-low p-space-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-surface-container focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange"
            >
              <span
                aria-hidden="true"
                className="absolute right-2 top-2 font-mono text-xs text-on-surface-variant/40 transition-colors group-hover:text-flame-orange"
              >
                +
              </span>
              <div>
                <div className="mb-2 font-sans text-label-technical font-semibold uppercase tracking-widest text-flame-orange">
                  {index}
                </div>
                <h3 className="font-serif text-headline-sm font-medium text-on-surface transition-colors group-hover:text-flame-orange">
                  {title}
                </h3>
                <p className="mt-2 font-sans text-body-md leading-relaxed text-on-surface-variant">
                  {description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 text-on-surface-variant transition-colors group-hover:text-on-surface">
                <span className="font-sans text-label-technical font-semibold uppercase tracking-widest">
                  {action}
                </span>
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-6 bg-surface-container-lowest p-space-lg shadow-2xl sm:flex-row">
          <div className="flex items-center gap-space-md">
            <span aria-hidden="true" className="h-3 w-3 rounded-full bg-tertiary" />
            <div>
              <p className="font-sans text-body-md font-medium text-on-surface">¿Hablamos?</p>
              <p className="font-sans text-caption text-on-surface-variant">
                Valladolid, España · Email o LinkedIn
              </p>
            </div>
          </div>
          <a
            href="mailto:claramanzanocorona@gmail.com"
            className="bg-flame-orange px-space-md py-space-sm font-sans text-caption font-semibold uppercase tracking-wider text-rich-ink shadow transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange"
          >
            Escribirme
          </a>
        </div>
      </div>
    </section>
  )
}

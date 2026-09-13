import { ArrowDown, FileDown } from "lucide-react"
import PortraitFrame from "../PortraitFrame"

/**
 * Escena 01 — Presentación (marfil luminoso).
 * Reconstrucción de la ESCENA 1 de Stitch con contenido revisado
 * (tono artístico y sencillo, datos reales).
 *
 * El marco conductor nace aquí: `data-frame-target` señala la banda que
 * encuadra el rostro. El retrato permanece fijo (sticky) mientras se lee
 * la columna tipográfica.
 */
export default function SceneIntro() {
  return (
    <section
      id="escena-1"
      aria-labelledby="titulo-escena-1"
      className="relative w-full overflow-hidden bg-paper-dim py-space-xl text-rich-ink lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#121113_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-margin-mobile pt-16 md:px-margin-tablet lg:px-margin lg:pt-20">
        <div className="flex items-center justify-between pb-space-lg">
          <div className="flex items-center gap-space-sm font-sans text-label-technical font-semibold uppercase tracking-widest text-rich-ink/70">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-flame-orange" />
            <span>Cuaderno 01 — Inicio</span>
          </div>
          <span className="hidden font-sans text-label-technical font-semibold uppercase tracking-widest text-rich-ink/50 sm:inline-block">
            Valladolid, España
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="flex flex-col justify-center gap-space-lg lg:col-span-7 lg:py-10">
            <div className="space-y-space-xs">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-flame-orange" />
                <p className="font-sans text-caption font-semibold uppercase tracking-widest text-rich-ink/80">
                  Desarrolladora web y de software
                </p>
              </div>
              <h1
                id="titulo-escena-1"
                className="select-none font-serif text-[3rem] leading-[1.08] tracking-[-0.02em] sm:text-[3.25rem] lg:text-display-hero"
              >
                Clara
                <br />
                <span className="font-light italic text-rich-ink/90">Manzano</span>
                <br />
                Corona
              </h1>
            </div>

            <p className="font-sans text-body-lead font-medium text-rich-ink">
              Aprendí a leer contextos antes que código.
            </p>
            <p className="max-w-xl font-sans text-body-lead leading-relaxed text-rich-ink/80">
              Hoy desarrollo aplicaciones, automatizaciones y servicios prestando atención a las
              personas, los procesos y los datos que necesitan encajar para que algo funcione.
            </p>

            <div className="flex flex-wrap items-center gap-space-lg pt-space-md">
              <a
                href="#escena-2"
                className="group inline-flex items-center gap-space-sm font-sans text-caption uppercase tracking-wider text-rich-ink transition-colors duration-200 hover:text-flame-orange-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange rounded-sm"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-rich-ink/5 transition-all duration-300 group-hover:bg-flame-orange group-hover:text-paper-dim"
                >
                  <ArrowDown size={14} />
                </span>
                Ver mi trabajo
              </a>
              <span aria-hidden="true" className="hidden font-sans text-caption text-rich-ink/30 sm:inline">
                ·
              </span>
              <a
                href="/CV_Clara_Manzano_Corona.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-space-sm font-sans text-caption uppercase tracking-wider text-rich-ink transition-colors duration-200 hover:text-flame-orange-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange rounded-sm"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-rich-ink/5 transition-all duration-300 group-hover:bg-flame-orange group-hover:text-paper-dim"
                >
                  <FileDown size={14} />
                </span>
                Descargar CV
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
            <PortraitFrame />
          </div>
        </div>
      </div>
    </section>
  )
}

import { FileDown } from "lucide-react"

/**
 * /perfil — Apertura (marfil).
 * Titular, subtítulo editorial y párrafo introductorio integrado (sin
 * formato de cita ni testimonio). El párrafo es el primer objetivo del
 * marco conductor. Datos reales: educación social (2014–2018), gestión
 * cooperativa de una librería-café (2018–2024) y desarrollo de software.
 */
export default function PerfilOpening() {
  return (
    <section
      id="perfil-apertura"
      aria-labelledby="titulo-perfil-apertura"
      className="w-full bg-paper-dim py-space-xl text-rich-ink"
    >
      <div className="mx-auto w-full max-w-7xl px-margin-mobile pt-16 md:px-margin-tablet lg:px-margin lg:pt-24">
        <div className="flex flex-col items-start justify-between gap-space-xs border-b border-rich-ink/10 pb-space-lg text-rich-ink/70 sm:flex-row sm:items-center">
          <div className="flex items-center gap-space-xs font-sans text-label-technical font-semibold uppercase tracking-widest">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-flame-orange" />
            <span className="text-rich-ink">Cuaderno 03</span>
            <span aria-hidden="true" className="text-rich-ink/40">—</span>
            <span>Perfil y trayectoria</span>
          </div>
          <div className="flex items-center gap-space-sm font-sans text-label-technical font-semibold uppercase tracking-widest text-rich-ink/60">
            <span>Valladolid</span>
          </div>
        </div>

        <div className="max-w-5xl space-y-space-md pt-space-xl pb-space-lg">
          <h1
            id="titulo-perfil-apertura"
            className="font-serif text-[3.25rem] leading-none tracking-tight text-rich-ink md:text-[5rem] lg:text-[6.5rem]"
          >
            Perfil<span className="text-flame-orange">.</span>
          </h1>
          <p className="max-w-xl font-serif text-[1.75rem] font-light leading-snug text-rich-ink/90 italic md:text-[2.25rem] lg:text-headline-lg">
            Entender el contexto antes de escribir una línea de código.
          </p>

          {/* Objetivo inicial del marco conductor: párrafo introductorio.
              El padding (24 px) aporta el aire interior del encuadre y
              separa el bloque del botón "Descargar CV". */}
          <p
            data-frame-target
            className="max-w-2xl p-6 font-sans text-body-lead text-rich-ink/85"
          >
            Vengo de la educación social y de la gestión de una librería-café en cooperativa.
            El paso al desarrollo de software no fue una ruptura, sino un cambio de
            herramienta: observar procesos, detectar fricciones reales y ordenar la
            información para que sea útil a las personas.
          </p>

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
    </section>
  )
}

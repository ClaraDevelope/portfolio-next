import Link from "next/link"
import { ArrowRight } from "lucide-react"

/**
 * Escena 02 — Trabajo profesional (berenjena profunda).
 * Reconstrucción de la ESCENA 2 de Stitch con contenido revisado:
 * tono artístico y sencillo, sin jerga técnica ni métricas inventadas.
 */
const chips = ["Automatización", "Integración de datos", "Aplicaciones web", "Bases de datos"]

export default function SceneWork() {
  return (
    <section
      id="escena-2"
      aria-labelledby="titulo-escena-2"
      className="relative w-full scroll-mt-28 bg-primary-container py-space-xl text-on-surface transition-colors duration-700 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-midnight-wine/50 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl space-y-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="grid grid-cols-1 items-end gap-space-lg lg:grid-cols-12">
          <div className="space-y-space-xs lg:col-span-8">
            <div className="flex items-center gap-space-sm font-sans text-label-technical font-semibold uppercase tracking-widest text-tertiary">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame-orange" />
              <span>Escena 02 · La parte que no se ve</span>
            </div>
            <h2
              id="titulo-escena-2"
              className="font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] lg:text-headline-xl"
            >
              La técnica como{" "}
              <span className="font-light italic text-primary">artesanía de lo invisible</span>.
            </h2>
          </div>
          <div className="flex lg:col-span-4 lg:justify-end">
            <Link
              href="/trabajo"
              className="inline-flex items-center gap-space-sm bg-rich-ink px-space-md py-space-sm font-sans text-caption uppercase tracking-wider text-on-surface shadow-lg transition-all duration-300 hover:bg-flame-orange hover:text-rich-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange"
            >
              <span>Ver mi trabajo</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Objetivo del marco conductor en esta escena: el visor del pipeline.
            El borde y las retículas las dibuja el marco persistente. */}
        <div
          data-frame-target
          className="relative bg-surface-container-lowest p-space-md shadow-2xl lg:p-space-xl"
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="relative overflow-hidden rounded-sm bg-surface-container p-6 shadow-inner lg:col-span-7">
              <div className="flex items-center justify-between pb-4">
                <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-on-surface-variant">
                  Cómo fluyen los datos
                </span>
                <span className="flex items-center gap-1.5 font-sans text-label-technical font-semibold uppercase tracking-widest text-tertiary">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-tertiary" />
                  Esquema
                </span>
              </div>
              {/* Diagrama decorativo: reconstrucción del esquema SVG de Stitch */}
              <svg
                aria-hidden="true"
                className="h-44 w-full text-primary"
                fill="none"
                viewBox="0 0 600 160"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.08" x1="40" x2="560" y1="20" y2="20" />
                <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.08" x1="40" x2="560" y1="80" y2="80" />
                <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.08" x1="40" x2="560" y1="140" y2="140" />
                <path d="M70 80 H 220" stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="1.5" />
                <path d="M220 80 Q 250 80 270 45 T 320 45" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
                <path d="M220 80 Q 250 80 270 115 T 320 115" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
                <path d="M370 45 Q 410 45 440 80" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
                <path d="M370 115 Q 410 115 440 80" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
                <path className="animate-pulse" d="M440 80 H 530" stroke="currentColor" strokeDasharray="6 2" strokeWidth="2" />
                <g>
                  <rect fill="#221226" height="40" rx="2" stroke="#FF6B4A" strokeWidth="1.5" width="40" x="30" y="60" />
                  <text fill="#e4e2df" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600" textAnchor="middle" x="50" y="85">
                    DATOS
                  </text>
                </g>
                <g>
                  <circle cx="220" cy="80" fill="#1b1c1a" r="14" stroke="#d4c1d5" strokeWidth="1.5" />
                  <circle cx="220" cy="80" fill="#FF6B4A" r="5" />
                </g>
                <g>
                  <rect fill="#2a2a28" height="34" rx="2" stroke="#d4c1d5" strokeWidth="1" width="56" x="320" y="28" />
                  <text fill="#e4e2df" fontFamily="Plus Jakarta Sans" fontSize="9" textAnchor="middle" x="348" y="49">
                    ORDENA
                  </text>
                </g>
                <g>
                  <rect fill="#2a2a28" height="34" rx="2" stroke="#d4c1d5" strokeWidth="1" width="56" x="320" y="98" />
                  <text fill="#e4e2df" fontFamily="Plus Jakarta Sans" fontSize="9" textAnchor="middle" x="348" y="119">
                    REVISA
                  </text>
                </g>
                <g>
                  <circle cx="440" cy="80" fill="#1b1c1a" r="14" stroke="#b7ccba" strokeWidth="1.5" />
                  <text fill="#b7ccba" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="600" textAnchor="middle" x="440" y="84">
                    Y
                  </text>
                </g>
                <g>
                  <rect fill="#FF6B4A" height="40" rx="2" width="48" x="520" y="60" />
                  <text fill="#121113" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" textAnchor="middle" x="544" y="84">
                    LISTO
                  </text>
                </g>
              </svg>

              <div className="grid grid-cols-3 gap-2 pt-3 text-center font-sans text-label-technical font-semibold uppercase tracking-widest text-on-surface-variant/80">
                <div className="bg-surface-container-high py-1">Menos repeticiones</div>
                <div className="bg-surface-container-high py-1">Datos ordenados</div>
                <div className="bg-surface-container-high py-1 text-tertiary">Sistemas conectados</div>
              </div>
            </div>

            <div className="space-y-space-md text-on-surface-variant lg:col-span-5">
              <p className="font-sans text-body-lead leading-relaxed text-on-surface">
                Trabajo en la parte que no siempre se ve: allí donde los datos encuentran un
                orden, los procesos dejan de repetirse y sistemas distintos tienen que
                entenderse.
              </p>
              <p className="font-sans text-body-md leading-normal text-on-surface-variant/90">
                Cuando todo encaja, la complejidad deja de ocupar el primer plano.
              </p>
              <div className="flex flex-wrap gap-2 pt-space-xs">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-sm bg-surface-container px-3 py-1 font-sans text-label-technical font-semibold uppercase tracking-wider text-on-surface"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * /trabajo — Capítulo 01: Hacer que sistemas distintos se entiendan.
 * Diagrama de conexiones (no una cuadrícula): fuentes variadas —portales sin
 * API, registros públicos, hojas de datos— que pasan por servicios que
 * extraen, normalizan y validan, y acaban en la base de datos que usan las
 * aplicaciones. Incluye el registro de errores como parte del flujo.
 * Basado en evidencia real, presentado de forma anónima e ilustrativa.
 */
export default function WorkSystems() {
  return (
    <section
      id="trabajo-sistemas"
      aria-labelledby="titulo-trabajo-sistemas"
      className="w-full scroll-mt-28 bg-primary-container py-20 text-on-surface md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-4xl pb-space-xl">
          <div className="flex items-center gap-space-xs pb-space-xs">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-flame-orange" />
            <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-flame-orange">
              Capítulo 01 · Integraciones
            </span>
          </div>
          <h2
            id="titulo-trabajo-sistemas"
            className="font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-on-surface lg:text-headline-xl"
          >
            Hacer que sistemas distintos se{" "}
            <span className="font-light italic text-primary">entiendan</span>
          </h2>
          <p className="max-w-3xl pt-space-sm font-sans text-body-lead text-on-surface/90">
            Cada sistema guarda la información a su manera. Mi trabajo está en el medio:
            extraer, normalizar y dejar los datos listos para que las aplicaciones los usen
            con confianza. Si algo falla, queda anotado y el flujo puede continuar.
          </p>
        </div>

        {/* Objetivo del marco conductor: el diagrama de conexiones */}
        <div
          data-frame-target
          className="border border-outline-variant/30 bg-surface-container-lowest p-space-md shadow-xl md:p-space-lg lg:mx-auto lg:w-[70%]"
        >
          <div className="flex flex-col items-start justify-between gap-space-xs pb-space-sm text-on-surface-variant md:flex-row md:items-center">
            <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-on-surface">
              Esquema de integración
            </span>
            <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-tertiary">
              Flujo y excepciones
            </span>
          </div>

          <svg
            aria-hidden="true"
            className="h-auto w-full"
            fill="none"
            viewBox="0 0 900 430"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Conexiones fuentes → extractor */}
            <path d="M 235 78 C 300 78 320 110 380 112" stroke="#d4c1d5" strokeDasharray="4 4" strokeOpacity="0.5" strokeWidth="1.5" />
            <path d="M 235 213 C 300 213 320 118 380 118" stroke="#d4c1d5" strokeDasharray="4 4" strokeOpacity="0.5" strokeWidth="1.5" />
            <path d="M 235 348 C 300 348 320 125 380 125" stroke="#d4c1d5" strokeDasharray="4 4" strokeOpacity="0.5" strokeWidth="1.5" />
            {/* Extractor → Normaliza → Valida */}
            <path className="animate-pulse" d="M 460 140 C 460 165 460 170 460 195" stroke="#FF6B4A" strokeDasharray="6 2" strokeWidth="2" />
            <path className="animate-pulse" d="M 460 250 C 460 275 460 280 460 305" stroke="#FF6B4A" strokeDasharray="6 2" strokeWidth="2" />
            {/* Valida → Base de datos */}
            <path d="M 540 335 C 610 335 640 190 700 180" stroke="#b7ccba" strokeOpacity="0.7" strokeWidth="1.5" />
            {/* Base de datos → Aplicaciones */}
            <path className="animate-pulse" d="M 790 215 C 790 245 790 250 790 275" stroke="#FF6B4A" strokeDasharray="6 2" strokeWidth="2" />
            {/* Valida → Registro de errores */}
            <path d="M 540 360 C 600 390 640 395 690 395" stroke="#968e95" strokeDasharray="3 4" strokeWidth="1.5" />

            {/* Fuentes */}
            <g>
              <rect fill="#1f201e" height="56" rx="2" stroke="#d4c1d5" strokeWidth="1" width="175" x="60" y="50" />
              <text fill="#e4e2df" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600" letterSpacing="1.5" textAnchor="middle" x="147" y="74">
                PORTAL SIN API
              </text>
              <text fill="#6f8373" fontFamily="Plus Jakarta Sans" fontSize="8" textAnchor="middle" x="147" y="92">
                navegación automatizada
              </text>
            </g>
            <g>
              <rect fill="#1f201e" height="56" rx="2" stroke="#d4c1d5" strokeWidth="1" width="175" x="60" y="185" />
              <text fill="#e4e2df" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600" letterSpacing="1.5" textAnchor="middle" x="147" y="209">
                REGISTRO PÚBLICO
              </text>
              <text fill="#6f8373" fontFamily="Plus Jakarta Sans" fontSize="8" textAnchor="middle" x="147" y="227">
                consulta de datos
              </text>
            </g>
            <g>
              <rect fill="#1f201e" height="56" rx="2" stroke="#d4c1d5" strokeWidth="1" width="175" x="60" y="320" />
              <text fill="#e4e2df" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600" letterSpacing="1.5" textAnchor="middle" x="147" y="344">
                HOJA DE DATOS
              </text>
              <text fill="#6f8373" fontFamily="Plus Jakarta Sans" fontSize="8" textAnchor="middle" x="147" y="362">
                carga por lotes
              </text>
            </g>

            {/* Servicios */}
            <g>
              <rect fill="#221226" height="54" rx="2" stroke="#FF6B4A" strokeWidth="1.5" width="160" x="380" y="86" />
              <text fill="#e4e2df" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600" letterSpacing="1.5" textAnchor="middle" x="460" y="118">
                EXTRAE
              </text>
            </g>
            <g>
              <rect fill="#221226" height="54" rx="2" stroke="#d4c1d5" strokeWidth="1.5" width="160" x="380" y="196" />
              <text fill="#e4e2df" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600" letterSpacing="1.5" textAnchor="middle" x="460" y="228">
                NORMALIZA
              </text>
            </g>
            <g>
              <rect fill="#221226" height="54" rx="2" stroke="#b7ccba" strokeWidth="1.5" width="160" x="380" y="306" />
              <text fill="#e4e2df" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600" letterSpacing="1.5" textAnchor="middle" x="460" y="338">
                VALIDA
              </text>
            </g>

            {/* Base de datos y aplicaciones */}
            <g>
              <rect fill="#1f201e" height="60" rx="2" stroke="#b7ccba" strokeWidth="1.5" width="180" x="700" y="150" />
              <text fill="#e4e2df" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600" letterSpacing="1.5" textAnchor="middle" x="790" y="177">
                BASE DE DATOS
              </text>
              <text fill="#6f8373" fontFamily="Plus Jakarta Sans" fontSize="8" textAnchor="middle" x="790" y="195">
                datos coherentes
              </text>
            </g>
            <g>
              <rect fill="#FF6B4A" height="60" rx="2" width="180" x="700" y="278" />
              <text fill="#121113" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" letterSpacing="1.5" textAnchor="middle" x="790" y="305">
                APLICACIONES
              </text>
              <text fill="#121113" fillOpacity="0.7" fontFamily="Plus Jakarta Sans" fontSize="8" textAnchor="middle" x="790" y="323">
                internas, para el equipo
              </text>
            </g>

            {/* Registro de errores */}
            <g>
              <rect fill="#1f201e" height="42" rx="2" stroke="#968e95" strokeDasharray="4 3" strokeWidth="1" width="180" x="690" y="374" />
              <text fill="#cdc4cb" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="600" letterSpacing="1.5" textAnchor="middle" x="780" y="392">
                REGISTRO DE ERRORES
              </text>
              <text fill="#6f8373" fontFamily="Plus Jakarta Sans" fontSize="8" textAnchor="middle" x="780" y="407">
                si algo falla, queda anotado
              </text>
            </g>
          </svg>
        </div>

        <div className="flex flex-col items-start justify-between gap-space-xs pt-space-md sm:flex-row sm:items-center">
          <p className="font-sans text-caption text-on-surface-variant/70">
            Del dato en bruto al dato en el que se puede confiar.
          </p>
          <p className="font-sans text-label-technical font-semibold uppercase tracking-widest text-on-surface-variant/80">
            Node.js · Express · Supabase · PostgreSQL
          </p>
        </div>
      </div>
    </section>
  )
}

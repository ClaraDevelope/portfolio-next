/**
 * /trabajo — Capítulo 02: Convertir un proceso en un recorrido.
 * Composición de tira de cine (perforaciones y fotogramas) en lugar de una
 * cuadrícula de tarjetas: la información entra, se comprueba, se transforma
 * y produce un documento o resultado. Los cuatro fotogramas son objetivos
 * del marco conductor, que los recorre en secuencia.
 */
const frames = [
  {
    id: "F.01",
    tag: "Entra",
    text: "La información llega de una fuente: un archivo, un formulario o un portal.",
  },
  {
    id: "F.02",
    tag: "Se comprueba",
    text: "Se valida contra reglas: formatos, campos obligatorios y duplicados.",
  },
  {
    id: "F.03",
    tag: "Se transforma",
    text: "Se normaliza y se adapta al modelo de datos que usan las aplicaciones.",
  },
  {
    id: "F.04",
    tag: "Sale un resultado",
    text: "Se genera un documento o queda registrada y lista para usar.",
  },
]

function SprocketRow() {
  return (
    <div aria-hidden="true" className="flex justify-between bg-rich-ink px-4 py-2">
      {Array.from({ length: 14 }).map((_, index) => (
        <span key={index} className="h-2.5 w-4 rounded-[2px] bg-paper-dim/90" />
      ))}
    </div>
  )
}

export default function WorkProcess() {
  return (
    <section
      id="trabajo-recorrido"
      aria-labelledby="titulo-trabajo-recorrido"
      className="w-full scroll-mt-28 bg-film-sepia py-20 text-rich-ink md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-4xl pb-space-xl">
          <div className="flex items-center gap-space-xs pb-space-xs">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-flame-orange" />
            <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-flame-orange-deep">
              Capítulo 02 · Automatización
            </span>
          </div>
          <h2
            id="titulo-trabajo-recorrido"
            className="font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-rich-ink lg:text-headline-xl"
          >
            Convertir un proceso en un{" "}
            <span className="font-light italic text-rich-ink/80">recorrido</span>
          </h2>
          <p className="max-w-3xl pt-space-sm font-sans text-body-lead text-rich-ink/85">
            Muchos pasos repetitivos pueden automatizarse para reducir tareas manuales, errores
            y tiempos de gestión.
          </p>
        </div>

        {/* Tira de fotogramas: cada fotograma es un paso del proceso */}
        <div className="shadow-2xl">
          <SprocketRow />
          <div className="grid grid-cols-1 gap-1 border-x border-rich-ink bg-rich-ink md:grid-cols-4">
            {frames.map(({ id, tag, text }) => (
              <figure
                key={id}
                data-frame-target
                className="relative flex min-h-[220px] flex-col justify-between bg-surface-container-low p-space-md"
              >
                <div className="flex items-center justify-between pb-space-sm">
                  <span className="font-mono text-sm text-flame-orange">{id}</span>
                  <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-tertiary">
                    {tag}
                  </span>
                </div>
                <blockquote className="font-sans text-body-md leading-relaxed text-paper-dim/80">
                  {text}
                </blockquote>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-3 -right-2 select-none font-serif text-[4.5rem] font-light italic leading-none text-paper-dim/10"
                >
                  {id.slice(-2)}
                </span>
              </figure>
            ))}
          </div>
          <SprocketRow />
        </div>

        <div className="flex flex-col items-start justify-between gap-space-xs pt-space-md sm:flex-row sm:items-center">
          <p className="font-sans text-caption text-rich-ink/60">
            De datos sueltos a documentos listos, sin pasos repetitivos en medio.
          </p>
          <p className="font-sans text-label-technical font-semibold uppercase tracking-widest text-rich-ink/60">
            TypeScript · Python · Plantillas y documentos
          </p>
        </div>
      </div>
    </section>
  )
}

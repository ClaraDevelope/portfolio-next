/**
 * Escena 03 — Forma de trabajar (marfil / tiza).
 * Reconstrucción de la ESCENA 3 de Stitch con contenido revisado:
 * cuatro pasos sencillos, tono amable y sin jerga.
 */
const layers = [
  {
    number: "01",
    title: "Escuchar",
    description: "Entender la necesidad.",
  },
  {
    number: "02",
    title: "Observar",
    description: "Conocer el proceso actual.",
  },
  {
    number: "03",
    title: "Construir",
    description: "Desarrollar una solución que encaje.",
  },
  {
    number: "04",
    title: "Comprobar",
    description: "Verificar que funciona y puede mantenerse.",
  },
]

export default function SceneMethod() {
  return (
    <section
      id="escena-3"
      aria-labelledby="titulo-escena-3"
      className="relative w-full scroll-mt-28 bg-paper-dim py-space-xl text-rich-ink transition-colors duration-700 lg:py-32"
    >
      <div className="relative mx-auto w-full max-w-7xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-3xl space-y-space-xs pb-space-xl">
          <div className="flex items-center gap-space-sm font-sans text-label-technical font-semibold uppercase tracking-widest text-rich-ink/70">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame-orange" />
            <span>Escena 03 · Cómo trabajo</span>
          </div>
          <h2
            id="titulo-escena-3"
            className="font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] lg:text-headline-xl"
          >
            Comprender la necesidad para{" "}
            <span className="font-light italic text-rich-ink/80">trazar la estructura</span>.
          </h2>
          <p className="pt-2 font-sans text-body-lead text-rich-ink/75">
            Antes de cambiar algo, necesito entender qué ocurre, qué necesita el equipo y qué
            partes del sistema están implicadas.
          </p>
        </div>

        {/* Objetivos del marco conductor: el marco recorre las cuatro capas
            durante la zona de reposo de esta escena. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {layers.map(({ number, title, description }) => (
            <article
              key={number}
              data-frame-target
              className="group relative flex min-h-[240px] flex-col justify-between bg-rich-ink/5 p-space-lg transition-all duration-300 hover:bg-rich-ink/10"
            >
              <span
                aria-hidden="true"
                className="absolute left-2 top-2 font-mono text-xs text-flame-orange opacity-40 transition-opacity group-hover:opacity-100"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute right-2 top-2 font-mono text-xs text-flame-orange opacity-40 transition-opacity group-hover:opacity-100"
              >
                +
              </span>
              <div>
                <div className="mb-space-md flex items-baseline justify-between">
                  <span className="font-serif text-headline-lg font-light text-rich-ink/25 transition-colors group-hover:text-flame-orange-deep">
                    {number}
                  </span>
                </div>
                <h3 className="mb-space-xs font-serif text-headline-sm font-medium text-rich-ink">
                  {title}
                </h3>
                <p className="font-sans text-body-md leading-relaxed text-rich-ink/70">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

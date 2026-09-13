/**
 * /perfil — Dinámica y equipo (sepia).
 * Reconstrucción de la escena 3 de la exportación de Stitch: tres
 * pilares de la forma de trabajo (definición y contexto, IA integrada
 * en el desarrollo con supervisión técnica, y validación y
 * mantenibilidad). La rejilla completa es el objetivo del marco.
 */
const values = [
  {
    number: "01",
    title: "Definición y contexto",
    description:
      "Antes de implementar, aclaro los requisitos, las restricciones y las prioridades. Entender el sistema y el uso real evita decisiones técnicas que después generan más trabajo.",
    footer: ["Requisitos", "Contexto"],
  },
  {
    number: "02",
    title: "IA integrada en el desarrollo",
    description:
      "Utilizo IA para investigar, analizar código existente, comparar alternativas, desarrollar y depurar. No acepto sus respuestas de forma automática: las reviso y compruebo dentro del sistema real.",
    footer: ["IA", "Criterio"],
  },
  {
    number: "03",
    title: "Validación y mantenibilidad",
    description:
      "Compruebo los flujos, los errores y los casos límite. Procuro que el resultado quede bien estructurado, documentado y preparado para que pueda seguir evolucionando.",
    footer: ["Validación", "Mantenibilidad"],
  },
]

export default function PerfilDynamics() {
  return (
    <section
      id="perfil-dinamica"
      aria-labelledby="titulo-perfil-dinamica"
      className="w-full scroll-mt-28 border-b border-rich-ink/10 bg-film-sepia py-space-xl text-rich-ink md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="grid grid-cols-1 items-baseline gap-6 border-b border-rich-ink/10 pb-space-xl lg:grid-cols-12">
          <div className="space-y-space-xs lg:col-span-4">
            <div className="flex items-center gap-space-xs font-sans text-label-technical font-semibold uppercase tracking-widest text-rich-ink/70">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame-orange" />
              <span>02 / Dinámica y equipo</span>
            </div>
            <span className="block font-sans text-label-technical font-normal uppercase tracking-widest text-rich-ink/50">
              Cómo es trabajar conmigo
            </span>
          </div>
          <div className="space-y-space-xs lg:col-span-8">
            <h2
              id="titulo-perfil-dinamica"
              className="font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-rich-ink lg:text-headline-xl"
            >
              Cómo <span className="font-light italic text-rich-ink/80">trabajo</span>.
            </h2>
            <p className="max-w-2xl pt-space-xs font-sans text-body-lead text-rich-ink/75">
              Combino análisis, criterio técnico y herramientas de IA para trabajar con rapidez
              sin perder el control sobre el resultado.
            </p>
          </div>
        </div>

        {/* Objetivos del marco conductor: una tarjeta por valor, en la
            misma lógica que las etapas de la trayectoria */}
        <div className="grid grid-cols-1 gap-6 pt-space-xl md:grid-cols-12">
          {values.map(({ number, title, description, footer }) => (
            <article
              key={number}
              data-frame-target
              className="relative flex flex-col justify-between bg-paper-dim/80 p-space-lg shadow-sm md:col-span-4"
            >
              <span
                aria-hidden="true"
                className="absolute left-2 top-2 select-none font-mono text-xs text-rich-ink/30"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-2 select-none font-mono text-xs text-rich-ink/30"
              >
                +
              </span>
              <div>
                <div className="mb-space-xs font-serif text-headline-lg font-light text-rich-ink/40">
                  {number}
                </div>
                <h3 className="pb-space-sm font-serif text-headline-sm font-semibold text-rich-ink">
                  {title}
                </h3>
                <p className="font-sans text-body-md leading-relaxed text-rich-ink/75">
                  {description}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-rich-ink/10 pt-space-lg font-sans text-label-technical font-semibold uppercase tracking-wider text-rich-ink/60">
                <span>{footer[0]}</span>
                <span>{footer[1]}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

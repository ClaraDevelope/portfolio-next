/**
 * /trabajo — Apertura compacta (marfil).
 * H1 editorial y párrafo introductorio, sin índice previo: los contenidos
 * se presentan durante el scroll. El bloque introductorio es el primer
 * objetivo del marco conductor.
 */
export default function WorkOpening() {
  return (
    <section
      id="trabajo-apertura"
      aria-labelledby="titulo-trabajo-apertura"
      className="w-full bg-paper-dim py-space-xl text-rich-ink"
    >
      <div className="mx-auto w-full max-w-7xl px-margin-mobile pt-16 md:px-margin-tablet lg:px-margin lg:pt-24">
        <div className="flex items-center gap-space-xs pb-space-lg">
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-flame-orange" />
          <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-rich-ink/80">
            Experiencia profesional
          </span>
        </div>

        <div className="max-w-5xl pb-space-xl">
          <h1
            id="titulo-trabajo-apertura"
            className="font-serif text-[3.25rem] leading-none tracking-tight text-rich-ink md:text-[5rem] lg:text-[6.5rem]"
          >
            Trabajo<span className="text-flame-orange">.</span>
          </h1>
          <p className="pt-space-md font-serif text-[1.75rem] leading-tight text-rich-ink/90 italic md:text-[2.25rem] lg:text-headline-lg">
            Herramientas que conectan sistemas, información y necesidades reales.
          </p>
        </div>

        {/* Objetivo inicial del marco conductor: bloque introductorio */}
        <p
          data-frame-target
          className="max-w-2xl py-space-xs font-sans text-body-lead text-rich-ink/85"
        >
          Trabajo con aplicaciones internas, automatización e integración de datos. Me interesa
          entender cómo se relacionan las piezas de un sistema y convertir procesos complejos en
          herramientas claras y mantenibles.
        </p>
      </div>
    </section>
  )
}

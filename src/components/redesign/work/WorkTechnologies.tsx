import FrameCorners from "../FrameCorners"

/**
 * /trabajo — Cierre técnico: Tecnologías con las que trabajo.
 * Importada de la exportación de Stitch en su versión legible: fondo
 * oscuro, título y categorías en blanco roto (on-surface), texto
 * secundario en gris claro (on-surface-variant), rótulos y acentos en
 * coral (flame) y etiquetas de tecnologías claras (marfil sobre tinta).
 * Cuatro grupos: Desarrollo, Datos e integración, Automatización y
 * pruebas, e Infraestructura. El contenedor con marcas de retícula es
 * objetivo del marco conductor, que llega desde la cartografía.
 */
const groups = [
  {
    id: "Grupo 01",
    code: "CORE",
    title: "Desarrollo",
    items: ["TypeScript", "JavaScript", "Node.js", "Next.js", "Express", "Python", "Flask"],
  },
  {
    id: "Grupo 02",
    code: "STORAGE",
    title: "Datos e integración",
    items: ["PostgreSQL", "Supabase", "APIs REST", "Leaflet"],
  },
  {
    id: "Grupo 03",
    code: "TEST & QA",
    title: "Automatización y pruebas",
    items: ["Puppeteer", "Playwright"],
  },
  {
    id: "Grupo 04",
    code: "DEPLOY",
    title: "Infraestructura",
    items: ["Docker", "Cloudflare", "Vercel", "Git"],
  },
]

export default function WorkTechnologies() {
  return (
    <section
      id="trabajo-tecnologias"
      aria-labelledby="titulo-trabajo-tecnologias"
      className="w-full scroll-mt-28 bg-surface-container-high/15 py-20 text-on-surface md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-4xl pb-space-xl">
          <div className="flex flex-col items-start justify-between gap-space-xs pb-space-xs text-on-surface-variant md:flex-row md:items-center">
            <div className="flex items-center gap-space-xs">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-flame-orange" />
              <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-flame-orange">
                Herramientas &amp; stack técnico
              </span>
            </div>
            <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-on-surface-variant/70">
              Ecosistema &amp; práctica real
            </span>
          </div>
          <h2
            id="titulo-trabajo-tecnologias"
            className="font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-on-surface lg:text-headline-xl"
          >
            Tecnologías con las que trabajo
          </h2>
          <p className="max-w-3xl pt-space-sm font-sans text-body-lead text-on-surface-variant">
            Herramientas que utilizo en proyectos profesionales y en el desarrollo de este
            portfolio.
          </p>
        </div>

        {/* Retícula de cuatro grupos dentro del contenedor encuadrado
            (objetivo del marco conductor, con marcas de retícula "+"). */}
        <div
          data-frame-target
          className="relative border border-outline-variant/30 bg-primary-container p-space-lg shadow-sm md:p-space-xl"
        >
          <FrameCorners tone="flame" />
          <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-4">
            {groups.map(({ id, code, title, items }) => (
              <div key={id} className="space-y-space-sm">
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-space-xs">
                  <span className="font-sans text-label-technical font-semibold uppercase tracking-wider text-flame-orange">
                    {id}
                  </span>
                  <span aria-hidden="true" className="font-mono text-[11px] text-tertiary/70">
                    {code}
                  </span>
                </div>
                <h3 className="font-serif text-headline-sm text-on-surface">{title}</h3>
                <div className="flex flex-wrap gap-space-xs pt-space-xs">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="border border-rich-ink/10 bg-paper-dim px-2 py-1 font-sans text-caption text-rich-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

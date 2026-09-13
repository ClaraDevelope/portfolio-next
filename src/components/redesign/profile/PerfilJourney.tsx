/**
 * /perfil — Trayectoria (berenjena profunda).
 * Reconstrucción de la escena 2 de la exportación de Stitch con datos
 * reales del CV y del portfolio anterior:
 *  - Educación Social: Grado en la Universidad de Valladolid (2014–2018);
 *    educadora social (técnica de acogida, Accem, 2018) y orientadora
 *    laboral (Fundación Adsis, 2020–2021).
 *  - Cooperativa La Otra: socia trabajadora (2018–2024), web en WordPress,
 *    Mailchimp, Geslib y gestión del espacio.
 *  - Formación: Máster en Desarrollo Web FullStack (programa {RockTheCode},
 *    The Power Business School, 2023–2024) como hito principal, con cursos
 *    complementarios (Java, SQL, ingeniería de software).
 *  - Ingenalia Telecom: desarrolladora full-stack junior (2025–actualidad).
 * Las cuatro etapas son objetivos del marco conductor: el marco las
 * recorre en orden durante la zona de reposo de la sección.
 */
const stages = [
  {
    tag: "Etapa 01",
    period: "2014–2018",
    title: "Educación Social",
    description:
      "Grado en Educación Social en la Universidad de Valladolid. Después trabajé como técnica de acogida con personas solicitantes de protección internacional y como orientadora laboral, dando talleres de competencias digitales para el empleo.",
    footer: ["Grado en la UVa", "Ámbito social"],
  },
  {
    tag: "Etapa 02",
    period: "2018–2024",
    title: "Cooperativa La Otra",
    description:
      "Socia trabajadora de una librería-café: responsable de la web en WordPress y de los boletines en Mailchimp, gestión de inventario con Geslib, atención, tareas administrativas y dinamización del espacio.",
    footer: ["Socia trabajadora", "Librería-café"],
  },
  {
    tag: "Etapa 03",
    period: "2023–2024",
    title: "Máster Full Stack",
    description:
      "Máster en Desarrollo Web FullStack en el programa {RockTheCode} de The Power Business School, mi principal hito formativo. Después lo complementé con cursos de Java, SQL e introducción a la ingeniería de software.",
    footer: ["RockTheCode", "Cursos complementarios"],
  },
  {
    tag: "Etapa 04",
    period: "2025–actualidad",
    title: "Ingenalia Telecom",
    description:
      "Desarrolladora full-stack junior: backend, automatización e integración de datos en aplicaciones internas.",
    footer: ["Full-stack", "Actual"],
  },
]

export default function PerfilJourney() {
  return (
    <section
      id="perfil-trayectoria"
      aria-labelledby="titulo-perfil-trayectoria"
      className="relative w-full scroll-mt-28 overflow-hidden bg-primary-container py-space-xl text-on-surface md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-container-lowest/40 via-transparent to-surface-container-lowest/60"
      />
      <div className="relative mx-auto w-full max-w-7xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="flex flex-col items-start justify-between gap-space-md border-b border-outline-variant/30 pb-space-xl md:flex-row md:items-end">
          <div className="max-w-2xl space-y-space-xs">
            <div className="flex items-center gap-space-xs font-sans text-label-technical font-semibold uppercase tracking-widest text-flame-orange">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame-orange" />
              <span>01 / Trayectoria y conexión</span>
            </div>
            <h2
              id="titulo-perfil-trayectoria"
              className="font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-on-surface lg:text-headline-xl"
            >
              De la Educación Social a la <span className="font-light italic text-primary">ingeniería de software</span>.
            </h2>
          </div>
          <p className="max-w-md font-sans text-body-lead text-on-surface-variant">
            Una trayectoria que conecta la escucha humana con el método técnico: entender los
            problemas desde el origen para construir soluciones útiles y bien estructuradas.
          </p>
        </div>

        {/* Objetivos del marco conductor: una etapa por tarjeta */}
        <div className="grid grid-cols-1 gap-6 pt-space-xl md:grid-cols-2 lg:grid-cols-4">
          {stages.map(({ tag, period, title, description, footer }) => (
            <article
              key={tag}
              data-frame-target
              className="group relative flex flex-col justify-between bg-surface-container-low/70 p-space-lg transition-all duration-300 hover:bg-surface-container-high/60"
            >
              <div>
                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-md">
                  <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-flame-orange">
                    {tag}
                  </span>
                  <span className="font-sans text-label-technical font-normal uppercase tracking-widest text-on-surface-variant">
                    {period}
                  </span>
                </div>
                <h3 className="pt-space-md font-serif text-headline-sm font-medium tracking-tight text-on-surface transition-colors group-hover:text-secondary">
                  {title}
                </h3>
                <p className="pt-space-sm font-sans text-body-md leading-relaxed text-on-surface-variant">
                  {description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-space-lg font-sans text-label-technical font-semibold uppercase tracking-widest text-outline-variant">
                <span>• {footer[0]}</span>
                <span>{footer[1]}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-space-xl flex flex-col items-start justify-between gap-space-xs border-t border-outline-variant/20 pt-space-md font-sans text-label-technical font-semibold uppercase tracking-widest text-on-surface-variant/60 sm:flex-row sm:items-center">
          <span>Cronología</span>
          <span>Evolución desde el contexto humano hacia el software</span>
          <span>Valladolid</span>
        </div>

        {/* Orientación profesional, tras la trayectoria */}
        <p className="max-w-2xl pt-space-lg font-sans text-body-md leading-relaxed text-on-surface-variant">
          Quiero seguir creciendo en backend y producto digital, tanto en equipos consolidados
          como en startups y proyectos donde la tecnología dialogue con ámbitos creativos o
          culturales.
        </p>
      </div>
    </section>
  )
}

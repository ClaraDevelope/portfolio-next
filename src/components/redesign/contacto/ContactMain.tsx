import { ArrowUpRight, Mail } from "lucide-react"
import CopyEmail from "./CopyEmail"
import { CONTACT_EMAIL, LINKEDIN_URL } from "./contactoSections"

/**
 * /contacto — Sección principal (atmósfera oscura).
 * Reconstrucción de la exportación de Stitch: franja de metadatos,
 * titular y tarjeta protagonista con frase de invitación, acciones
 * (Escribirme y LinkedIn, con datos reales del portfolio) y módulo de
 * copia de email. La tarjeta es el objetivo del marco conductor, con
 * amplio aire interior (p-space-lg / p-space-xl).
 */
export default function ContactMain() {
  return (
    <section
      id="contacto-principal"
      aria-labelledby="titulo-contacto"
      className="relative w-full scroll-mt-28 px-margin-mobile pt-16 pb-space-xl text-on-surface md:px-margin-tablet lg:px-margin lg:pt-24"
    >
      {/* Franja editorial de metadatos */}
      <div className="flex w-full flex-col justify-between gap-space-sm pb-space-lg md:flex-row md:items-center">
        <div className="flex items-center gap-space-sm">
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-flame-orange" />
          <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-on-surface-variant">
            Cuaderno 04 — Conversación y contacto
          </span>
        </div>
        <div className="flex items-center gap-space-md">
          <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-outline">
            Valladolid
          </span>
        </div>
      </div>

      <div className="max-w-4xl pb-space-xl pt-space-md">
        <h1
          id="titulo-contacto"
          className="font-serif text-[3.25rem] leading-none tracking-tight text-on-surface md:text-[5rem] lg:text-[6.5rem]"
        >
          Contacto<span className="text-flame-orange">.</span>
        </h1>
      </div>

      {/* Objetivo del marco conductor: tarjeta protagonista */}
      <div
        data-frame-target
        className="relative mx-auto my-space-md w-full max-w-5xl overflow-hidden rounded-xl bg-surface-container-low/90 p-space-lg shadow-xl backdrop-blur-md md:my-space-lg md:p-space-xl"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary-container/20 to-transparent"
        />

        <div className="relative z-10 flex flex-col gap-space-lg py-space-sm md:gap-space-xl md:py-space-md">
          {/* Localización */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-container px-space-sm py-1">
              <span
                aria-hidden="true"
                className="h-2 w-2 animate-pulse rounded-full bg-tertiary"
              />
              <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-primary">
                Valladolid
              </span>
            </div>
          </div>

          {/* Prosa editorial */}
          <div className="max-w-3xl space-y-space-md">
            <p className="font-serif text-[1.75rem] leading-tight text-on-surface md:text-headline-lg">
              Si crees que puedo encajar en tu equipo o tienes un proyecto que quieras
              contarme, escríbeme.
            </p>
            <p className="font-sans text-body-lead font-light text-on-surface-variant">
              Puedes contactarme por email o encontrarme en LinkedIn.
            </p>
          </div>

          {/* Acciones principales */}
          <div className="flex flex-col items-stretch gap-space-md pt-space-xs sm:flex-row sm:items-center">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group inline-flex items-center justify-center gap-space-sm rounded-lg bg-flame-orange px-space-lg py-3.5 font-sans text-label-technical font-semibold uppercase tracking-widest text-rich-ink shadow-md transition-all duration-300 hover:bg-secondary hover:text-secondary-container focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange"
            >
              <Mail
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              Escribirme
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-space-sm rounded-lg bg-surface-container-high px-space-lg py-3.5 font-sans text-label-technical font-semibold uppercase tracking-widest text-on-surface shadow-sm transition-all duration-300 hover:bg-midnight-wine hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange"
            >
              LinkedIn
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Módulo de copia rápida del email */}
          <div className="mt-space-xs pt-space-md">
            <div className="flex flex-col justify-between gap-space-md rounded-lg bg-surface-container-lowest/80 p-space-md md:flex-row md:items-center">
              <div className="flex min-w-0 flex-col gap-1">
                <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-outline">
                  Email directo
                </span>
                <div className="flex min-w-0 items-center gap-space-xs">
                  <span className="select-all truncate font-mono text-body-md tracking-tight text-primary md:text-body-lead">
                    {CONTACT_EMAIL}
                  </span>
                </div>
              </div>
              <CopyEmail email={CONTACT_EMAIL} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

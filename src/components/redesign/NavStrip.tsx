import Link from "next/link"
import { ArrowRight } from "lucide-react"

/**
 * Franja compacta de navegación final, inspirada en el cierre de Contacto.
 * Se sitúa antes del footer en Trabajo y Perfil: enlaces en línea en
 * escritorio y apilados en móvil, sin título ni encuadre del marco.
 */
type NavStripLink = {
  label: string
  href: string
}

type NavStripProps = {
  id: string
  links: readonly NavStripLink[]
}

export default function NavStrip({ id, links }: NavStripProps) {
  return (
    <section
      id={id}
      aria-label="Continuar navegando"
      className="w-full bg-paper-dim py-space-lg text-rich-ink"
    >
      <div className="mx-auto w-full max-w-7xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <nav
          aria-label="Navegación final"
          className="flex flex-col items-start justify-between gap-space-md rounded-xl border border-rich-ink/10 bg-rich-ink/5 px-space-lg py-space-md sm:flex-row sm:items-center"
        >
          <p className="flex items-center gap-space-xs font-sans text-label-technical font-semibold uppercase tracking-widest text-rich-ink/60">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame-orange" />
            Continuar
          </p>
          <ul className="flex flex-col gap-space-md sm:flex-row sm:items-center sm:gap-space-lg">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group inline-flex items-center gap-space-xs rounded-sm font-sans text-label-technical font-semibold uppercase tracking-wider text-rich-ink transition-colors hover:text-flame-orange-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange"
                >
                  {label}
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}

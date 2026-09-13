import Link from "next/link"
import { redesignNavItems } from "./navigation"

/**
 * Footer editorial del rediseño. Corregido respecto a Stitch:
 * rol real (desarrolladora web y de software), enlaces reales de
 * GitHub y LinkedIn, y sin "edición curada" ni referencias inventadas.
 */
export default function EditorialFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest pb-24 text-on-surface">
      <div className="mx-auto w-full max-w-7xl px-margin-mobile py-space-xl md:px-margin-tablet lg:px-margin">
        <div className="flex flex-col items-start justify-between gap-space-lg pb-space-lg md:flex-row md:items-baseline">
          <div className="space-y-space-xs">
            <p className="font-serif text-headline-sm text-on-surface">Clara Manzano Corona</p>
            <p className="max-w-sm font-sans text-caption text-on-surface-variant">
              Desarrolladora web y de software. Portfolio construido con código propio.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <ul className="flex flex-wrap items-center gap-x-space-lg gap-y-space-sm font-sans text-caption text-on-surface-variant">
              {redesignNavItems
                .filter((item) => item.href !== "/")
                .map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition-colors duration-200 hover:text-flame-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange rounded-sm"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition-colors duration-200 hover:text-flame-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange rounded-sm"
                >
                  Privacidad
                </Link>
              </li>
              <li aria-hidden="true" className="select-none text-outline-variant/40">
                /
              </li>
              <li>
                <a
                  href="https://github.com/ClaraDevelope"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange rounded-sm"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/clara-manzano-corona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange rounded-sm"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-space-sm pt-space-md font-sans text-label-technical font-semibold uppercase tracking-widest text-on-surface-variant/70 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Clara Manzano Corona</p>
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant/50 transition-colors hover:text-flame-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange rounded-sm"
          >
            Contenido libre salvo fotografías personales · CC BY 4.0
          </a>
        </div>
      </div>
    </footer>
  )
}

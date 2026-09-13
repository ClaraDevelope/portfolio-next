"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import clsx from "clsx"
import { Menu, X } from "lucide-react"
import { redesignNavItems } from "./navigation"

/**
 * Dock de navegación flotante del rediseño editorial.
 * Interpretación del "Persistent Floating Navigation Dock" de DESIGN.md
 * (la exportación de Stitch no incluía barra de navegación).
 * Marca la página activa con un subrayado en el acento llama.
 */
export default function EditorialNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header
      className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
      role="banner"
    >
      <nav
        className={clsx(
          "flex items-center justify-between rounded-full border border-white/10",
          "bg-rich-ink/70 backdrop-blur-md shadow-lg transition-colors duration-300",
          "px-4 py-2.5 lg:px-6",
        )}
        role="navigation"
        aria-label="Navegación principal"
      >
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className={clsx(
            "flex h-9 w-9 items-center justify-center rounded-full text-paper-dim",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange",
            "hover:bg-white/10 transition-colors lg:hidden",
          )}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="menu-movil-redesign"
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

        <p className="hidden font-serif text-lg italic tracking-tight text-paper-dim lg:block">
          Clara <span className="not-italic font-normal text-paper-dim/70">Manzano Corona</span>
        </p>

        <ul className="hidden items-center gap-5 lg:flex">
          {redesignNavItems.map(({ label, href }) => {
            const active = isActive(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-label={`Ir a ${label}`}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "relative font-sans text-caption uppercase tracking-widest",
                    active ? "text-paper-dim" : "text-paper-dim/80",
                    "transition-colors duration-200 hover:text-flame-orange",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange rounded-sm",
                    active &&
                      "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-flame-orange",
                  )}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <p
          className="font-sans text-label-technical uppercase tracking-widest text-flame-orange lg:hidden"
          aria-hidden="true"
        >
          CMC
        </p>
      </nav>

      {menuOpen && (
        <ul
          id="menu-movil-redesign"
          className="mt-2 flex flex-col gap-1 rounded-xl border border-white/10 bg-rich-ink/90 p-4 backdrop-blur-md shadow-lg lg:hidden"
        >
          {redesignNavItems.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                aria-label={`Ir a ${label}`}
                className={clsx(
                  "block rounded-sm px-3 py-2.5 text-body-md text-paper-dim",
                  "transition-colors duration-200 hover:text-flame-orange",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange",
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

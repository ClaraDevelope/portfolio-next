"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Formación", href: "#formacion" },
  { label: "Tecnologías", href: "#tecnologias" },
  { label: "Perfil", href: "#perfil" },
  { label: "¿Hablamos?", href: "#contacto" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className="fixed top-4 left-1/2 z-50 transform -translate-x-1/2 w-full px-4 md:max-w-[700px]"
      role="banner"
    >
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(
          "flex items-center justify-between transition-all duration-300 rounded-full",
          scrolled
            ? "bg-black/30 shadow-md backdrop-blur-md"
            : "bg-black/50",
          menuOpen
            ? "px-6 py-3"
            : "w-fit px-2 py-2 md:w-full md:px-6 md:py-3"
        )}
        role="navigation"
        aria-label="Navegación principal"
      >
        <span className="sr-only">Navegación principal</span>

        {/* Botón hamburguesa móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={clsx(
            "md:hidden text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
            "w-8 h-8 rounded-full flex items-center justify-center"
          )}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Navegación desktop */}
        <ul className="hidden md:flex justify-center items-center w-full gap-6 text-sm font-semibold text-white tracking-tight">
          {navItems.map(({ label, href }) => {
            const isCurrent = href === pathname
            return (
              <li key={href}>
                <Link
                  href={href}
                  title={`Ir a la sección ${label}`}
                  aria-label={`Sección: ${label}`}
                  aria-current={isCurrent ? "page" : undefined}
                  className={clsx(
                    "hover:text-[var(--accent)] transition-colors duration-200 text-[16px]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
                  )}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </motion.nav>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-2 w-full bg-black/90 backdrop-blur-md text-white rounded-xl py-4 px-6 shadow-md flex flex-col gap-4 text-sm font-medium md:hidden"
          >
            {navItems.map(({ label, href }) => {
              const isCurrent = href === pathname
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    title={`Ir a la sección ${label}`}
                    aria-label={`Sección: ${label}`}
                    aria-current={isCurrent ? "page" : undefined}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

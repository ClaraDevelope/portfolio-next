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
      className="fixed top-4 left-1/2 z-50 transform -translate-x-1/2 w-full px-4 md:max-w-[1200px]"
      role="banner"
    >
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(
          "flex items-center justify-between transition-all duration-300 rounded-full",
          scrolled ? "bg-black/30 shadow-md backdrop-blur-md" : "bg-black/50",
          menuOpen ? "px-6 py-3 lg:px-8 lg:py-4" : "w-fit px-2 py-2  md:px-3 md:py-3 lg:px-8 lg:py-4",
        )}
        role="navigation"
        aria-label="Navegación principal"
      >
        <span className="sr-only">Navegación principal</span>

        {/* Botón hamburguesa móvil y tablet */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={clsx(
            "lg:hidden text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
            "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center",
          )}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={22} className="md:w-6 md:h-6" /> : <Menu size={22} className="md:w-6 md:h-6" />}
        </button>

        {/* Texto "Portfolio" - Solo visible en desktop */}
        <div className="hidden lg:flex text-xl xl:text-2xl font-bold mr-12 xl:mr-16 w-full gap-1 items-center whitespace-nowrap">
          <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mr-2">
            Portfolio
          </span>
          <span
            className="relative text-white/90 font-light tracking-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.25)]
                          after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white/60
                          after:transition-all after:duration-300 hover:after:w-full after:duration-500"
          >
            Clara Manzano Corona
          </span>
        </div>

        {/* Navegación desktop */}
        <ul className="hidden lg:flex justify-center items-center w-full gap-4 xl:gap-6 text-sm xl:text-base font-semibold text-white tracking-tight">
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
                    "hover:text-[var(--accent)] transition-colors duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm",
                    "text-sm lg:text-base xl:text-[16px] px-2 py-1",
                  )}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </motion.nav>

      {/* Menú móvil y tablet desplegable */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-2 w-full bg-black/90 backdrop-blur-md text-white rounded-xl py-4 px-6 md:py-6 md:px-8 shadow-md flex flex-col gap-3 md:gap-4 text-base md:text-lg font-medium lg:hidden"
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
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm py-2 px-1 hover:text-[var(--accent)] transition-colors duration-200"
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

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

type NavChild = { label: string; href: string }
type NavItem = { label: string; href: string; children?: NavChild[] }

const navItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Formación", href: "#formacion" },
  { label: "Tecnologías", href: "#tecnologias" },
  {
    label: "Perfil",
    href: "#perfil",
    children: [
      { label: "Sobre mí", href: "#perfil" },
      { label: "Vídeos", href: "#videos" },
    ],
  },
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

  const mobileItems: NavItem[] = navItems.flatMap((it) =>
    it.children ? [{ label: it.label, href: it.href }, ...it.children] : [it],
  )

  return (
    <header
      className="fixed top-4 left-1/2 z-50 transform -translate-x-1/2 w-full px-4 lg:max-w-[1050px] md:max-w-[900px]"
      role="banner"
    >
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(
          "flex items-center justify-between transition-all duration-300 rounded-full",
          scrolled ? "bg-black/30 shadow-md backdrop-blur-md" : "bg-black/50",
          menuOpen ? "px-5 py-3 lg:px-7 lg:py-3.5" : "w-fit px-2 py-2 md:px-3 md:py-3 lg:px-6 lg:py-3",
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
        <div className="hidden lg:flex text-lg xl:text-xl font-bold mr-8 xl:mr-10 w-full gap-1 items-center whitespace-nowrap">
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
        <ul className="hidden lg:flex justify-center items-center w-full gap-3 xl:gap-5 text-sm xl:text-[15px] font-semibold text-white tracking-tight">
          {navItems.map(({ label, href, children }) => {
            const isCurrent = href === pathname

            if (children && children.length > 0) {
              return (
                <li key={href} className="relative group">
                  <Link
                    href={href}
                    title={`Ir a la sección ${label}`}
                    aria-label={`Sección: ${label}`}
                    aria-current={isCurrent ? "page" : undefined}
                    className={clsx(
                      "hover:text-[var(--accent)] transition-colors duration-200",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm",
                      "text-sm lg:text-base xl:text-[15px] px-2 py-1 whitespace-nowrap",
                    )}
                  >
                    {label}
                    <span aria-hidden className="ml-1">▾</span>
                  </Link>

                  {/* Dropdown clicable */}
                  <ul
                    className="absolute left-1/2 top-full -translate-x-1/2 z-50 min-w-[160px]
                               rounded-xl bg-black/90 backdrop-blur-md ring-1 ring-white/10 shadow-lg
                               opacity-0 invisible pointer-events-none
                               group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
                               focus-within:opacity-100 focus-within:visible focus-within:pointer-events-auto
                               transition-opacity duration-150 pt-1"
                    role="menu"
                    aria-label="Opciones de perfil"
                  >
                    {children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          role="menuitem"
                          className="block px-4 py-2 text-sm hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm whitespace-nowrap"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            }

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
                    "text-sm lg:text-base xl:text-[15px] px-2 py-1 whitespace-nowrap",
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
            {mobileItems.map(({ label, href }) => {
              const isCurrent = href === pathname
              return (
                <li key={`${label}-${href}`}>
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






// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { useEffect, useState } from "react"
// import clsx from "clsx"
// import { motion, AnimatePresence } from "framer-motion"
// import { Menu, X } from "lucide-react"

// const navItems = [
//   { label: "Inicio", href: "/" },
//   { label: "Experiencia", href: "#experiencia" },
//   { label: "Proyectos", href: "#proyectos" },
//   { label: "Formación", href: "#formacion" },
//   { label: "Tecnologías", href: "#tecnologias" },
//   { label: "Perfil", href: "#perfil" },
//   { label: "Vídeos", href: "#videos" },
//   { label: "¿Hablamos?", href: "#contacto" },
// ]

// export default function Navbar() {
//   const pathname = usePathname()
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 8)
//     window.addEventListener("scroll", onScroll)
//     return () => window.removeEventListener("scroll", onScroll)
//   }, [])

//   return (
//     <header
//       className="fixed top-4 left-1/2 z-50 transform -translate-x-1/2 w-full px-4 lg:max-w-[1400px] md:max-w-[1000px]"
//       role="banner"
//     >
//       <motion.nav
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className={clsx(
//           "flex items-center justify-between transition-all duration-300 rounded-full",
//           scrolled ? "bg-black/30 shadow-md backdrop-blur-md" : "bg-black/50",
//           menuOpen ? "px-6 py-3 lg:px-8 lg:py-4" : "w-fit px-2 py-2  md:px-3 md:py-3 lg:px-8 lg:py-4",
//         )}
//         role="navigation"
//         aria-label="Navegación principal"
//       >
//         <span className="sr-only">Navegación principal</span>

//         {/* Botón hamburguesa móvil y tablet */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className={clsx(
//             "lg:hidden text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
//             "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center",
//           )}
//           aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
//           aria-expanded={menuOpen}
//           aria-controls="mobile-menu"
//         >
//           {menuOpen ? <X size={22} className="md:w-6 md:h-6" /> : <Menu size={22} className="md:w-6 md:h-6" />}
//         </button>

//         {/* Texto "Portfolio" - Solo visible en desktop */}
//         <div className="hidden lg:flex text-xl xl:text-2xl font-bold mr-12 xl:mr-16 w-full gap-1 items-center whitespace-nowrap">
//           <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mr-2">
//             Portfolio
//           </span>
//           <span
//             className="relative text-white/90 font-light tracking-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.25)]
//                           after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white/60
//                           after:transition-all after:duration-300 hover:after:w-full after:duration-500"
//           >
//             Clara Manzano Corona
//           </span>
//         </div>

//         {/* Navegación desktop */}
//         <ul className="hidden lg:flex justify-center items-center w-full gap-4 xl:gap-6 text-sm xl:text-base font-semibold text-white tracking-tight">
//           {navItems.map(({ label, href }) => {
//             const isCurrent = href === pathname
//             return (
//               <li key={href}>
//                 <Link
//                   href={href}
//                   title={`Ir a la sección ${label}`}
//                   aria-label={`Sección: ${label}`}
//                   aria-current={isCurrent ? "page" : undefined}
//                   className={clsx(
//                     "hover:text-[var(--accent)] transition-colors duration-200",
//                     "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm",
//                     "text-sm lg:text-base xl:text-[16px] px-2 py-1",
//                   )}
//                 >
//                   {label}
//                 </Link>
//               </li>
//             )
//           })}
//         </ul>
//       </motion.nav>

//       {/* Menú móvil y tablet desplegable */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.ul
//             id="mobile-menu"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.25 }}
//             className="mt-2 w-full bg-black/90 backdrop-blur-md text-white rounded-xl py-4 px-6 md:py-6 md:px-8 shadow-md flex flex-col gap-3 md:gap-4 text-base md:text-lg font-medium lg:hidden"
//           >
//             {navItems.map(({ label, href }) => {
//               const isCurrent = href === pathname
//               return (
//                 <li key={href}>
//                   <Link
//                     href={href}
//                     onClick={() => setMenuOpen(false)}
//                     title={`Ir a la sección ${label}`}
//                     aria-label={`Sección: ${label}`}
//                     aria-current={isCurrent ? "page" : undefined}
//                     className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm py-2 px-1 hover:text-[var(--accent)] transition-colors duration-200"
//                   >
//                     {label}
//                   </Link>
//                 </li>
//               )
//             })}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </header>
//   )
// }

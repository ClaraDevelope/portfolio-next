"use client"

import { useEffect, useState } from "react"
import clsx from "clsx"
import { scenes as homeScenes } from "./navigation"

/**
 * Indicador discreto de progreso por secciones (solo puntos, sin título).
 * El marco conductor es el que guía el recorrido; esto aporta orientación
 * secundaria y acceso directo a cada sección. Reutilizable por página.
 */

type DotSection = { id: string; label: string }

type SceneDotsProps = {
  sections?: readonly DotSection[]
  ariaLabel?: string
}

export default function SceneDots({
  sections = homeScenes,
  ariaLabel = "Progreso de la portada",
}: SceneDotsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const sectionEls = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sectionEls.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sectionEls.findIndex((section) => section.id === entry.target.id)
            if (index !== -1) setActiveIndex(index)
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )

    sectionEls.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2"
      aria-label={ariaLabel}
    >
      <ul className="flex items-center gap-2 rounded-full border border-white/10 bg-rich-ink/60 px-3 py-2 backdrop-blur-md">
        {sections.map(({ id, label }, index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-label={`Ir a la sección ${index + 1}: ${label}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={clsx(
                "block h-1.5 w-1.5 rounded-full transition-colors duration-300",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange",
                index === activeIndex
                  ? "bg-flame-orange"
                  : "bg-paper-dim/30 hover:bg-paper-dim/60",
              )}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}

"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * Capa revelada dentro del marco conductor (técnica de la ventana de color
 * del retrato de Inicio): un overlay decorativo recortado con clip-path a
 * la intersección entre el rect del marco (`[data-marco-conductor]`) y el
 * rect sin recortar de esta capa. Sincronizado con requestAnimationFrame,
 * sin renders de React, recalculado al redimensionar.
 */
export default function FrameReveal({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    let rafId = 0
    let frameEl: HTMLElement | null = null

    const update = () => {
      if (!frameEl) {
        frameEl = document.querySelector<HTMLElement>("[data-marco-conductor]")
      }

      // Sin marco (o antes de su primera medición): capa oculta.
      if (!frameEl) {
        layer.style.clipPath = "inset(0 0 100% 0)"
        return
      }

      const frameRect = frameEl.getBoundingClientRect()
      // El rect de la capa no se ve afectado por su propio clip-path,
      // así que equivale al rect del contenedor del mapa.
      const baseRect = layer.getBoundingClientRect()

      const top = Math.max(0, frameRect.top - baseRect.top)
      const left = Math.max(0, frameRect.left - baseRect.left)
      const right = Math.max(0, baseRect.right - frameRect.right)
      const bottom = Math.max(0, baseRect.bottom - frameRect.bottom)

      layer.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`
    }

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    requestAnimationFrame(() => requestAnimationFrame(update))

    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [])

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      {children}
    </div>
  )
}

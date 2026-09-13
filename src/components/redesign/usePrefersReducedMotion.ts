"use client"

import { useEffect, useState } from "react"

/**
 * Devuelve true cuando el usuario ha configurado reducción de movimiento.
 * Alternativa ligera a framer-motion para el prototipo.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return reduced
}

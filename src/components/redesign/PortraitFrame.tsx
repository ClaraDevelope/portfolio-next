"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

/**
 * Retrato de la escena 01 con ventana de color sincronizada con el marco
 * conductor ("el marco como ventana que revela el color").
 *
 * - Capa inferior: la fotografía en blanco y negro. Es la única capa con
 *   semántica de imagen (alt real); el efecto no la duplica para lectores
 *   de pantalla.
 * - Capa superior: la MISMA imagen (mismo archivo, mismo object-fit y
 *   dimensiones) en color, marcada como decorativa (aria-hidden).
 * - La capa en color se recorta con `clip-path: inset(...)` a la
 *   intersección real entre el rect del marco conductor
 *   (`[data-marco-conductor]`, position: fixed) y el rect de la fotografía.
 *   El cálculo se hace en requestAnimationFrame mutando estilos vía refs:
 *   sin renders de React por píxel de scroll, y recalculado al redimensionar.
 *
 * El objetivo inicial del marco (`data-frame-target`) encuadra el rostro y
 * la parte superior de los hombros con márgenes proporcionales (no píxeles
 * fijos): ~5-6% respecto al contenedor de la fotografía.
 */
export default function PortraitFrame() {
  const photoRef = useRef<HTMLDivElement>(null)
  const colorLayerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const photo = photoRef.current
    const colorLayer = colorLayerRef.current
    if (!photo || !colorLayer) return

    let rafId = 0
    let frameEl: HTMLElement | null = null

    const update = () => {
      if (!frameEl) {
        frameEl = document.querySelector<HTMLElement>("[data-marco-conductor]")
      }

      // Sin marco (o antes de su primera medición): todo en blanco y negro.
      if (!frameEl) {
        colorLayer.style.clipPath = "inset(0 0 100% 0)"
        return
      }

      const frameRect = frameEl.getBoundingClientRect()
      const photoRect = photo.getBoundingClientRect()

      // Intersección marco ∩ fotografía, expresada como insets de la capa
      // de color respecto a los bordes de la fotografía. Si el marco ya no
      // se solapa, los insets la recortan por completo (foto de nuevo en B/N).
      const top = Math.max(0, frameRect.top - photoRect.top)
      const left = Math.max(0, frameRect.left - photoRect.left)
      const right = Math.max(0, photoRect.right - frameRect.right)
      const bottom = Math.max(0, photoRect.bottom - frameRect.bottom)

      colorLayer.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`
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
    <div className="relative w-full max-w-sm sm:max-w-md lg:sticky lg:top-28 lg:max-w-none">
      <div
        ref={photoRef}
        className="relative aspect-[3/4] overflow-hidden bg-rich-ink/5 shadow-2xl"
      >
        {/* Capa inferior: blanco y negro (imagen semántica) */}
        <Image
          src="/images/foto-estudio-2.png"
          alt="Clara Manzano Corona, retrato de estudio en formato vertical"
          fill
          priority
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
          className="object-cover object-center grayscale contrast-[1.05]"
        />

        {/* Capa superior: color, decorativa, recortada al interior del marco */}
        <div
          ref={colorLayerRef}
          aria-hidden="true"
          className="absolute inset-0"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        >
          <Image
            src="/images/foto-estudio-2.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
            className="object-cover object-center"
          />
        </div>

        {/* Objetivo inicial del marco conductor: rostro completo, con margen
            de cuello bajo la barbilla y borde inferior sobre la parte alta del
            jersey (antes del pecho). Bordes proporcionales (no píxeles fijos):
            6% lateral, 10% superior (ligeramente sobre el pelo) y borde
            inferior al 80% de la fotografía. Ninguna línea horizontal cruza
            el rostro, la barbilla ni el cuello. */}
        <div
          data-frame-target
          aria-hidden="true"
          className="pointer-events-none absolute left-[6%] right-[6%] top-[20%] h-[65%]"
        >
          <div className="absolute left-3 top-2 flex items-center gap-1.5 bg-rich-ink/40 px-2 py-0.5 font-sans text-label-technical font-semibold uppercase tracking-widest text-paper-dim/90 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-flame-orange" />
            Focal 50 mm · Retrato
          </div>
          <div className="absolute bottom-2 right-3 bg-rich-ink/40 px-1.5 py-0.5 font-sans text-label-technical font-semibold uppercase tracking-widest text-paper-dim/80">
            Formato 3:4
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between bg-gradient-to-t from-rich-ink/90 via-rich-ink/50 to-transparent p-space-md text-paper-dim">
          <span className="font-serif text-headline-sm italic">Clara</span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-flame-orange/10 blur-2xl"
      />
    </div>
  )
}

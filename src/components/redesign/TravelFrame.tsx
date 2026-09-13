"use client"

import { useEffect, useRef } from "react"
import { scenes as homeScenes } from "./navigation"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

/**
 * El marco conductor (reutilizable por página).
 *
 * Un único marco visual persistente (position: fixed) que viaja y se
 * transforma durante el scroll, de forma equivalente al objeto de referencia
 * de la web de Paloseco:
 *
 *  - Cada sección de la página expone sus objetivos mediante atributos
 *    `data-frame-target` (una sección puede exponer varios; el marco los
 *    recorre durante su zona de reposo).
 *  - En cada frame de scroll se miden los rects de los objetivos y de las
 *    secciones, y se interpola posición/tamaño entre la sección que se deja
 *    y la que llega (smoothstep por segmento, sin saltos).
 *  - Zona de reposo por sección: el marco permanece "pegado" a su objetivo
 *    mientras la sección está en pantalla; la transición ocurre entre secciones.
 *  - Todo el seguimiento se hace con requestAnimationFrame y mutación directa
 *    de estilos vía refs: ningún render de React por píxel de scroll.
 *  - Con `prefers-reduced-motion` no hay interpolación: el marco aparece
 *    estático pegado al objetivo de la sección activa.
 *  - Las medidas se leen en vivo en cada frame, por lo que el redimensionado
 *    de ventana y el scroll ascendente funcionan sin estado adicional.
 *
 * Props: `sections` define ids de sección y el tono de borde del marco en cada
 * una ("light" para escenas claras, "dark" para oscuras, "forest" con acento
 * bosque). Si no se pasan, se usan las escenas de la portada.
 */

type MixedRect = { left: number; top: number; width: number; height: number }
type Zone = { start: number; end: number }
export type FrameTone = "light" | "dark" | "forest"

export type FrameSection = {
  id: string
  tone: FrameTone
}

const toneBorders: Record<FrameTone, string> = {
  light: "border-rich-ink/60",
  dark: "border-on-surface/50",
  forest: "border-tertiary/80 shadow-[0_0_48px_rgba(183,204,186,0.12)]",
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const smoothstep = (t: number) => {
  const c = clamp01(t)
  return c * c * (3 - 2 * c)
}

const mixRect = (a: DOMRect, b: DOMRect, u: number): MixedRect => ({
  left: a.left + (b.left - a.left) * u,
  top: a.top + (b.top - a.top) * u,
  width: a.width + (b.width - a.width) * u,
  height: a.height + (b.height - a.height) * u,
})

const toRect = (rect: DOMRect): MixedRect => ({
  left: rect.left,
  top: rect.top,
  width: rect.width,
  height: rect.height,
})

type TravelFrameProps = {
  sections?: readonly FrameSection[]
}

const defaultSections: readonly FrameSection[] = homeScenes.map((scene, index) => ({
  id: scene.id,
  tone: (["light", "dark", "light", "forest", "dark"] as const)[index],
}))

export default function TravelFrame({ sections = defaultSections }: TravelFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<Array<HTMLDivElement | null>>([])
  const reducedMotion = usePrefersReducedMotion()
  const reducedRef = useRef(reducedMotion)
  reducedRef.current = reducedMotion

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    let rafId = 0

    const update = () => {
      const vh = window.innerHeight
      const y = window.scrollY
      const count = sections.length

      const stopRects: DOMRect[][] = []
      const zones: Zone[] = []
      let valid = true

      for (let i = 0; i < count; i++) {
        const section = document.getElementById(sections[i].id)
        const stops = section
          ? Array.from(section.querySelectorAll<HTMLElement>("[data-frame-target]")).map((el) =>
              el.getBoundingClientRect(),
            )
          : []
        stopRects.push(stops)

        if (!section || stops.length === 0) {
          valid = false
          break
        }

        const sectionRect = section.getBoundingClientRect()
        const start = i === 0 ? Number.NEGATIVE_INFINITY : y + sectionRect.top - vh * 0.55
        const end =
          i === count - 1 ? Number.POSITIVE_INFINITY : y + sectionRect.bottom - vh * 0.9
        zones.push({ start, end: Math.max(end, start + 1) })
      }

      if (!valid) {
        frame.style.visibility = "hidden"
        return
      }

      // Escena activa: la primera cuya zona no ha terminado de pasar.
      let sceneIdx = count - 1
      for (let i = 0; i < count; i++) {
        if (y <= zones[i].end) {
          sceneIdx = i
          break
        }
      }

      const reduced = reducedRef.current
      const opacities = new Array<number>(count).fill(0)
      let rect: MixedRect | null = null

      // Transición entre escenas: aún no se ha alcanzado el inicio de la zona
      // de la escena que llega, pero la anterior ya ha terminado.
      const inTransition = sceneIdx > 0 && y < zones[sceneIdx].start

      if (inTransition) {
        const from = sceneIdx - 1
        const to = sceneIdx
        const fromStops = stopRects[from]
        const toStops = stopRects[to]

        if (reduced) {
          rect = toRect(toStops[0])
          opacities[to] = 1
        } else {
          const denom = Math.max(1, zones[to].start - zones[from].end)
          const t = smoothstep((y - zones[from].end) / denom)
          rect = mixRect(fromStops[fromStops.length - 1], toStops[0], t)
          opacities[from] = 1 - t
          opacities[to] = t
        }
      } else {
        const stops = stopRects[sceneIdx]
        const zone = zones[sceneIdx]
        opacities[sceneIdx] = 1

        if (stops.length === 1 || reduced) {
          // Objetivo único (o modo estático): sin interpolación interna.
          rect = toRect(stops[0])
        } else {
          // Objetivos múltiples (escena de las capas): el marco recorre los
          // sub-objetivos distribuidos por la zona de reposo de la escena.
          const span = Math.max(1, zone.end - zone.start)
          const anchors = stops.map(
            (_, k) => zone.start + span * ((k + 1) / (stops.length + 1)),
          )

          if (y <= anchors[0]) {
            rect = toRect(stops[0])
          } else if (y >= anchors[anchors.length - 1]) {
            rect = toRect(stops[stops.length - 1])
          } else {
            let k = 0
            while (k < anchors.length - 1 && y > anchors[k + 1]) k++
            const u = smoothstep((y - anchors[k]) / Math.max(1, anchors[k + 1] - anchors[k]))
            rect = mixRect(stops[k], stops[k + 1], u)
          }
        }
      }

      if (!rect) {
        frame.style.visibility = "hidden"
        return
      }

      // Encuadre móvil: cuando los objetivos apilados son más altos que la
      // pantalla (tarjetas en columna), el marco se limita al área visible
      // del objetivo para no atravesar textos ni dibujarse fuera de los
      // contenedores. En escritorio (objetivos completamente visibles) el
      // comportamiento no cambia.
      if (window.innerWidth < 768) {
        const margin = 12
        const left = Math.max(rect.left, margin)
        const top = Math.max(rect.top, margin)
        const right = Math.min(rect.left + rect.width, window.innerWidth - margin)
        const bottom = Math.min(rect.top + rect.height, window.innerHeight - margin)
        if (right <= left || bottom <= top) {
          frame.style.visibility = "hidden"
          return
        }
        rect = { left, top, width: right - left, height: bottom - top }
      }

      // En la escena final el marco se desvanece para dejar paso al índice.
      let frameOpacity = 1
      if (sceneIdx === count - 1 && !inTransition) {
        frameOpacity = 1 - clamp01((y - zones[count - 1].start) / (vh * 2))
      }

      frame.style.visibility = "visible"
      frame.style.opacity = frameOpacity.toFixed(3)
      frame.style.width = `${rect.width}px`
      frame.style.height = `${rect.height}px`
      frame.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`

      layerRefs.current.forEach((layer, index) => {
        if (layer) layer.style.opacity = opacities[index].toFixed(3)
      })
    }

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    requestAnimationFrame(() => requestAnimationFrame(update))

    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
    window.addEventListener("load", scheduleUpdate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      window.removeEventListener("load", scheduleUpdate)
    }
  }, [sections])

  return (
    <div
      ref={frameRef}
      data-marco-conductor
      aria-hidden="true"
      className="invisible pointer-events-none fixed left-0 top-0 z-40 will-change-transform"
    >
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(el) => {
            layerRefs.current[index] = el
          }}
          className={`absolute inset-0 border ${toneBorders[section.tone]}`}
          style={{ opacity: 0 }}
        >
          <span className="absolute -left-2 -top-2 select-none font-mono text-xs leading-none text-flame-orange">
            +
          </span>
          <span className="absolute -right-2 -top-2 select-none font-mono text-xs leading-none text-flame-orange">
            +
          </span>
          <span className="absolute -bottom-2 -left-2 select-none font-mono text-xs leading-none text-flame-orange">
            +
          </span>
          <span className="absolute -bottom-2 -right-2 select-none font-mono text-xs leading-none text-flame-orange">
            +
          </span>
        </div>
      ))}
    </div>
  )
}

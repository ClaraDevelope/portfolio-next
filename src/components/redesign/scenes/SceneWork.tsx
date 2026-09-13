"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import { usePrefersReducedMotion } from "../usePrefersReducedMotion"

/**
 * Escena 02 — La parte que no se ve (berenjena profunda).
 *
 * Pieza de motion design editorial dirigida por el scroll: tipografía como
 * elemento gráfico, textura abstracta (luz, grano, desenfoques, profundidad)
 * y una transición real de color hacia la escena 03. Cinco momentos sobre
 * un escenario sticky:
 *
 *  1. Título — aparecen el rótulo y el título, con gran presencia y sin
 *     elementos compitiendo.
 *  2. Ruptura — el título gana escala y sus palabras se desplazan a
 *     distintas velocidades, rotaciones y profundidades; parte de la
 *     tipografía queda recortada por los bordes. La textura visual
 *     (bloom de luz, bandas de luz desplazadas como a través de agua,
 *     grano fotográfico, viñeta) comienza a aparecer y evoluciona.
 *  3. Primera frase — el título se retira y en el centro entra
 *     «El trabajo no empieza en la pantalla.» mediante un revelado
 *     tipográfico por máscaras (palabra a palabra), con tiempo de lectura.
 *  4. Segunda frase — la primera desaparece y entra «Empieza entendiendo
 *     qué tiene que funcionar.», con protagonismo visual para
 *     «entendiendo» (mayor, cursiva, coral).
 *  5. Transición — «entendiendo» crece y se desplaza hasta ocupar el
 *     encuadre mientras el fondo pasa del berenjena oscuro al marfil de la
 *     escena 03; la palabra actúa como puente (continuidad de posición,
 *     escala y fundido) hacia «Comprender la necesidad para trazar la
 *     estructura.». Al soltar el sticky, la escena 03 entra en su posición
 *     normal, sin salto visual ni espacio vacío.
 *
 * - Las dos frases jamás se solapan (ventanas del timeline disjuntas).
 * - Escritorio (≥ 1024px, sección de 560vh): máquina de estados discreta
 *   para la secuencia — entrada → frase 1 fija → frase 2 fija → salida.
 *   Un gesto de scroll completo avanza (o retrocede) exactamente un estado
 *   sea cual sea su magnitud; cada transición se ejecuta completa en
 *   ~500 ms (sin detenerse en fotogramas intermedios) y solo estaciona en
 *   frases completas, centradas y legibles, con un mínimo de 1,5 s antes
 *   de aceptar el siguiente gesto (sin avance automático al dejar de
 *   hacer scroll). El estado SALIDA no estaciona: entrega la escena a la
 *   03 en cuanto completa la transformación final.
 * - Escritorio: reacción mínima de la textura al cursor.
 * - Móvil (< 1024px): comportamiento continuo anterior, sin cambios.
 * - prefers-reduced-motion: los tres momentos textuales en secuencia
 *   estática y legible, sin sticky ni bloqueo.
 *
 * El cálculo por frame usa requestAnimationFrame y mutación directa de
 * estilos vía refs (patrón del marco conductor). El bloque del título es
 * objetivo del encuadre del sitio.
 */

/** Grano fotográfico (ruido fractal SVG en data-URI, coste cero por frame). */
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E"

/** Banda de luz orgánica: gradiente desplazado con turbulencia (no un degradado plano). */
const CAUSTIC_A =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='720' height='480'%3E%3Cdefs%3E%3Cfilter id='f' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.028' numOctaves='3' seed='7' result='t'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='t' scale='150'/%3E%3C/filter%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23FF6B4A' stop-opacity='0.5'/%3E%3Cstop offset='0.45' stop-color='%23d4c1d5' stop-opacity='0.32'/%3E%3Cstop offset='1' stop-color='%23b7ccba' stop-opacity='0.2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='720' height='480' fill='url(%23g)' filter='url(%23f)'/%3E%3C/svg%3E"

/** Segunda banda, con otra semilla y tonos fríos, para profundidad por capas. */
const CAUSTIC_B =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='720' height='480'%3E%3Cdefs%3E%3Cfilter id='f' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02 0.05' numOctaves='2' seed='13' result='t'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='t' scale='120'/%3E%3C/filter%3E%3ClinearGradient id='g' x1='1' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23b7ccba' stop-opacity='0.4'/%3E%3Cstop offset='0.55' stop-color='%23d4c1d5' stop-opacity='0.28'/%3E%3Cstop offset='1' stop-color='%23221126' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='720' height='480' fill='url(%23g)' filter='url(%23f)'/%3E%3C/svg%3E"

/**
 * Palabras del título con su deriva propia (momento 2): desplazamiento en %
 * del escenario, rotación y escala. El desfase (`off`) y la duración (`dur`)
 * se combinan con el inicio de la deriva del timeline activo, de modo que la
 * coreografía puede desplazarse en el tiempo sin cambiar las relaciones entre
 * palabras; las de los extremos quedan recortadas por el borde.
 */
const TITLE_WORDS = [
  { text: "La", italic: false, dx: -6, dy: -8, rot: -2, sc: 1.06, off: 0.03, dur: 0.2 },
  { text: "técnica", italic: false, dx: -32, dy: 4, rot: -9, sc: 1.18, off: 0.05, dur: 0.22 },
  { text: "como", italic: false, dx: -4, dy: 9, rot: -2, sc: 1.04, off: 0.01, dur: 0.2 },
  { text: "artesanía", italic: true, dx: 9, dy: -15, rot: 4, sc: 1.12, off: 0.04, dur: 0.22 },
  { text: "de", italic: true, dx: 4, dy: -5, rot: 2, sc: 1.05, off: 0.02, dur: 0.2 },
  { text: "lo", italic: true, dx: -3, dy: 6, rot: -1, sc: 1.03, off: 0, dur: 0.2 },
  { text: "invisible.", italic: true, dx: 34, dy: 16, rot: 8, sc: 1.22, off: 0.06, dur: 0.23 },
] as const

const PHRASE_1 = ["El", "trabajo", "no", "empieza", "en", "la", "pantalla."] as const

const PHRASE_2 = [
  { text: "Empieza", focus: false, mi: 0 },
  { text: "entendiendo", focus: true, mi: -1 },
  { text: "qué", focus: false, mi: 1 },
  { text: "tiene", focus: false, mi: 2 },
  { text: "que", focus: false, mi: 3 },
  { text: "funcionar.", focus: false, mi: 4 },
] as const

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const smoothstep = (t: number) => {
  const c = clamp01(t)
  return c * c * (3 - 2 * c)
}

const ramp = (p: number, a: number, b: number) => smoothstep((p - a) / (b - a))

/**
 * Duración de cada transición de la máquina de estados (escritorio): se
 * ejecuta completa de forma automática (~500 ms, rango 400–600), sin
 * detenerse en fotogramas intermedios: escalados, desplazamientos y
 * textos recortados solo existen durante la transición, nunca como estado.
 */
const TRANSITION_MS = 500

/**
 * Máquina de estados discreta de la secuencia (escritorio):
 * entrada → frase 1 fija → frase 2 fija → salida.
 *
 *  - Un gesto de scroll completo (rueda, trackpad) avanza o retrocede
 *    exactamente UN estado, sea cual sea la magnitud del delta: al
 *    aceptarse, la posición del scroll se re-ancla suavemente al centro de
 *    la zona del nuevo estado (un delta enorme no puede salir de la
 *    secuencia ni liberar el sticky por adelantado).
 *  - Cada transición se ejecuta completa en ~500 ms y solo se detiene en
 *    un estado estable: frase completa, centrada y legible (nunca en
 *    escalados, desplazamientos o textos recortados a medias).
 *  - Cada frase permanece fija hasta recibir un nuevo gesto (mínimo 1,5 s
 *    desde que la frase está completa): al dejar de hacer scroll no hay
 *    avance automático. Los gestos recibidos durante el bloqueo o durante
 *    una transición en curso se descartan (la transición no se interrumpe).
 *  - El estado SALIDA no estaciona la composición: ejecuta de corrido la
 *    transformación final y entrega la escena a la 03.
 */
const STATE_TARGETS = [0.1, 0.52, 0.83, 1] as const // entrada · frase 1 · frase 2 · salida
const STATE_ANCHORS = [0.125, 0.375, 0.625, 0.875] as const // centro de la zona de scroll de cada estado
const STATE_COUNT = STATE_TARGETS.length
const SALIDA_IDX = STATE_COUNT - 1
const STATE_LOCK = 1500 // ms mínimos de frase completa antes de aceptar un gesto
const GESTURE_IDLE = 250 // ms sin movimiento para dar el gesto por terminado
const GESTURE_MIN = 8 // px netos mínimos para considerar gesto
const ANCHOR_SUPPRESS = 900 // ms que el scroll programático de re-anclaje no cuenta como gesto

/**
 * Timelines de la coreografía. El ritmo no depende de animaciones sino de
 * la altura de la sección (viewport sticky) y del reparto de los rangos de
 * progreso: sin interceptar la rueda ni cancelar eventos de scroll.
 *
 * - TL_CURRENT (< 1024px): comportamiento previo, sin cambios (progreso
 *   bruto del scroll, sin suavizar).
 * - TL_DESKTOP (≥ 1024px, sección de 560vh): cada estado sigue el patrón
 *   entrada → pausa de lectura (todo en reposo) → salida progresiva. Título
 *   quieto (≈0.08–0.13, objetivo del estado ENTRADA: 0.10), frase 1
 *   (entrada 0.36–0.48, pausa 0.48–0.56, objetivo FRASE 1: 0.52, salida
 *   0.56–0.66), frase 2 (entrada 0.68–0.78, pausa 0.78–0.88, objetivo
 *   FRASE 2: 0.83, salida 0.88–0.94), transformación final 0.88–0.96 y
 *   pausa de la composición 0.96–1 (objetivo SALIDA: 1) antes de la salida
 *   gradual hacia la escena 03 durante la liberación del sticky.
 */
type Timeline = {
  kickerIn: readonly [number, number]
  kickerOut: readonly [number, number]
  titleIn: { base: number; per: number; span: number }
  titleScale: readonly [number, number]
  driftStart: number
  driftDur: number
  titleOut: readonly [number, number]
  p1Scale: readonly [number, number]
  p1In: { base: number; per: number; span: number }
  p1Out: { base: number; per: number; span: number }
  p2In: { base: number; per: number; span: number }
  p2Out: readonly [number, number]
  focusIn: readonly [number, number]
  grow: readonly [number, number]
  fade: readonly [number, number]
  veil: readonly [number, number]
  bloomIn: readonly [number, number]
  bloomOut: readonly [number, number]
  causticAIn: readonly [number, number]
  causticAOut: readonly [number, number]
  causticBIn: readonly [number, number]
  causticBOut: readonly [number, number]
  grainIn: readonly [number, number]
}

const TL_CURRENT: Timeline = {
  kickerIn: [0, 0.07],
  kickerOut: [0.1, 0.2],
  titleIn: { base: 0.004, per: 0.007, span: 0.08 },
  titleScale: [0.14, 0.34],
  driftStart: 0.07,
  driftDur: 1,
  titleOut: [0.3, 0.42],
  p1Scale: [0.34, 0.46],
  p1In: { base: 0.34, per: 0.013, span: 0.09 },
  p1Out: { base: 0.56, per: 0.008, span: 0.08 },
  p2In: { base: 0.68, per: 0.008, span: 0.08 },
  p2Out: [0.83, 0.9],
  focusIn: [0.71, 0.8],
  grow: [0.82, 1],
  fade: [1.04, 1.2],
  veil: [0.84, 1],
  bloomIn: [0.1, 0.45],
  bloomOut: [0.8, 0.96],
  causticAIn: [0.15, 0.55],
  causticAOut: [0.82, 0.95],
  causticBIn: [0.3, 0.7],
  causticBOut: [0.84, 0.96],
  grainIn: [0.05, 0.5],
}

const TL_DESKTOP: Timeline = {
  kickerIn: [0, 0.04],
  kickerOut: [0.13, 0.21],
  titleIn: { base: 0.004, per: 0.005, span: 0.04 },
  titleScale: [0.13, 0.29],
  driftStart: 0.13,
  driftDur: 0.75,
  titleOut: [0.3, 0.38],
  p1Scale: [0.36, 0.48],
  p1In: { base: 0.36, per: 0.009, span: 0.07 },
  p1Out: { base: 0.56, per: 0.006, span: 0.06 },
  p2In: { base: 0.68, per: 0.008, span: 0.06 },
  p2Out: [0.88, 0.92],
  focusIn: [0.7, 0.78],
  grow: [0.88, 0.96],
  fade: [1.02, 1.3],
  veil: [0.88, 0.96],
  bloomIn: [0.13, 0.45],
  bloomOut: [0.86, 0.97],
  causticAIn: [0.16, 0.55],
  causticAOut: [0.87, 0.97],
  causticBIn: [0.28, 0.62],
  causticBOut: [0.88, 0.97],
  grainIn: [0.05, 0.5],
}

/* ------------------------------ Texturas ------------------------------ */

function TextureLayers({
  bloomRef,
  causticARef,
  causticBRef,
  grainRef,
  vignetteRef,
}: {
  bloomRef?: React.RefObject<HTMLDivElement | null>
  causticARef?: React.RefObject<HTMLDivElement | null>
  causticBRef?: React.RefObject<HTMLDivElement | null>
  grainRef?: React.RefObject<HTMLDivElement | null>
  vignetteRef?: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      {/* Bloom de luz difusa (deriva y respira con el recorrido) */}
      <div
        ref={bloomRef}
        className="absolute left-[8%] top-[18%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle,rgba(255,107,74,0.34),rgba(212,193,213,0.16)_45%,transparent_70%)] blur-3xl"
      />
      {/* Bandas de luz desplazadas (textura líquida, dos profundidades) */}
      <div
        ref={causticARef}
        className="absolute -inset-[15%] bg-cover bg-center opacity-0 mix-blend-screen blur-[6px]"
        style={{ backgroundImage: `url("${CAUSTIC_A}")` }}
      />
      <div
        ref={causticBRef}
        className="absolute -inset-[25%] bg-cover bg-center opacity-0 mix-blend-screen blur-[10px]"
        style={{ backgroundImage: `url("${CAUSTIC_B}")` }}
      />
      {/* Grano fotográfico */}
      <div
        ref={grainRef}
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN}")` }}
      />
      {/* Viñeta: profundidad de cámara */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(14,14,13,0.5)_100%)]"
      />
    </div>
  )
}

/* --------------------------------- Escena --------------------------------- */

export default function SceneWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const kickerRef = useRef<HTMLDivElement>(null)
  const titleBlockRef = useRef<HTMLDivElement>(null)
  const titleWordRefs = useRef<Array<HTMLSpanElement | null>>([])
  const p1BlockRef = useRef<HTMLParagraphElement>(null)
  const p1WordRefs = useRef<Array<HTMLSpanElement | null>>([])
  const p2WordRefs = useRef<Array<HTMLSpanElement | null>>([])
  const focusWordRef = useRef<HTMLSpanElement>(null)
  const bloomRef = useRef<HTMLDivElement>(null)
  const causticARef = useRef<HTMLDivElement>(null)
  const causticBRef = useRef<HTMLDivElement>(null)
  const grainRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return

    let rafId = 0
    const cursor = { x: 0, y: 0, tx: 0, ty: 0 }
    const finePointer = window.matchMedia("(pointer: fine)").matches

    const onPointerMove = (event: PointerEvent) => {
      cursor.tx = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2))
      cursor.ty = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2))
    }
    if (finePointer) {
      section.addEventListener("pointermove", onPointerMove, { passive: true })
    }

    // Máquina de estados discreta (escritorio): persiste entre frames.
    let display = 0
    let stateIdx = 0
    let lockUntil = 0
    let inRange = false
    let lastScrollY = window.scrollY
    let gestureActive = false
    let gestureStartY = lastScrollY
    let gestureLastMove = 0
    let suppressUntil = 0
    let tweenFrom = 0
    let tweenStart = 0
    let transitionUntil = 0
    let exitRun = false

    const update = () => {
      const now = performance.now()

      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const total = Math.max(1, rect.height - vh)
      // Progreso extendido: durante la liberación del sticky (pe > 1) la
      // palabra puente termina de disolverse mientras llega la escena 03.
      const pe = -rect.top / total
      const rawP = clamp01(pe)

      const W = stage.clientWidth
      const H = stage.clientHeight
      const desktop = W >= 1024

      // Fuera de pantalla: sincronizar progreso y gestos (nada pinta).
      if (rect.bottom < -80 || rect.top > vh + 80) {
        // Anti-escape: un delta enorme que salte la sección entera de un
        // solo golpe no abandona la secuencia por la fuerza; se vuelve a la
        // zona del estado vigente (salvo en la salida, que es legítima).
        if (inRange && rect.bottom < -80 && stateIdx < SALIDA_IDX && !exitRun) {
          const anchorY = rect.top + window.scrollY + STATE_ANCHORS[stateIdx] * total
          window.scrollTo({ top: anchorY, behavior: "instant" })
          gestureActive = false
          lastScrollY = anchorY
          return
        }
        display = rawP
        inRange = false
        gestureActive = false
        exitRun = false
        lastScrollY = window.scrollY
        return
      }

      // (Re)entrada en la escena: el gesto que la trajo no cuenta; hay
      // bloqueo inicial y la entrada del título es una transición completa.
      if (!inRange) {
        inRange = true
        gestureActive = false
        exitRun = false
        lastScrollY = window.scrollY
        lockUntil = now + STATE_LOCK
        tweenFrom = display
        tweenStart = now
        transitionUntil = now + TRANSITION_MS
      }

      let p: number
      if (desktop) {
        // --- Máquina de estados: un gesto = una transición completa ---
        // Un gesto comienza con el movimiento del scroll y termina tras
        // GESTURE_IDLE ms quieto. Se acepta solo si el bloqueo ha expirado
        // Y no hay transición en curso; avanza o retrocede exactamente un
        // estado (cualquiera que sea el delta) y lanza el tween completo.
        const y = window.scrollY
        if (now < suppressUntil) {
          // Scroll programático de re-anclaje: no cuenta como gesto.
          gestureActive = false
          lastScrollY = y
        } else if (Math.abs(y - lastScrollY) > 0.5) {
          if (!gestureActive) {
            gestureActive = true
            gestureStartY = lastScrollY
          }
          gestureLastMove = now
        } else if (gestureActive && now - gestureLastMove > GESTURE_IDLE) {
          gestureActive = false
          const net = y - gestureStartY
          if (Math.abs(net) > GESTURE_MIN) {
            const busy = now < transitionUntil || now < lockUntil
            let changed = false
            if (!busy) {
              const next = Math.max(0, Math.min(STATE_COUNT - 1, stateIdx + (net > 0 ? 1 : -1)))
              if (next !== stateIdx) {
                stateIdx = next
                // La transición se ejecuta completa en ~TRANSITION_MS y el
                // bloqueo cubre la transición + 1,5 s con la frase completa.
                tweenFrom = display
                tweenStart = now
                transitionUntil = now + TRANSITION_MS
                lockUntil = transitionUntil + STATE_LOCK
                if (stateIdx === SALIDA_IDX) exitRun = true
                changed = true
              }
            }
            // Re-anclaje en todo gesto completado —aceptado o descartado—
            // salvo durante la liberación física: la posición vuelve a la
            // zona del estado vigente, de modo que ni un delta enorme ni
            // una ráfaga de gestos descartados pueden sacar la escena del
            // sticky ni estacionarla fuera de zona.
            if (changed || pe < 1) {
              const anchorY = rect.top + y + STATE_ANCHORS[stateIdx] * total
              if (Math.abs(anchorY - y) > 4) {
                window.scrollTo({ top: anchorY, behavior: "smooth" })
                suppressUntil = now + ANCHOR_SUPPRESS
                gestureActive = false
              }
            }
          }
        }
        lastScrollY = y

        // --- Progreso visual: tween completo por transición ---
        // Nunca se detiene a mitad: cada gesto recorre íntegramente las
        // fases internas del timeline hasta el objetivo del estado (frase
        // completa, centrada y legible). Entre transiciones, quieto.
        const u = clamp01((now - tweenStart) / TRANSITION_MS)
        const eased = u * u * (3 - 2 * u)
        const target = STATE_TARGETS[stateIdx]
        if (u < 1) {
          display = clamp01(tweenFrom + (target - tweenFrom) * eased)
        } else {
          display = target
        }
        // SALIDA no estaciona: al completar la transformación final,
        // entrega la escena a la 03 (scroll físico hacia la liberación).
        if (exitRun && u >= 1 && pe < 1) {
          exitRun = false
          const sectionBottom = rect.bottom + window.scrollY
          const exitY = sectionBottom - vh * 0.6
          window.scrollTo({ top: exitY, behavior: "smooth" })
          suppressUntil = now + ANCHOR_SUPPRESS
          gestureActive = false
        }
        p = display
      } else {
        p = rawP
      }
      const T = desktop ? TL_DESKTOP : TL_CURRENT

      // Interpolación suave del cursor (solo textura, muy sutil).
      cursor.x += (cursor.tx - cursor.x) * 0.05
      cursor.y += (cursor.ty - cursor.y) * 0.05

      /* --- Momento 1 y 2: rótulo y título --- */
      const kickerIn = ramp(p, T.kickerIn[0], T.kickerIn[1])
      const kicker = kickerRef.current
      if (kicker) {
        kicker.style.opacity = (kickerIn * (1 - ramp(p, T.kickerOut[0], T.kickerOut[1]))).toFixed(3)
        kicker.style.transform = `translateY(${((1 - kickerIn) * 12).toFixed(1)}px)`
      }
      const titleBlock = titleBlockRef.current
      if (titleBlock) {
        titleBlock.style.transform = `scale(${(1 + 0.14 * ramp(p, T.titleScale[0], T.titleScale[1])).toFixed(3)})`
      }
      const titleOut = ramp(p, T.titleOut[0], T.titleOut[1])
      TITLE_WORDS.forEach((word, i) => {
        const el = titleWordRefs.current[i]
        if (!el) return
        const tIn = ramp(p, T.titleIn.base + i * T.titleIn.per, T.titleIn.base + T.titleIn.span + i * T.titleIn.per)
        const tDrift = ramp(p, T.driftStart + word.off, T.driftStart + word.off + word.dur * T.driftDur)
        const dx = ((word.dx * tDrift) / 100) * W
        const dy = ((word.dy * tDrift) / 100) * H + (1 - tIn) * 46
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) rotate(${(word.rot * tDrift).toFixed(2)}deg) scale(${(1 + (word.sc - 1) * tDrift).toFixed(3)})`
        el.style.opacity = (tIn * (1 - titleOut)).toFixed(3)
      })

      /* --- Momento 3: primera frase (revelado por máscaras) --- */
      const p1Block = p1BlockRef.current
      if (p1Block) {
        p1Block.style.transform = `scale(${(0.97 + 0.03 * ramp(p, T.p1Scale[0], T.p1Scale[1])).toFixed(3)})`
      }
      PHRASE_1.forEach((_, i) => {
        const el = p1WordRefs.current[i]
        if (!el) return
        const wIn = ramp(p, T.p1In.base + i * T.p1In.per, T.p1In.base + T.p1In.span + i * T.p1In.per)
        const wOut = ramp(p, T.p1Out.base + i * T.p1Out.per, T.p1Out.base + T.p1Out.span + i * T.p1Out.per)
        const y = (1 - wIn) * 110 - wOut * 110
        el.style.transform = `translateY(${y.toFixed(1)}%)`
      })

      /* --- Momento 4 y 5: segunda frase; «entendiendo» como puente --- */
      PHRASE_2.forEach((word) => {
        if (word.focus) return
        const el = p2WordRefs.current[word.mi]
        if (!el) return
        const wIn = ramp(p, T.p2In.base + word.mi * T.p2In.per, T.p2In.base + T.p2In.span + word.mi * T.p2In.per)
        const wOut = ramp(p, T.p2Out[0], T.p2Out[1])
        const y = (1 - wIn) * 110 - wOut * 36
        el.style.transform = `translateY(${y.toFixed(1)}%)`
        el.style.opacity = (wIn * (1 - wOut)).toFixed(3)
      })
      const focus = focusWordRef.current
      if (focus) {
        const tIn = ramp(p, T.focusIn[0], T.focusIn[1])
        // El crecimiento sigue el progreso visual (display): completa en el
        // estado SALIDA aunque el scroll físico quede anclado en su zona.
        const grow = ramp(p, T.grow[0], T.grow[1])
        // La disolución final sí sigue pe: es la salida física hacia la 03.
        const fade = 1 - ramp(pe, T.fade[0], T.fade[1])
        const scale = (0.92 + 0.08 * tIn) * (1 + 2 * grow)
        const dx = -0.1 * W * grow
        const dy = -0.2 * H * grow
        focus.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${scale.toFixed(3)})`
        focus.style.opacity = (tIn * fade).toFixed(3)
        focus.style.filter = `blur(${((1 - tIn) * 9).toFixed(1)}px)`
      }

      /* --- Textura: luz, grano y profundidad en evolución --- */
      const bloom = bloomRef.current
      if (bloom) {
        const op = ramp(p, T.bloomIn[0], T.bloomIn[1]) * 0.6 * (1 - ramp(p, T.bloomOut[0], T.bloomOut[1]))
        bloom.style.opacity = op.toFixed(3)
        bloom.style.transform = `translate(${(((p * 13 - 5) / 100) * W + cursor.x * 10).toFixed(1)}px, ${(((4 - p * 8) / 100) * H + cursor.y * 8).toFixed(1)}px) scale(${(0.8 + 0.5 * p).toFixed(3)})`
      }
      const causticA = causticARef.current
      if (causticA) {
        causticA.style.opacity = (ramp(p, T.causticAIn[0], T.causticAIn[1]) * 0.34 * (1 - ramp(p, T.causticAOut[0], T.causticAOut[1]))).toFixed(3)
        causticA.style.transform = `scale(${(1 + p * 0.15).toFixed(3)}) rotate(${(p * 6 - 3).toFixed(2)}deg)`
      }
      const causticB = causticBRef.current
      if (causticB) {
        causticB.style.opacity = (ramp(p, T.causticBIn[0], T.causticBIn[1]) * 0.22 * (1 - ramp(p, T.causticBOut[0], T.causticBOut[1]))).toFixed(3)
        causticB.style.transform = `scale(${(1.1 - p * 0.1).toFixed(3)}) rotate(${(-p * 5).toFixed(2)}deg)`
      }
      const grain = grainRef.current
      if (grain) {
        grain.style.opacity = (0.03 + 0.06 * ramp(p, T.grainIn[0], T.grainIn[1])).toFixed(3)
      }

      /* --- Momento 5: del berenjena al marfil de la escena 03 --- */
      // El velo toma también un cierre guiado por pe durante la liberación
      // del sticky: el marfil se completa antes de que la escena 03 llene
      // la pantalla, sea cual sea la velocidad a la que se haya recorrido.
      const veilOp = Math.max(ramp(p, T.veil[0], T.veil[1]), ramp(pe, 1, 1.12))
      const veil = veilRef.current
      if (veil) {
        veil.style.opacity = veilOp.toFixed(3)
      }
      const vignette = vignetteRef.current
      if (vignette) {
        vignette.style.opacity = (1 - veilOp).toFixed(3)
      }
    }

    const tick = () => {
      update()
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      if (finePointer) {
        section.removeEventListener("pointermove", onPointerMove)
      }
    }
  }, [reduced])

  /* ---------------- Movimiento reducido: secuencia estática ---------------- */
  if (reduced) {
    return (
      <section
        id="escena-2"
        ref={sectionRef}
        aria-labelledby="titulo-escena-2"
        className="relative w-full scroll-mt-28 overflow-hidden bg-primary-container text-on-surface"
      >
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <div className="absolute left-[8%] top-[10%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle,rgba(255,107,74,0.3),rgba(212,193,213,0.14)_45%,transparent_70%)] blur-3xl" />
            <div className="absolute -inset-[15%] bg-cover bg-center opacity-[0.28] mix-blend-screen blur-[6px]" style={{ backgroundImage: `url("${CAUSTIC_A}")` }} />
            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: `url("${GRAIN}")` }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(14,14,13,0.5)_100%)]" />
          </div>
          <div className="relative mx-auto w-full max-w-7xl px-margin-mobile md:px-margin-tablet lg:px-margin">
            <div data-frame-target className="pt-20 md:pt-28">
              <div className="flex items-center gap-space-sm pb-space-xs font-sans text-label-technical font-semibold uppercase tracking-widest text-tertiary">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame-orange" />
                <span>Escena 02 · La parte que no se ve</span>
              </div>
              <h2
                id="titulo-escena-2"
                className="max-w-5xl font-serif text-[2.5rem] leading-[1.08] tracking-[-0.02em] text-on-surface sm:text-[3.5rem] lg:text-[4.5rem]"
              >
                La técnica como{" "}
                <span className="font-light italic text-primary">artesanía de lo invisible</span>.
              </h2>
            </div>
            <p className="flex min-h-[55vh] items-center font-serif text-[1.9rem] leading-[1.25] text-on-surface sm:text-[2.75rem] lg:text-[3.5rem]">
              El trabajo no empieza en la pantalla.
            </p>
            <p className="flex min-h-[65vh] flex-wrap items-center gap-x-[0.28em] pb-24 font-serif text-[1.9rem] leading-[1.25] text-on-surface sm:text-[2.75rem] lg:text-[3.5rem]">
              Empieza{" "}
              <span className="text-[1.5em] font-light italic leading-none text-flame-orange">
                entendiendo
              </span>{" "}
              qué tiene que funcionar.
            </p>
          </div>
        </div>
      </section>
    )
  }

  /* ------------------- Coreografía por scroll (sticky) ------------------- */
  const maskStyle: CSSProperties = { transform: "translateY(110%)" }

  return (
    <section
      id="escena-2"
      ref={sectionRef}
      aria-labelledby="titulo-escena-2"
      className="relative h-[240vh] w-full scroll-mt-28 bg-primary-container text-on-surface sm:h-[300vh] lg:h-[560vh]"
    >
      <div ref={stageRef} className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Textura abstracta en evolución (luz, grano, desenfoques) */}
        <TextureLayers
          bloomRef={bloomRef}
          causticARef={causticARef}
          causticBRef={causticBRef}
          grainRef={grainRef}
          vignetteRef={vignetteRef}
        />

        {/* Momento 1–2: rótulo y título (palabras con deriva propia) */}
        <div
          ref={titleBlockRef}
          data-frame-target
          className="absolute inset-x-0 top-[13%] z-10 px-margin-mobile md:px-margin-tablet lg:px-margin"
          style={{ transform: "scale(1)" }}
        >
          <div
            ref={kickerRef}
            className="flex items-center gap-space-sm pb-space-xs font-sans text-label-technical font-semibold uppercase tracking-widest text-tertiary"
            style={{ opacity: 1 }}
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame-orange" />
            <span>Escena 02 · La parte que no se ve</span>
          </div>
          <h2
            id="titulo-escena-2"
            className="flex max-w-6xl flex-wrap gap-x-[0.26em] font-serif text-[2.6rem] leading-[1.08] tracking-[-0.02em] text-on-surface sm:text-[3.9rem] lg:text-[5.4rem]"
          >
            {TITLE_WORDS.map((word, i) => (
              <span
                key={word.text}
                ref={(el) => {
                  titleWordRefs.current[i] = el
                }}
                className={`inline-block will-change-transform ${
                  word.italic ? "font-light italic text-primary" : ""
                }`}
              >
                {word.text}
              </span>
            )).flatMap((node, i) => (i === 0 ? [node] : [" ", node]))}
          </h2>
        </div>

        {/* Momento 3: primera frase, centrada, revelado por máscaras */}
        <p
          ref={p1BlockRef}
          className="absolute inset-0 z-10 flex flex-wrap items-center justify-center gap-x-[0.28em] px-margin-mobile font-serif text-[1.9rem] leading-[1.25] text-on-surface sm:text-[2.75rem] sm:px-margin-tablet lg:px-margin lg:text-[3.5rem]"
          style={{ transform: "scale(0.97)" }}
        >
          {PHRASE_1.map((text, i) => (
            <span key={text} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <span ref={(el) => { p1WordRefs.current[i] = el }} className="inline-block will-change-transform" style={maskStyle}>
                {text}
              </span>
            </span>
          )).flatMap((node, i) => (i === 0 ? [node] : [" ", node]))}
        </p>

        {/* Momento 4–5: segunda frase; «entendiendo» crece como puente */}
        <p className="absolute inset-0 z-10 flex flex-wrap items-center justify-center gap-x-[0.28em] px-margin-mobile font-serif text-[1.9rem] leading-[1.25] text-on-surface sm:text-[2.75rem] sm:px-margin-tablet lg:px-margin lg:text-[3.5rem]">
          {PHRASE_2.map((word) =>
            word.focus ? (
              <span
                key={word.text}
                ref={focusWordRef}
                className="relative z-30 inline-block text-[1.5em] font-light italic leading-none text-flame-orange will-change-transform"
                style={{ opacity: 0, transform: "scale(0.92)", filter: "blur(9px)" }}
              >
                {word.text}
              </span>
            ) : (
              <span key={word.text} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                <span
                  ref={(el) => {
                    p2WordRefs.current[word.mi] = el
                  }}
                  className="inline-block will-change-transform"
                  style={{ ...maskStyle, opacity: 0 }}
                >
                  {word.text}
                </span>
              </span>
            ),
          ).flatMap((node, i) => (i === 0 ? [node] : [" ", node]))}
        </p>

        {/* Momento 5: velo marfil — entrega exacta al fondo de la escena 03 */}
        <div ref={veilRef} aria-hidden="true" className="absolute inset-0 z-[5] bg-paper-dim opacity-0" />
      </div>
    </section>
  )
}

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
 * - Las dos frases jamás se solapan (ventanas de scroll disjuntas).
 * - Escritorio: reacción mínima de la textura al cursor; el texto se
 *   mueve únicamente con el scroll.
 * - Móvil: coreografía simplificada, escalas ajustadas, sticky más corto.
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
 * del escenario, rotación y escala, con ventanas escalonadas — cada palabra
 * viaja a su velocidad; las de los extremos quedan recortadas por el borde.
 */
const TITLE_WORDS = [
  { text: "La", italic: false, dx: -6, dy: -8, rot: -2, sc: 1.06, w: [0.1, 0.3] },
  { text: "técnica", italic: false, dx: -32, dy: 4, rot: -9, sc: 1.18, w: [0.12, 0.34] },
  { text: "como", italic: false, dx: -4, dy: 9, rot: -2, sc: 1.04, w: [0.08, 0.28] },
  { text: "artesanía", italic: true, dx: 9, dy: -15, rot: 4, sc: 1.12, w: [0.11, 0.33] },
  { text: "de", italic: true, dx: 4, dy: -5, rot: 2, sc: 1.05, w: [0.09, 0.29] },
  { text: "lo", italic: true, dx: -3, dy: 6, rot: -1, sc: 1.03, w: [0.07, 0.27] },
  { text: "invisible.", italic: true, dx: 34, dy: 16, rot: 8, sc: 1.22, w: [0.13, 0.36] },
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

    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      // Fuera de pantalla: nada que recalcular este frame.
      if (rect.bottom < -80 || rect.top > vh + 80) return

      const total = Math.max(1, rect.height - vh)
      // Progreso extendido: durante la liberación del sticky (pe > 1) la
      // palabra puente termina de disolverse mientras llega la escena 03.
      const pe = -rect.top / total
      const p = clamp01(pe)
      const W = stage.clientWidth
      const H = stage.clientHeight

      // Interpolación suave del cursor (solo textura, muy sutil).
      cursor.x += (cursor.tx - cursor.x) * 0.05
      cursor.y += (cursor.ty - cursor.y) * 0.05

      /* --- Momento 1 y 2: rótulo y título --- */
      const kickerIn = ramp(p, 0, 0.07)
      const kicker = kickerRef.current
      if (kicker) {
        kicker.style.opacity = (kickerIn * (1 - ramp(p, 0.1, 0.2))).toFixed(3)
        kicker.style.transform = `translateY(${((1 - kickerIn) * 12).toFixed(1)}px)`
      }
      const titleBlock = titleBlockRef.current
      if (titleBlock) {
        titleBlock.style.transform = `scale(${(1 + 0.14 * ramp(p, 0.14, 0.34)).toFixed(3)})`
      }
      const titleOut = ramp(p, 0.3, 0.42)
      TITLE_WORDS.forEach((word, i) => {
        const el = titleWordRefs.current[i]
        if (!el) return
        const tIn = ramp(p, 0.004 + i * 0.007, 0.084 + i * 0.007)
        const tDrift = ramp(p, word.w[0], word.w[1])
        const dx = ((word.dx * tDrift) / 100) * W
        const dy = ((word.dy * tDrift) / 100) * H + (1 - tIn) * 46
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) rotate(${(word.rot * tDrift).toFixed(2)}deg) scale(${(1 + (word.sc - 1) * tDrift).toFixed(3)})`
        el.style.opacity = (tIn * (1 - titleOut)).toFixed(3)
      })

      /* --- Momento 3: primera frase (revelado por máscaras) --- */
      const p1Block = p1BlockRef.current
      if (p1Block) {
        p1Block.style.transform = `scale(${(0.97 + 0.03 * ramp(p, 0.34, 0.46)).toFixed(3)})`
      }
      PHRASE_1.forEach((_, i) => {
        const el = p1WordRefs.current[i]
        if (!el) return
        const wIn = ramp(p, 0.34 + i * 0.013, 0.43 + i * 0.013)
        const wOut = ramp(p, 0.56 + i * 0.008, 0.64 + i * 0.008)
        const y = (1 - wIn) * 110 - wOut * 110
        el.style.transform = `translateY(${y.toFixed(1)}%)`
      })

      /* --- Momento 4 y 5: segunda frase; «entendiendo» como puente --- */
      PHRASE_2.forEach((word) => {
        if (word.focus) return
        const el = p2WordRefs.current[word.mi]
        if (!el) return
        const wIn = ramp(p, 0.68 + word.mi * 0.008, 0.76 + word.mi * 0.008)
        const wOut = ramp(p, 0.83, 0.9)
        const y = (1 - wIn) * 110 - wOut * 36
        el.style.transform = `translateY(${y.toFixed(1)}%)`
        el.style.opacity = (wIn * (1 - wOut)).toFixed(3)
      })
      const focus = focusWordRef.current
      if (focus) {
        const tIn = ramp(p, 0.71, 0.8)
        const grow = ramp(pe, 0.82, 1)
        const fade = 1 - ramp(pe, 1.04, 1.2)
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
        const op = ramp(p, 0.1, 0.45) * 0.6 * (1 - ramp(p, 0.8, 0.96))
        bloom.style.opacity = op.toFixed(3)
        bloom.style.transform = `translate(${(((p * 13 - 5) / 100) * W + cursor.x * 10).toFixed(1)}px, ${(((4 - p * 8) / 100) * H + cursor.y * 8).toFixed(1)}px) scale(${(0.8 + 0.5 * p).toFixed(3)})`
      }
      const causticA = causticARef.current
      if (causticA) {
        causticA.style.opacity = (ramp(p, 0.15, 0.55) * 0.34 * (1 - ramp(p, 0.82, 0.95))).toFixed(3)
        causticA.style.transform = `scale(${(1 + p * 0.15).toFixed(3)}) rotate(${(p * 6 - 3).toFixed(2)}deg)`
      }
      const causticB = causticBRef.current
      if (causticB) {
        causticB.style.opacity = (ramp(p, 0.3, 0.7) * 0.22 * (1 - ramp(p, 0.84, 0.96))).toFixed(3)
        causticB.style.transform = `scale(${(1.1 - p * 0.1).toFixed(3)}) rotate(${(-p * 5).toFixed(2)}deg)`
      }
      const grain = grainRef.current
      if (grain) {
        grain.style.opacity = (0.03 + 0.06 * ramp(p, 0.05, 0.5)).toFixed(3)
      }

      /* --- Momento 5: del berenjena al marfil de la escena 03 --- */
      const veilOp = ramp(p, 0.84, 1)
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
      className="relative h-[240vh] w-full scroll-mt-28 bg-primary-container text-on-surface sm:h-[300vh]"
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

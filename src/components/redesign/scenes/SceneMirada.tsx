"use client"

import { useEffect, useRef } from "react"
import { Camera } from "lucide-react"
import { usePrefersReducedMotion } from "../usePrefersReducedMotion"

/**
 * Escena 04 — Mirada personal (inmersión cinematográfica, 35 mm).
 *
 * Reconstrucción de la ESCENA 4 de Stitch con una coreografía de scroll
 * de lenguaje fotográfico (nundo VHS ni glitch digital): la escena es un
 * plano de película que se revela, permanece y cierra.
 *
 *  - Entrada (desde la escena clara anterior): la composición pierde
 *    luminosidad, un destello cálido breve (quemadura de película) con
 *    grano, polvo, un par de rayas verticales y un salto mínimo de
 *    fotograma; el fondo pasa a negro y desde él se revela el plano.
 *  - Entrada del plano: el marco emerge del negro, el punto de REC se
 *    enciende, el título alcanza el foco con el scroll y los textos
 *    secundarios aparecen después, con un desfase breve.
 *  - Permanencia: acercamiento muy sutil del marco, grano ligero en
 *    movimiento, variación mínima de exposición y REC parpadeando de
 *    forma lenta y discreta.
 *  - Salida: el marco escala hasta superar los límites de la pantalla,
 *    el texto pierde foco y se desvanece, y dos bandas oscuras cierran
 *    como una cortinilla para volver a abrirse ya sobre la escena 05.
 *
 * Todo está vinculado al progreso del scroll (nada se reproduce solo al
 * cargar). El cálculo por frame usa requestAnimationFrame + mutación
 * directa de estilos (patrón del marco conductor). El overlay de
 * transición es `position: fixed` (no afecta al layout ni a la altura) y
 * se sitúa bajo la navegación (z-45 < z-50), que permanece legible.
 *
 * Con `prefers-reduced-motion` la secuencia se sustituye por fundidos
 * breves entre escenas, sin saltos, escalados ni parpadeos, y el contenido
 * se muestra completo y legible.
 */

/** Grano fotográfico (ruido fractal SVG en data-URI). */
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E"

/** Polvo y pelusillas sobre el fotograma (motas dispersas). */
const DUST =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Cg fill='%23EDE8E0' fill-opacity='0.5'%3E%3Ccircle cx='40' cy='30' r='1.2'/%3E%3Ccircle cx='150' cy='70' r='0.8'/%3E%3Ccircle cx='260' cy='40' r='1'/%3E%3Ccircle cx='90' cy='140' r='0.7'/%3E%3Ccircle cx='210' cy='120' r='1.3'/%3E%3Ccircle cx='300' cy='160' r='0.9'/%3E%3Ccircle cx='20' cy='100' r='0.8'/%3E%3Ccircle cx='180' cy='20' r='0.6'/%3E%3C/g%3E%3Cg stroke='%23EDE8E0' stroke-opacity='0.35' stroke-width='0.6'%3E%3Cline x1='70' y1='50' x2='74' y2='44'/%3E%3Cline x1='240' y1='90' x2='245' y2='96'/%3E%3Cline x1='120' y1='160' x2='124' y2='155'/%3E%3C/g%3E%3C/svg%3E"

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const smoothstep = (t: number) => {
  const c = clamp01(t)
  return c * c * (3 - 2 * c)
}

const ramp = (p: number, a: number, b: number) => smoothstep((p - a) / (b - a))

/* Animaciones ambientales discretas (detenidas por la regla global de
   prefers-reduced-motion): parpadeo lento del REC y deriva del grano. */
const KEYFRAMES = `
@keyframes rec-blink { 0%, 100% { opacity: 1 } 50% { opacity: 0.28 } }
.rec-blink { animation: rec-blink 2.6s ease-in-out infinite; }
@keyframes mirada-grain {
  0% { transform: translate(0, 0) }
  20% { transform: translate(-3%, 2%) }
  40% { transform: translate(2%, -3%) }
  60% { transform: translate(-2%, -2%) }
  80% { transform: translate(3%, 1%) }
  100% { transform: translate(0, 0) }
}
.mirada-grain { animation: mirada-grain 0.9s steps(1, end) infinite; }
`

export default function SceneMirada() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const grainRef = useRef<HTMLDivElement>(null)
  const exposureRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const dimRef = useRef<HTMLDivElement>(null)
  const burnRef = useRef<HTMLDivElement>(null)
  const artifactsRef = useRef<HTMLDivElement>(null)
  const blackRef = useRef<HTMLDivElement>(null)
  const bandTopRef = useRef<HTMLDivElement>(null)
  const bandBottomRef = useRef<HTMLDivElement>(null)
  const dipRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let rafId = 0

    const setOpacity = (el: HTMLElement | null, value: number) => {
      if (el) el.style.opacity = value.toFixed(3)
    }

    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.bottom < -80 || rect.top > vh + 80) return

      const mobile = window.innerWidth < 640

      /* ---------- Movimiento reducido: fundidos breves ---------- */
      if (reduced) {
        const dip = dipRef.current
        if (!dip) return
        // Fundido de entrada: oscurece el límite con la escena 03 y se abre
        // con la propia escena ya en pantalla.
        const qIn = clamp01((vh - rect.top) / vh)
        const inDip = ramp(qIn, 0.15, 0.5) * (1 - ramp(qIn, 0.55, 0.95)) * 0.85
        // Fundido de salida: breve oscurecimiento en el límite con la 05.
        const rOut = clamp01(1 - rect.bottom / vh)
        const outDip = ramp(rOut, 0.55, 0.8) * (1 - ramp(rOut, 0.85, 1)) * 0.7
        const op = Math.max(inDip, outDip)
        dip.style.opacity = op.toFixed(3)
        dip.style.visibility = op > 0.01 ? "visible" : "hidden"
        return
      }

      const stage = stageRef.current
      if (!stage) return

      /* --- Progresos: entrada (q), plano pinneado (p), liberación (pe) --- */
      const q = clamp01((vh - rect.top) / (vh * 0.9))
      const total = Math.max(1, rect.height - vh)
      const pe = -rect.top / total
      const p = clamp01(pe)

      /* ---------- Transición de entrada: película quemada ---------- */
      // Los velos de la entrada se disipan con el revelado del plano (p),
      // de modo que nada queda activo una vez pasada la secuencia.
      const dim = ramp(q, 0.05, 0.5) * 0.8 * (1 - ramp(p, 0, 0.12))
      setOpacity(dimRef.current, dim)
      // Destello cálido breve (quemadura), algo más contenido en móvil.
      const burnWin = mobile ? [0.5, 0.58, 0.66] : [0.45, 0.53, 0.66]
      const burn = ramp(q, burnWin[0], burnWin[1]) * (1 - ramp(q, burnWin[1], burnWin[2]))
      const burnEl = burnRef.current
      if (burnEl) {
        burnEl.style.opacity = (burn * (mobile ? 0.75 : 1)).toFixed(3)
        burnEl.style.transform = `scale(${(0.55 + 0.7 * ramp(q, burnWin[0], burnWin[2])).toFixed(3)})`
      }
      // Grano, polvo, rayas y salto mínimo de fotograma (simplificado en móvil).
      const artifacts = ramp(q, 0.48, 0.58) * (1 - ramp(q, 0.7, 0.78))
      const artifactsEl = artifactsRef.current
      if (artifactsEl) {
        artifactsEl.style.opacity = artifacts.toFixed(3)
        const jump = !mobile && q > 0.5 && q < 0.6 ? -5 : 0
        artifactsEl.style.transform = `translateY(${jump}px)`
      }
      // Negro: el fotograma se corta y se abre de nuevo con el plano ya
      // pinneado (el valor de entrada decae con el revelado).
      const blackQ = ramp(q, 0.62, 0.8)
      const black = blackQ * (1 - ramp(p, 0, 0.18))
      setOpacity(blackRef.current, black)

      /* ---------- Entrada del plano (desde el negro) ---------- */
      const frame = frameRef.current
      if (frame) {
        const op = ramp(p, 0.02, 0.12)
        // Revelado + acercamiento sutil de permanencia + escalado de salida.
        const zoom = 1.035 - 0.035 * ramp(p, 0, 0.3) + 0.045 * ramp(p, 0.25, 0.75)
        const exitScale = ramp(p, 0.78, 1) * (mobile ? 0.55 : 1.35)
        const y = (1 - ramp(p, 0.02, 0.18)) * 14
        frame.style.opacity = op.toFixed(3)
        frame.style.transform = `translateY(${y.toFixed(1)}px) scale(${(zoom + exitScale).toFixed(3)})`
      }
      // El punto de REC se enciende.
      const dot = dotRef.current
      if (dot) {
        const ignite = ramp(p, 0.12, 0.24)
        dot.style.opacity = (ignite * (1 - ramp(p, 0.78, 0.88))).toFixed(3)
        dot.style.transform = `scale(${(1.8 - 0.8 * ignite).toFixed(3)})`
      }
      // El título alcanza el foco con el scroll (bloque completo, no palabras).
      const title = titleRef.current
      if (title) {
        const focus = ramp(p, 0.06, 0.3)
        const out = ramp(p, 0.8, 0.95)
        const blur = (1 - focus) * 6 + out * 7
        const op = ramp(p, 0.06, 0.22) * (1 - out)
        const y = (1 - ramp(p, 0.06, 0.22)) * 10 - out * 8
        title.style.filter = `blur(${blur.toFixed(2)}px)`
        title.style.opacity = op.toFixed(3)
        title.style.transform = `translateY(${y.toFixed(1)}px)`
      }
      // Los textos secundarios, después del título, con un desfase breve.
      for (const el of [labelRef.current, paragraphRef.current, footerRef.current]) {
        if (!el) continue
        const inS = ramp(p, 0.24, 0.4)
        const outS = ramp(p, 0.78, 0.88)
        el.style.opacity = (inS * (1 - outS)).toFixed(3)
        el.style.transform = `translateY(${((1 - inS) * 16).toFixed(1)}px)`
      }

      /* ---------- Permanencia ---------- */
      setOpacity(
        grainRef.current,
        0.12 * ramp(p, 0.15, 0.3) * (1 - ramp(p, 0.85, 0.97)),
      )
      // Variación mínima de exposición, ligada al scroll.
      const exposure =
        (0.02 + 0.045 * (0.5 + 0.5 * Math.sin(p * Math.PI * 2.6))) *
        ramp(p, 0.2, 0.35) *
        (1 - ramp(p, 0.85, 0.95))
      setOpacity(exposureRef.current, exposure)

      /* ---------- Salida: cortinilla hacia la escena 05 ---------- */
      const close = ramp(p, 0.8, 0.93)
      const reopen = ramp(pe, 1, 1.42)
      const bandH = 0.56 * vh * close * (1 - reopen)
      if (bandTopRef.current) bandTopRef.current.style.height = `${bandH.toFixed(1)}px`
      if (bandBottomRef.current) bandBottomRef.current.style.height = `${bandH.toFixed(1)}px`

      // El overlay solo pinta cuando algo está activo.
      const overlay = overlayRef.current
      if (overlay) {
        const active =
          dim > 0.01 || burn > 0.01 || artifacts > 0.01 || black > 0.01 || bandH > 0.5
        overlay.style.visibility = active ? "visible" : "hidden"
      }
    }

    const tick = () => {
      update()
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [reduced])

  /* -------- Contenido del plano (idéntico en ambas versiones) -------- */
  const shot = (
    <>
      <div className="mb-space-md flex items-center justify-between font-sans text-label-technical font-semibold uppercase tracking-widest text-tertiary">
        <span className="flex items-center gap-1.5">
          <span ref={dotRef} aria-hidden="true" className="inline-flex">
            <span className="rec-blink h-2 w-2 rounded-full bg-flame-orange" />
          </span>
          Rec · 35 mm
        </span>
      </div>

      <p ref={labelRef} className="mb-space-xs block font-sans text-caption font-semibold uppercase tracking-widest text-flame-orange">
        Otra forma de mirar
      </p>
      <h2
        ref={titleRef}
        id="titulo-escena-4"
        className="mx-auto mb-space-md max-w-2xl font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-on-surface lg:text-headline-xl"
      >
        El encuadre no <span className="font-light italic text-tertiary">termina en el código</span>.
      </h2>
      <p ref={paragraphRef} className="mx-auto max-w-xl font-sans text-body-lead leading-relaxed text-on-surface-variant">
        Programar también es elegir dónde mirar: cambiar la perspectiva, encontrar un orden
        entre lo disperso y dejar espacio a lo que importa.
      </p>
      <div ref={footerRef} className="mt-space-lg flex items-center justify-center gap-space-sm pt-space-sm font-sans text-label-technical font-semibold uppercase tracking-widest text-on-surface-variant/70">
        <Camera size={14} className="text-tertiary" aria-hidden="true" />
        <span>Mirada · estructura · sentido</span>
      </div>
    </>
  )

  /* ---------- Movimiento reducido: composición estática legible ---------- */
  if (reduced) {
    return (
      <section
        id="escena-4"
        ref={sectionRef}
        aria-labelledby="titulo-escena-4"
        className="relative flex min-h-[85vh] w-full scroll-mt-28 items-center justify-center overflow-hidden bg-deep-forest text-on-surface lg:min-h-screen"
      >
        <style>{KEYFRAMES}</style>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#1e3024_0%,transparent_60%),radial-gradient(ellipse_at_75%_80%,#0d1f14_0%,transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-rich-ink/70 via-deep-forest/40 to-rich-ink/85 mix-blend-multiply"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-primary-container/20" />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-margin-mobile py-24 text-center md:px-margin-tablet lg:px-margin">
          <div
            data-frame-target
            className="relative w-full max-w-3xl bg-surface-container-lowest/40 p-8 shadow-2xl backdrop-blur-md md:p-14"
          >
            {shot}
          </div>
        </div>
        {/* Fundido breve en el límite con la escena 03 (solo fundidos) */}
        <div
          ref={dipRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[45] bg-[#0a0a0a] opacity-0"
          style={{ visibility: "hidden" }}
        />
      </section>
    )
  }

  /* ---------- Coreografía cinematográfica dirigida por el scroll ---------- */
  return (
    <section
      id="escena-4"
      ref={sectionRef}
      aria-labelledby="titulo-escena-4"
      className="relative h-[220vh] w-full scroll-mt-28 bg-deep-forest text-on-surface sm:h-[260vh]"
    >
      <style>{KEYFRAMES}</style>

      {/* El plano: sticky mientras dura la secuencia */}
      <div ref={stageRef} className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden">
        {/* Atmósfera de bosque generada con CSS (sin imagen externa) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#1e3024_0%,transparent_60%),radial-gradient(ellipse_at_75%_80%,#0d1f14_0%,transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-rich-ink/70 via-deep-forest/40 to-rich-ink/85 mix-blend-multiply"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-primary-container/20" />

        {/* Contenido del plano (marco conductor sobre la tarjeta) */}
        <div
          ref={frameRef}
          className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-margin-mobile py-24 text-center will-change-transform md:px-margin-tablet lg:px-margin"
        >
          <div
            data-frame-target
            className="relative w-full max-w-3xl bg-surface-container-lowest/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 md:p-14"
          >
            {shot}
          </div>
        </div>

        {/* Grano ligero en movimiento y variación mínima de exposición */}
        <div
          ref={grainRef}
          aria-hidden="true"
          className="mirada-grain absolute -inset-8 z-20 opacity-0 mix-blend-overlay"
          style={{ backgroundImage: `url("${GRAIN}")` }}
        />
        <div ref={exposureRef} aria-hidden="true" className="absolute inset-0 z-20 bg-[#0a0806] opacity-0" />
      </div>

      {/*
       * Overlay cinematográfico (fixed: no altera layout ni altura).
       * Dimensión → quemadura → grano/polvo/rayas/salto → negro → cortinilla.
       * Bajo la navegación (z-45 < z-50) y sin eventos de puntero.
       */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[45]"
        style={{ visibility: "hidden" }}
      >
        {/* Pérdida progresiva de luminosidad (velo cálido oscuro) */}
        <div ref={dimRef} className="absolute inset-0 bg-[#17100c] opacity-0" />
        {/* Destello breve: quemadura de película (centro caliente) */}
        <div
          ref={burnRef}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,120,70,0.92),rgba(232,83,56,0.45)_40%,transparent_68%)] opacity-0 mix-blend-screen will-change-transform"
        />
        {/* Grano fuerte, polvo, rayas verticales y salto de fotograma */}
        <div ref={artifactsRef} className="absolute inset-0 opacity-0 will-change-transform">
          <div className="absolute inset-0 opacity-[0.22] mix-blend-overlay" style={{ backgroundImage: `url("${GRAIN}")` }} />
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: `url("${DUST}")`, backgroundSize: "45% 45%" }} />
          <span aria-hidden="true" className="absolute left-[22%] top-0 h-[72%] w-px bg-paper-dim/20" />
          <span aria-hidden="true" className="absolute left-[71%] top-[10%] hidden h-[65%] w-px bg-paper-dim/15 sm:block" />
        </div>
        {/* Negro entre la quemadura y el revelado del plano */}
        <div ref={blackRef} className="absolute inset-0 bg-[#050505] opacity-0" />
        {/* Cortinilla de salida: dos bandas desde arriba y abajo */}
        <div ref={bandTopRef} className="absolute inset-x-0 top-0 h-0 border-b border-paper-dim/5 bg-[#060607]" />
        <div ref={bandBottomRef} className="absolute inset-x-0 bottom-0 h-0 border-t border-paper-dim/5 bg-[#060607]" />
      </div>
    </section>
  )
}

import { Camera } from "lucide-react"

/**
 * Escena 04 — Mirada personal (inmersión cinematográfica).
 * Reconstrucción de la ESCENA 4 de Stitch.
 * El fondo de bosque de la propuesta era una imagen externa no disponible;
 * se sustituye por una atmósfera de gradientes CSS.
 *
 * Contenido textual definitivo (revisado): la escena expresa la mirada
 * detrás del trabajo sin afirmar una práctica profesional de fotografía
 * o vídeo.
 *  - TODO(recursos): falta la imagen de fondo cinematográfica (la de Stitch
 *    es una URL externa de Google que no debe reutilizarse).
 */
export default function SceneMirada() {
  return (
    <section
      id="escena-4"
      aria-labelledby="titulo-escena-4"
      className="relative flex min-h-[85vh] w-full scroll-mt-28 items-center justify-center overflow-hidden bg-deep-forest text-on-surface lg:min-h-screen"
    >
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

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-margin-mobile py-24 text-center md:px-margin-tablet lg:px-margin">
        {/* Objetivo del marco conductor: aquí alcanza su transformación más
            visual, creciendo hasta el visor cinematográfico y adoptando el
            tono de la escena (capa con acento bosque del marco). */}
        <div
          data-frame-target
          className="relative w-full max-w-3xl bg-surface-container-lowest/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 md:p-14"
        >
          <div className="mb-space-md flex items-center justify-between font-sans text-label-technical font-semibold uppercase tracking-widest text-tertiary">
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-flame-orange" />
              Rec · 35 mm
            </span>
          </div>

          <p className="mb-space-xs block font-sans text-caption font-semibold uppercase tracking-widest text-flame-orange">
            Otra forma de mirar
          </p>
          <h2
            id="titulo-escena-4"
            className="mx-auto mb-space-md max-w-2xl font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-on-surface lg:text-headline-xl"
          >
            El encuadre no <span className="font-light italic text-tertiary">termina en el código</span>.
          </h2>
          <p className="mx-auto max-w-xl font-sans text-body-lead leading-relaxed text-on-surface-variant">
            Programar también es elegir dónde mirar: cambiar la perspectiva, encontrar un orden
            entre lo disperso y dejar espacio a lo que importa.
          </p>
          <div className="mt-space-lg flex items-center justify-center gap-space-sm pt-space-sm font-sans text-label-technical font-semibold uppercase tracking-widest text-on-surface-variant/70">
            <Camera size={14} className="text-tertiary" aria-hidden="true" />
            <span>Mirada · estructura · sentido</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Marcas de retícula "+" del dispositivo "El encuadre".
 * Recurso decorativo: se oculta a lectores de pantalla.
 */
type FrameCornersProps = {
  className?: string
  tone?: "flame" | "ink" | "muted"
}

const toneClasses: Record<NonNullable<FrameCornersProps["tone"]>, string> = {
  flame: "text-flame-orange",
  ink: "text-rich-ink/60",
  muted: "text-on-surface-variant/40",
}

export default function FrameCorners({ className = "", tone = "flame" }: FrameCornersProps) {
  const position = "absolute font-mono text-xs leading-none select-none pointer-events-none"
  return (
    <span aria-hidden="true" className={className}>
      <span className={`${position} -top-2 -left-2 ${toneClasses[tone]}`}>+</span>
      <span className={`${position} -top-2 -right-2 ${toneClasses[tone]}`}>+</span>
      <span className={`${position} -bottom-2 -left-2 ${toneClasses[tone]}`}>+</span>
      <span className={`${position} -bottom-2 -right-2 ${toneClasses[tone]}`}>+</span>
    </span>
  )
}

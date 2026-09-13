"use client"

import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { Check, Copy } from "lucide-react"

/**
 * Botón "Copiar email" con confirmación accesible: el cambio de etiqueta
 * vive en una región aria-live para que los lectores de pantalla anuncien
 * el resultado. Incluye respaldo (execCommand) para contextos no seguros.
 */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email)
      } else {
        const textArea = document.createElement("textarea")
        textArea.value = email
        textArea.style.position = "fixed"
        textArea.style.opacity = "0"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }
      setCopied(true)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copiar dirección de correo"
      className={clsx(
        "inline-flex shrink-0 items-center gap-space-xs px-space-md py-2.5",
        "rounded font-sans text-label-technical font-semibold uppercase tracking-wider",
        "transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-flame-orange",
        copied
          ? "bg-tertiary-container text-tertiary"
          : "bg-surface-container text-on-surface hover:bg-surface-bright hover:text-primary",
      )}
    >
      {copied ? (
        <Check size={16} aria-hidden="true" />
      ) : (
        <Copy size={16} aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "¡Copiado!" : "Copiar email"}</span>
    </button>
  )
}

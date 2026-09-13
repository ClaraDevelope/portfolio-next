import type { Metadata } from "next"
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

/*
 * Tipografías del rediseño editorial (Newsreader + Plus Jakarta Sans),
 * autoalojadas vía next/font en lugar del CDN de Google Fonts que usa
 * la exportación de Stitch.
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
})

export const metadata: Metadata = {
  title: "Portfolio Clara Manzano Corona",
  description: "Desarrolladora web con enfoque en accesibilidad, experiencia de usuario y sostenibilidad digital",
  keywords: ["Clara Manzano", "portfolio", "desarrolladora web", "frontend", "fullstack", "Next.js", "JavaScript", "React", "Node.js", "sostenibilidad digital", "UX", "UI", "accesibilidad", "Tailwind CSS", "CSS", "HTML", "JavaScript", "TypeScript", "MongoDB", "Git", "GitHub", "desarrollo web", "programación", "tecnología"],
  authors: [{ name: "Clara Manzano Corona", url: "https://claramanzanocorona.dev" }],
  creator: "Clara Manzano Corona",
  openGraph: {
    title: "Clara Manzano Corona | Portfolio",
    description: "Desarrolladora web enfocada en la sostenibilidad digital y experiencia de usuario.",
    url: "https://claramanzanocorona.dev",
    siteName: "Clara Manzano Corona",
    locale: "es_ES",
    type: "website",
  },
  icons: {
    // Favicon e iconos generados desde la exportación de Stitch (logo2.png,
    // sello oscuro con marca en naranja llama), con su proporción y fondo.
    icon: [
      { url: "/icons/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${newsreader.variable} ${jakarta.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-rich-ink text-on-surface font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

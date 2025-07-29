import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
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
  icon: [
    { url: "/icons/favicon.ico", type: "image/x-icon" },
    { url: "/icons/icon.webp", type: "image/webp" },
  ],
},
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} font-sans antialiased bg-white text-gray-900`}
      >
        < Navbar/>
        <main className="min-h-screen">{children}</main>
      <Footer/>
      </body>
    </html>
  )
}

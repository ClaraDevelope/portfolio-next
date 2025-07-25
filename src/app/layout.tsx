// app/layout.tsx
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
  description: "Desarrolladora web con enfoque en la claridad del código, la experiencia de usuario y la sostenibilidad digital",

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

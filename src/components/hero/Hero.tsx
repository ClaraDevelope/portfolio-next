"use client"

import Image from "next/image"
import { Github, Linkedin, Download } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const textVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: 0.5 + i * 0.3, duration: 0.8 },
  }),
}

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText =
    "Cada línea es un latido, y cada proyecto, una historia. ¿Construimos la siguiente?"

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(interval)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      role="region"
      aria-labelledby="hero-heading"
      className="min-h-[90vh] lg:px-[200px] md:px-[200px] sm:px-[150px] py-10 bg-[radial-gradient(circle_at_20%_30%,#1e103f_0%,#4c102f_50%,#0a0a0a_100%)] w-full flex flex-col-reverse md:flex-row items-center justify-center gap-12 text-left"
    >
      {/* Contenido textual */}
      <div className="flex-1 text-center md:text-left">
        <motion.h1
          id="hero-heading"
          className="text-4xl md:text-6xl font-extrabold drop-shadow-md mb-4 leading-snug"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={textVariants}
        >
          <span className="bg-gradient-to-r from-purple-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Desarrolladora
          </span>
          <br />
          <span className="text-white">Web & Software</span>
        </motion.h1>

        <motion.p
          className="text-lg lg:text-xl text-gray-300 font-mono h-16 max-w-2xl mb-8 mx-2"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={textVariants}
        >
          {typedText}
          <span className="animate-pulse">|</span>
        </motion.p>

        {/* Iconos */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-12">
          {[
            {
              href: "https://github.com/claraDevelope",
              label: "GitHub",
              icon: <Github size={18} />,
            },
            {
              href: "https://linkedin.com/in/clara-manzano-corona",
              label: "LinkedIn",
              icon: <Linkedin size={18} />,
            },
            {
              href: "/CV_Clara_Manzano.pdf",
              label: "Descargar CV",
              target: "_blank",
              icon: <Download size={18} />,
              download: false,
              highlight: true,
            },
          ].map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              title={`${item.label} de Clara Manzano Corona`}
              download={item.download}
              className={`group inline-flex items-center gap-2 px-4 py-[10px] rounded-full
              text-sm font-medium tracking-tight transition-all duration-300 ease-out
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
              backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_3px_8px_rgba(0,0,0,0.25)]
              ${
                item.highlight
                  ? 'bg-gradient-to-br from-yellow-400/10 to-orange-400/10 text-white/95 hover:text-white border border-orange-300/20 hover:border-orange-200/40 hover:shadow-[0_4px_12px_rgba(255,180,80,0.4)]'
                  : 'bg-gradient-to-br from-white/5 to-white/10 text-white/90 hover:text-white border border-white/15 hover:border-white/30 hover:shadow-[0_4px_10px_rgba(255,255,255,0.2)]'
              }`}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 1.2 + i * 0.2, duration: 0.4, ease: "easeOut" }}
            >
              <motion.span
                className="transition-transform group-hover:-translate-y-[1px] group-hover:scale-105"
                whileHover={{ scale: 1.1 }}
              >
                {item.icon}
              </motion.span>
              <span>{item.label}</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Foto a la derecha (o arriba en móvil) */}
      <div className="flex-1 flex justify-center">
        <div className="w-48 h-48 md:w-70 md:h-70 relative rounded-full border-4 border-white shadow-lg overflow-hidden">
          <Image
            src="/images/ClaraManzano.webp"
            alt="Foto de Clara Manzano"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </motion.section>
  )
}



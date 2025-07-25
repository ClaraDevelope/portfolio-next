"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Download } from "lucide-react"
import { motion } from "framer-motion"


const textVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: 0.5 + i * 0.3, duration: 0.8 },
  }),
};

// const iconVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: (i: number) => ({
//     opacity: 1,
//     scale: 1,
//     transition: { delay: 1.3 + i * 0.2, duration: 0.5, ease: "easeOut" },
//   }),
// };

export default function Hero() {
  return (
    <motion.section
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
      role="region"
      aria-labelledby="hero-heading"
      className="min-h-[90vh] flex flex-col items-center justify-center px-4 text-center bg-[radial-gradient(circle_at_20%_30%,#1e103f_0%,#4c102f_50%,#0a0a0a_100%)] w-full"
    >
      {/* Foto */}
      <div className="w-42 h-42 relative rounded-full border-4 border-white shadow-lg overflow-hidden mb-6">
        <Image
          src="/images/ClaraManzano.webp"
          alt="Foto de Clara Manzano"
          fill
          className="object-cover"
        />
      </div>

      {/* Nombre */}
     <motion.h1
  id="hero-heading"
  className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md mb-2"
  initial="hidden"
  animate="visible"
  custom={0}
  variants={textVariants}
>
  Hola, soy Clara Manzano Corona
</motion.h1>

<motion.p
  className="text-lg text-[var(--accent)] font-medium mb-4"
  initial="hidden"
  animate="visible"
  custom={1}
  variants={textVariants}
>
  Desarrolladora web full-stack
</motion.p>

<motion.p
  className="text-base text-gray-300 max-w-xl mb-8 text-lg"
  initial="hidden"
  animate="visible"
  custom={2}
  variants={textVariants}
>
  Cada línea es un latido, y cada proyecto, una historia. ¿Construimos la siguiente?
</motion.p>

<div className="flex gap-6 justify-center">
  {[
    {
      href: "https://github.com/claraDevelope",
      label: "GitHub",
      icon: <Github size={24} />,
    },
    {
      href: "https://linkedin.com/in/clara-manzano-corona",
      label: "LinkedIn",
      icon: <Linkedin size={24} />,
    },
    {
      href: "/CV_Clara_Manzano.pdf",
      label: "CV",
      target: "_blank",
      icon: <Download size={24} />,
      download: false,
    },
  ].map((item, i) => (
    <motion.a
      key={item.label}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Perfil de ${item.label}`}
      title={`${item.label} de Clara Manzano Corona`}
      download={item.download}
      className="w-16 h-16 rounded-full border border-white/30 bg-slate-900 hover:border-white/60
      hover:bg-slate-950 flex items-center justify-center text-white shadow-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] transition-all duration-200 ease-out"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: 1.3 + i * 0.2, duration: 0.5, ease: "easeOut" }}
    >
      {item.icon}
    </motion.a>
  ))}
</div>


    </motion.section>
  )
}


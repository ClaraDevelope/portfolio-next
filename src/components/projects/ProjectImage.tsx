'use client'

import { motion, useAnimationControls } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

type ProjectImageProps = {
  src: string
  alt: string
  title: string
}

export default function ProjectImage({ src, alt, title }: ProjectImageProps) {
  const flickerControls = useAnimationControls()
  const [hovered, setHovered] = useState(false)

  const handleHoverStart = () => {
    setHovered(true)
    flickerControls.start({
      opacity: [0.05, 0.15, 0.1, 0.2, 0.05],
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      },
    })
  }

  const handleHoverEnd = () => {
    setHovered(false)
    flickerControls.stop()
    flickerControls.set({ opacity: 0 })
  }

  return (
    <motion.div
      className="relative w-full h-48 overflow-hidden rounded-l group shadow-xl"
      initial="rest"
      animate="rest"
      whileHover="hover"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      tabIndex={0}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
    >
      {/* Imagen base con zoom sutil */}
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.07 },
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full h-full"
      >
        <Image
          src={src || '/placeholder.webp'}
          alt={alt}
          fill
          className="object-cover"
          unoptimized
        />
      </motion.div>

      {/* Grain overlay SOLO en hover */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 0.2 },
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-[url('/image/grain.png')] pointer-events-none mix-blend-soft-light z-10"
      />

      {/* Reflejo inferior tipo cine */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 0.15 },
        }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/4ssssss0 to-transparent z-20"
      />

      {/* Título + icono sutil */}
      <motion.div
        variants={{
          rest: { opacity: 0, y: -10 },
          hover: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.4 }}
        className="absolute top-4 left-4 z-30 text-white text-xl font-semibold tracking-wide drop-shadow-md px-3 py-1 bg-black/80 rounded flex items-center gap-1"
      >
        <span>{title}</span>
        <motion.span
          initial={{ y: 2, opacity: 0 }}
          animate={hovered ? { y: 0, opacity: 1 } : { y: 2, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-white text-sm"
        >
        </motion.span>
      </motion.div>

      {/* Light flicker SOLO en hover */}
      <motion.div
        animate={flickerControls}
        initial={{ opacity: 0 }}
        className="absolute inset-0 bg-white pointer-events-none z-20 mix-blend-overlay"
      />

      {/* Borde glowing solo en hover */}
      <motion.div
        variants={{
          rest: { opacity: 0, scale: 1 },
          hover: { opacity: 1, scale: 1.01 },
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-lg border-2 border-white/40 shadow-[0_0_18px_rgba(255,255,255,0.3)] pointer-events-none z-30"
      />
    </motion.div>
  )
}



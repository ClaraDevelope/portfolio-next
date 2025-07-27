'use client'

import { CERTIFICATIONS } from '@/utils/certifications'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function CertificationsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containList = ['Introducción a la Ingeniería de Software']

  return (
    <section id="formacion" className="py-20 max-w-[1300px] mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white tracking-wide relative after:content-[''] after:block after:w-12 after:h-1 after:mx-auto after:bg-fuchsia-500 after:mt-2 rounded-full">
          Formación
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {CERTIFICATIONS.map((cert, index) => (
          <motion.a
            key={cert.name}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.04,
              boxShadow: '0 0 20px rgba(240, 171, 252, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            className={`relative block overflow-hidden rounded-l border border-white/10 shadow-md transition-all duration-300 bg-white/5 ${
              hoveredIndex !== null && hoveredIndex !== index
                ? 'opacity-40 brightness-55'
                : 'opacity-100'
            }`}
          >
            <div className="relative w-full h-48 sm:h-52 md:h-56">
              <Image
                src={cert.img}
                alt={cert.name}
                fill
                className={`transition duration-300 bg-white ${
                  containList.includes(cert.name)
                    ? 'object-contain'
                    : 'object-cover'
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 text-white text-sm font-semibold px-2 py-1 bg-black/80 rounded shadow backdrop-blur-sm">
                {cert.name}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

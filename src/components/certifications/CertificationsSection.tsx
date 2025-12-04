'use client'

import { CERTIFICATIONS } from '@/utils/certifications'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function CertificationsSection() {
  const containList = ['Introducción a la Ingeniería de Software']

  return (
    <section id="formacion" className="py-20 max-w-[1200px] mx-auto px-4">
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
            aria-label={`Ver certificado: ${cert.name}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.06 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="
              group relative flex flex-col overflow-hidden
              rounded-md border border-white/8
              bg-white/0
              transition-all duration-300
              hover:border-[var(--accent)]/45 hover:bg-white/5
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-white/80 focus-visible:ring-offset-2
              focus-visible:ring-offset-[#060013]
            "
          >
            <div className="relative w-full h-40 sm:h-44 md:h-48 overflow-hidden">
              <Image
                src={cert.img}
                alt={cert.name}
                fill
                className={`
                  bg-white
                  transition-transform duration-500
                  ${containList.includes(cert.name) ? 'object-contain p-4' : 'object-cover'}
                  group-hover:scale-[1.03]
                `}
                loading="lazy"
              />

              {/* velo muy sutil para dar legibilidad al texto */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* texto debajo, limpio, sin caja negra */}
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-white/90 leading-snug">
                {cert.name}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { aboutMe } from '@/utils/aboutMe'
import { motion } from 'framer-motion'

export default function AboutMe() {
  return (
    <section
      id="perfil"
      className="py-20 px-4 max-w-[1300px] mx-auto text-white"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-3xl font-bold text-center mb-12 tracking-wide relative after:content-[''] after:block after:w-12 after:h-1 after:mx-auto after:bg-fuchsia-500 after:mt-2 rounded-full"
      >
        Sobre mí
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: 'easeOut',
              when: 'beforeChildren',
              staggerChildren: 0.2,
            },
          },
        }}
        className="flex flex-col md:flex-row gap-12 items-center"
      >
        {/* Texto */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
          }}
          className="flex-1 text-lg leading-relaxed space-y-6 text-gray-200"
        >
          <p dangerouslySetInnerHTML={{ __html: aboutMe.p1 }} />
          <p dangerouslySetInnerHTML={{ __html: aboutMe.p2 }} />
          <p dangerouslySetInnerHTML={{ __html: aboutMe.p3 }} />
        </motion.div>

        {/* Imagen avatar con halo y animación */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative shrink-0"
        >
          {/* Halo decorativo */}
          <div className="hidden md:block absolute inset-0 m-auto w-72 h-72 rounded-full bg-fuchsia-500 opacity-30 blur-3xl -z-10" />

 <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-2 border-white/50 shadow-xl noise">
  <Image
    src="/images/foto-estudio.png"
    alt="Foto de estudio"
    fill
    className="object-cover"
  />
</div>

        </motion.div>
      </motion.div>
    </section>
  )
}

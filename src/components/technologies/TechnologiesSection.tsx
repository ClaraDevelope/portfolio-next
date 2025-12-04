'use client';

import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useEffect } from 'react';
import { TECHNOLOGIES } from '@/utils/technologies';

export default function TechnologySection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  const transformCategoryName = (name: string) => {
    switch (name) {
      case 'lenguajes':
        return 'Lenguajes';
      case 'frontend':
        return 'Frontend';
      case 'backend':
        return 'Backend';
      case 'basesDeDatos':
        return 'Bases de Datos y Almacenamiento';
      case 'herramientasDesarrollo':
        return 'Herramientas de Desarrollo';
      case 'iaAutomatizacion':
        return 'IA y Automatización';
      case 'infraestructura':
        return 'Infraestructura';
      case 'seguridad':
        return 'Seguridad';
      case 'diseño':
        return 'Diseño';
      default:
        return name;
    }
  };

  return (
    <section
      id="tecnologias"
      className="relative w-full max-w-[1200px] min-h-screen px-6 py-20 overflow-hidden m-auto"
    >
      <div
        ref={ref}
        className="relative z-10 max-w-[1300px] mx-auto text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 30 },
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl font-bold text-center mb-12 text-white tracking-wide relative after:content-[''] after:block after:w-12 after:h-1 after:mx-auto after:bg-fuchsia-500 after:mt-2 rounded-full"
        >
          Tecnologías
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {Object.entries(TECHNOLOGIES).map(([category, items]) => (
            <motion.div
              key={category}
              variants={cardVariants}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="group relative rounded-md border border-white/8 bg-white/0
                         px-5 py-5 text-left
                         hover:border-[var(--accent)]/40 hover:bg-white/5
                         transition-colors duration-300"
            >
                  <div className="mb-4">
                    <h3 className="text-sm font-medium tracking-[0.18em] uppercase text-white/60">
                      {transformCategoryName(category)}
                    </h3>
                  </div>

              <div className="flex flex-wrap gap-2.5">
                {items.map((tech) => (
                  <motion.div
                    key={tech.id}
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="inline-flex items-center gap-2 rounded-full
                               border border-white/10 bg-white/5/0
                               px-3 py-1.5 text-xs text-white/85
                               hover:bg-white/8 hover:border-white/30
                               transition-colors duration-200"
                  >
                    {tech.img && (
                      <Image
                        src={tech.img}
                        alt={tech.name}
                        width={18}
                        height={18}
                        className="object-contain"
                      />
                    )}
                    <span className="whitespace-nowrap">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

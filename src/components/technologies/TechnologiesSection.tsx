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
        staggerChildren: 0.25,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section
      id="tecnologias"
      className="relative w-full min-h-screen px-6 py-20 overflow-hidden"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {Object.entries(TECHNOLOGIES).map(([category, items]) => (
            <motion.div
              key={category}
              variants={cardVariants}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              whileHover={{
                boxShadow: '0 0 15px rgba(255, 0, 200, 0.2)',
                borderColor: '#f0abfc',
              }}
              className="border border-gray-600 rounded-l p-6 text-left bg-white/5 backdrop-blur-md transition-all duration-300"
            >
              <h3 className="text-xl font-semibold capitalize mb-4 text-gray-100">
                {transformCategoryName(category)}
              </h3>

              <div className="flex flex-wrap gap-3">
                {items.map((tech) => (
                  <motion.div
                    key={tech.id}
                    whileHover={{
                      scale: 1.05,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex items-center gap-2 bg-white/10 text-sm px-6 py-2 rounded-full backdrop-blur-sm transition-transform text-white/90 border border-white/10 hover:bg-white/20 hover:shadow-inner"
                  >
                    <Image
                      src={tech.img}
                      alt={tech.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    <span className="pl-2">{tech.name}</span>
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

function transformCategoryName(key: string) {
  const map: Record<string, string> = {
    lenguajes: 'Lenguajes',
    frontend: 'Frontend',
    backend: 'Backend',
    basesDeDatos: 'Bases de datos',
    herramientasDesarrollo: 'Herramientas de desarrollo',
    seguridad: 'Seguridad',
    diseño: 'Diseño',
  };
  return map[key] || key;
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { EXPERIENCE } from '@/utils/experience';

export default function ExperienceSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isSingle = EXPERIENCE.length === 1;

  return (
    <section id="experiencia" className="py-20 max-w-[1300px] mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white tracking-wide relative after:content-[''] after:block after:w-12 after:h-1 after:mx-auto after:bg-fuchsia-500 after:mt-2 rounded-full">
          Experiencia
        </h2>
      </div>

      <div
        className={`grid gap-6 ${
          isSingle ? 'grid-cols-1 max-w-4xl mx-auto' : 'sm:grid-cols-1 md:grid-cols-2'
        }`}
      >
        {EXPERIENCE.map((exp, index) => (
          <motion.article
            key={exp.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
            whileHover={{                
              boxShadow: '0 8px 32px rgba(180, 0, 255, 0.15)',
              borderColor: '#d946ef'
            }}
            className={`group relative rounded-l ${
              hoveredIndex !== null && hoveredIndex !== index
                ? 'opacity-40 brightness-75'
                : 'opacity-100'
            }`}
            aria-labelledby={`${exp.id}-title`}
          >
            {/* Gradiente de borde con brillo suave */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-l z-0"
            />

            {/* Tarjeta principal */}
            <div className="relative z-10 overflow-hidden rounded-l border border-white/10 shadow-md bg-white/5 transition-colors duration-300 m-[1px]">
              {/* Encabezado visual */}
              <div className={`grid ${isSingle ? 'md:grid-cols-2' : 'grid-cols-2'} gap-0`}>
                {/* Logo */}
              <div className="relative overflow-hidden bg-white h-40 sm:h-48 md:h-56 flex items-center justify-center">
              <Image
                src={exp.images[0]}
                alt={`Logo de ${exp.title}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>

            {/* Foto ambiente */}
            <div className="relative h-52 md:h-56">
              <Image
                src={exp.images[1]}
                alt={`Ambiente de ${exp.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-black/10" />
            </div>

              </div>

              {/* Contenido */}
              <div className="p-5 md:p-6">
                <h3
                  id={`${exp.id}-title`}
                  className="text-xl md:text-2xl font-semibold tracking-tight"
                >
                  {exp.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">{exp.subtitle}</p>

                <p className="mt-4 leading-relaxed text-white/90">
                  {exp.description}
                </p>

                <div className="mt-4 text-sm text-white/80">
                  <span className="font-medium">Rol: </span>
                  {exp.role}
                </div>

                {/* Chips */}
                {exp.stack?.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {exp.stack.map((tag) => (
                      <li
                        key={`${exp.id}-${tag}`}
                        className="group relative rounded-full bg-gradient-to-r from-fuchsia-500/20 via-purple-500/10 to-transparent 
                                  px-3 py-1 text-xs font-medium text-white/90 
                                  ring-1 ring-white/10 backdrop-blur-sm 
                                  transition-all duration-300 hover:from-fuchsia-500/40 hover:to-purple-500/20 
                                  hover:ring-fuchsia-400/30 hover:text-white"
                      >
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-400/10 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></span>
                        <span className="relative z-10">{tag}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Enlace opcional */}
                {exp.website && (
                  <div className="mt-6">
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50"
                    >
                      Visitar sitio
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M21 14v7H3V3h7" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.article>

        ))}
      </div>
    </section>
  );
}



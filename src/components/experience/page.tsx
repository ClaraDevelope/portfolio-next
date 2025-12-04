'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { EXPERIENCE } from '@/utils/experience';

export default function ExperienceSection() {
  return (
    <section id="experiencia" className="py-20 max-w-[1300px] mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white tracking-wide relative after:content-[''] after:block after:w-12 after:h-1 after:mx-auto after:bg-fuchsia-500 after:mt-2 rounded-full">
          Experiencia
        </h2>
      </div>

      {/* ==== MOBILE ==== */}
      <div className="sm:hidden space-y-8">
        {EXPERIENCE.map((exp, index) => (
          <motion.article
            key={exp.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
            className="relative rounded-md border border-white/10 bg-white/[0.03] px-5 py-5 backdrop-blur-sm
                       hover:bg-white/[0.06] transition-colors duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={exp.images[0]}
                  alt={`Logo de ${exp.title}`}
                  fill
                  className="object-contain rounded-md"
                  sizes="48px"
                  priority={index === 0}
                />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-white">
                  {exp.title}
                </h3>
                <p className="text-xs text-white/65">{exp.subtitle}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white/85">
              {exp.description}
            </p>

            <p className="mt-3 text-xs text-white/75">
              <span className="font-medium">Rol: </span>
              {exp.role}
            </p>

            {exp.stack?.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {exp.stack.map((tag) => (
                  <li
                    key={`${exp.id}-${tag}`}
                    className="rounded-full border border-white/12 bg-white/5
                               px-3 py-1 text-[11px] text-white/85
                               hover:bg-white/10 transition-colors"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </motion.article>
        ))}
      </div>

      {/* ==== DESKTOP/TABLET: TIMELINE ==== */}
      <div className="hidden sm:block">
        <div className="relative max-w-5xl mx-auto">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[20px] top-0 bottom-0 w-px bg-white/30"
          />

          <div className="space-y-10">
            {EXPERIENCE.map((exp, index) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative flex gap-8"
              >
                {/* Columna timeline */}
                <div className="relative w-10 flex justify-center">
                  <div className="relative z-10 flex items-start justify-center pt-8">
                    <div
                      className="w-3 h-3 rounded-full bg-[var(--accent)]
                                 shadow-[0_0_0_3px_rgba(255,255,255,0.18)]"
                    />
                  </div>
                </div>

                {/* Tarjeta principal */}
                <motion.div
                  className="flex-1 flex gap-6 items-start rounded-md border border-white/10 
                             bg-white/[0.03] px-6 py-5 backdrop-blur-sm
                             hover:bg-white/[0.06] hover:border-[var(--accent)]/40
                             transition-colors duration-300"
                >
                  {/* Logo sin “tarjeta dentro” */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    {exp.images?.[0] && (
                      <Image
                        src={exp.images[0]}
                        alt={`Logo de ${exp.title}`}
                        fill
                        className="object-contain rounded-md"
                      />
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <h3 className="text-lg font-semibold text-white">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-white/60">
                        {exp.subtitle}
                      </p>
                    </div>

                    <p className="mt-3 text-sm text-white/85 leading-relaxed">
                      {exp.description}
                    </p>

                    <p className="mt-3 text-sm text-white/80">
                      <span className="font-semibold">Rol:</span> {exp.role}
                    </p>

                    {exp.stack?.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {exp.stack.map((tag) => (
                          <li
                            key={`${exp.id}-${tag}`}
                            className="rounded-full border border-white/12 bg-white/5
                                       px-3 py-1 text-[11px] text-white/85
                                       hover:bg-white/10 hover:border-[var(--accent)]/45
                                       transition-colors"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

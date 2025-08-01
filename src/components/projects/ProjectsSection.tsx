'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { PROJECTS } from '@/utils/projects'
import ProjectDetailsModal from './ProjectDetailsModal'
import { ProjectType } from '@/app/types/projectType'
import { Star, ExternalLink, Github } from 'lucide-react'
import ProjectImage from './ProjectImage'
import { motion } from 'framer-motion'

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)

  const openModal = (project: ProjectType) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <section id="proyectos" className="py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-3xl font-bold text-center mb-12 text-white tracking-wide relative after:content-[''] after:block after:w-12 after:h-1 after:mx-auto after:bg-fuchsia-500 after:mt-2 rounded-full"
      >
        Proyectos
      </motion.h2>

      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...PROJECTS].reverse().map((project, index) => {
            // const isFeatured = project.isFeatured

            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.15 }}
                className="relative border border-gray-200 border-gray-700 bg-white/5 backdrop-blur-sm rounded-l overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col"
              >
                {/* {isFeatured && (
                  <span className="absolute top-0 right-0 bg-[var(--accent)] text-black text-xs font-semibold px-2 py-1 pl-2 pr-3 rounded-bl-xl flex items-center gap-1 z-10">
                    <Star size={14} className="fill-black text-black" />
                    Destacado
                  </span>
                )} */}

                <ProjectImage
                  src={project.imgUrl}
                  alt={project.name}
                  title={project.name}
                />

                <div className="p-4 flex flex-col h-full flex-1">
                  <div>
                    <h4 className="text-[24px] text-gray-100 font-semibold mb-2 relative after:mx-6 after:content-[''] after:block after:w-12 after:h-1 after:bg-gray-100 after:mt-1 after:mb-6 rounded-full">
                      {project.name}
                    </h4>
                    <p className="text-[16px] text-gray-300 mb-3">
                      {project.description}
                      {/* {project.details && (
                        <button
                          onClick={() => openModal(project)}
                          className="text-blue-600 dark:text-cyan-400 underline underline-offset-2 hover:text-blue-800 dark:hover:text-white text-sm cursor-pointer"
                          title={`Ver más detalles sobre el proyecto ${project.name}`}
                          aria-label={`Abrir modal con más información sobre el proyecto ${project.name}`}
                        >
                          Más info
                        </button>
                      )} */}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6 mb-3">
                      {project.technologies?.map((tech, i) => (
                        <div
                          key={i}
                         className="flex items-center gap-2 bg-gradient-to-r from-white/10 to-white/2 border border-white/10 rounded-full px-3 py-1 text-sm text-gray-100 backdrop-blur-md shadow-inner"


                          title={tech.name}
                          aria-label={tech.name}
                        >
                          <Image
                            src={tech.img || '/placeholder.webp'}
                            alt={tech.name}
                            width={20}
                            height={20}
                            className="object-contain"
                            unoptimized
                          />
                          <span className="whitespace-nowrap">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                    <div className="mt-auto pt-8 flex flex-col gap-2">
                      <div className="flex gap-5 w-full">
                        {project.url && (
                          <Link
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center gap-2 rounded-l px-4 py-3
                                      text-sm font-semibold text-white overflow-hidden
                                      bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600
                                      hover:from-violet-500 hover:via-purple-500 hover:to-blue-500
                                      shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40
                                      transform-gpu transition-all duration-300 ease-out
                                      hover:scale-105 hover:-translate-y-0.5
                                      active:scale-95 active:translate-y-0
                                      border border-white/10 backdrop-blur-sm w-full
                                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                                      before:translate-x-[-100%] before:skew-x-12 before:transition-transform before:duration-700
                                      hover:before:translate-x-[200%]"
                          >
                            <ExternalLink size={16} className="transition-transform duration-300 group-hover:scale-110 relative z-10" />
                            <span className="relative z-10">Ver proyecto</span>
                          </Link>
                        )}
                        {project.gitHub && (
                          <Link
                            href={project.gitHub}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center gap-2 rounded-l px-4
                                      text-sm font-semibold text-white overflow-hidden
                                      bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800
                                      hover:from-slate-700 hover:via-gray-700 hover:to-zinc-700
                                      shadow-lg shadow-black/25 hover:shadow-xl hover:shadow-black/40
                                      transform-gpu transition-all duration-300 ease-out
                                      hover:scale-105 hover:-translate-y-0.5
                                      active:scale-95 active:translate-y-0
                                      border border-white/20 backdrop-blur-sm w-full
                                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
                                      before:translate-x-[-100%] before:skew-x-12 before:transition-transform before:duration-700
                                      hover:before:translate-x-[200%]"
                          >
                            <Github size={16} className="transition-transform duration-300 group-hover:scale-110 relative z-10" />
                            <span className="relative z-10">GitHub</span>
                          </Link>
                        )}
                      </div>
                    </div>

                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={closeModal}
        />
      )}
    </section>
  )
}

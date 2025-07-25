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
                  <div className="mt-auto pt-4 flex flex-col gap-2">
                    <div className="flex gap-3">
                      {project.url && (
                        <Link
                          href={project.url}
                          target="_blank"
                          className="px-4 py-2 rounded-l bg-gradient-to-tr from-blue-700 to-indigo-500 text-white text-sm font-semibold hover:scale-101 transition duration-200 flex items-center gap-2"
                        >
                          <ExternalLink size={16} />
                          Ver proyecto
                        </Link>
                      )}
                      {project.gitHub && (
                        <Link
                          href={project.gitHub}
                          target="_blank"
                          className="px-4 py-2 rounded-l bg-zinc-800 text-white text-sm font-semibold border  border-zinc-700 hover:bg-zinc-900 hover:scale-101 transition duration-200 flex items-center gap-2"
                        >
                          <Github size={16} />
                          GitHub
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

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { PROJECTS } from '@/utils/projects'
import ProjectDetailsModal from './ProjectDetailsModal'
import { ProjectType } from '@/app/types/projectType'
import { ExternalLink, Github, Lock } from 'lucide-react'
import ProjectImage from './ProjectImage'
import { motion } from 'framer-motion'


type RepoStatus = 'public' | 'private' | 'wip'
type LocalProject = ProjectType & {
  isFeatured?: boolean
  repoStatus?: RepoStatus
  imgUrl?: string
  name: string 
}

/** Conversión tipada una sola vez (evitamos any por todo el archivo) */
const LOCAL_PROJECTS: LocalProject[] = PROJECTS as unknown as LocalProject[]

/** Helpers de tipado */
const hasFeaturedFlag = (list: LocalProject[]) => list.some(p => Boolean(p.isFeatured))
const isInDev = (p: LocalProject) => p.repoStatus === 'private' || p.repoStatus === 'wip'
const safeImg = (p: LocalProject) => p.imgUrl ?? '/placeholder.webp'
const keyOf = (p: LocalProject, idx: number) => `${p.name || 'project'}-${idx}`

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)
  const [showAll, setShowAll] = useState(false)

  const openModal = (project: ProjectType) => setSelectedProject(project)
  const closeModal = () => setSelectedProject(null)

  /** Selección de destacados (fallback a los 3 primeros si no hay isFeatured) */
  const { featured, rest } = useMemo(() => {
    const list = [...LOCAL_PROJECTS]
    const featured = hasFeaturedFlag(list)
      ? list.filter(p => p.isFeatured).slice(0, 3).reverse()
      : list.slice(0, 3).reverse()

    const ids = new Set(featured.map(p => p.name))
    const rest = list.filter(p => !ids.has(p.name))
    return { featured, rest }
  }, [])

  return (
    <section id="proyectos" className="py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-3xl font-bold text-center mb-12 text-white tracking-wide relative after:content-[''] after:block after:w-12 after:h-1 after:mx-auto after:bg-fuchsia-500 after:mt-2 "
      >
        Proyectos
      </motion.h2>

      <div className="max-w-[1300px] mx-auto space-y-10">
        {/* ---- Destacados (horizontales) ---- */}
        <div className="max-w-6xl mx-auto space-y-6 ">
          {featured.map((project, index) => (
            <HorizontalProjectCard key={keyOf(project, index)} project={project} index={index} />
          ))}
        </div>

        {/* ---- Botón mostrar/ocultar resto ---- */}
        {rest.length > 0 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAll(v => !v)}
              className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5
                        text-sm font-medium text-white/80
                        bg-white/10 hover:bg-white/20
                        border border-white/10
                        backdrop-blur-sm
                        transition-all duration-300 ease-out
                        hover:text-white hover:-translate-y-0.5 active:translate-y-0
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-expanded={showAll}
            >
              {showAll ? 'Ver menos proyectos' : 'Ver todos los proyectos'}
            </button>


          </div>
        )}

        {/* ---- Resto en grid ---- */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {rest.map((project, index) => (
              <GridProjectCard key={keyOf(project, index)} project={project} index={index} />
            ))}
          </motion.div>
        )}
      </div>

      {selectedProject && (
        <ProjectDetailsModal project={selectedProject} onClose={closeModal} />
      )}
    </section>
  )
}

/* ============================
   Tarjeta HORIZONTAL (destacados)
   ============================ */
function HorizontalProjectCard({ project, index }: { project: LocalProject; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      className="relative border border-gray-700 bg-white/5 backdrop-blur-sm rounded-l overflow-hidden
                 shadow-sm hover:shadow-xl transition max-w-6xl mx-auto" 
    >
      {isInDev(project) && (
        <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1
                         text-xs px-2 py-1 bg-yellow-500/30 border border-yellow-500/35
                         text-yellow-200 shadow-sm pointer-events-none">
          En desarrollo
        </span>
      )}

      <div className="flex flex-col md:flex-row md:items-stretch">
        {/* Columna izquierda */}
        <motion.div
          className="relative w-full overflow-hidden
             aspect-[16/9]
             md:aspect-auto md:w-[55%] md:self-stretch md:min-h-[260px]" 
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <ProjectImage
            src={safeImg(project)}
            alt={project.name}
            title={project.name}
            className="h-full"
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.12 }}
            style={{ background: 'linear-gradient(135deg, #d946ef 0%, #6366f1 100%)' }}
          />
        </motion.div>

        {/* Contenido a la derecha */}
        <div className="p-8 md:w-[45%] flex flex-col justify-between"> 
          <div>
            <h3 className="text-2xl text-gray-100 font-semibold mb-2 relative after:content-[''] after:block after:w-10 after:h-1 after:bg-gray-100 after:mt-1 after:mb-3 rounded-full">
              {project.name}
            </h3>
            <p className="text-md text-gray-300 leading-relaxed line-clamp-5">
              {project.description}
            </p>

            {project.technologies && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech, i) => (
                  <div
                    key={`${tech.name}-${i}`}
                    className="flex items-center gap-2 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-gray-100 backdrop-blur-md shadow-inner"
                    title={tech.name}
                    aria-label={tech.name}
                  >
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <Image
                        src={tech.img || '/placeholder.webp'}
                        alt={tech.name}
                        width={16}
                        height={16}
                        className="object-contain"
                        unoptimized
                      />
                    </motion.div>
                    <span className="whitespace-nowrap">{tech.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

            <div className="mt-6 flex w-full gap-x-3 justify-between">
              {project.url && (
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-3
                            text-xs font-semibold text-white overflow-hidden
                            bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600
                            hover:from-violet-500 hover:via-purple-500 hover:to-blue-500
                            shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40
                            transform-gpu transition-all duration-300 ease-out
                            hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0
                            border border-white/10 backdrop-blur-sm"
                  title={`Abrir ${project.name}`}
                >
                  <ExternalLink
                    size={14}
                    className="transition-transform duration-300 group-hover:scale-110 relative z-10"
                  />
                  <span className="relative z-10">Ver proyecto</span>
                </Link>
              )}

              {project.gitHub ? (
                <Link
                  href={project.gitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2
                            text-xs font-semibold text-white overflow-hidden
                            bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800
                            hover:from-slate-700 hover:via-gray-700 hover:to-zinc-700
                            shadow-lg shadow-black/25 hover:shadow-xl hover:shadow-black/40
                            transform-gpu transition-all duration-300 ease-out
                            hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0
                            border border-white/20 backdrop-blur-sm"
                  title={`GitHub de ${project.name}`}
                >
                  <Github
                    size={14}
                    className="transition-transform duration-300 group-hover:scale-110 relative z-10"
                  />
                  <span className="relative z-10">GitHub</span>
                </Link>
              ) : (
                <button
                  type="button"
                  aria-disabled
                  title="Repositorio privado / pendiente de publicación"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-semibold
                            text-white/80 bg-gradient-to-r from-slate-800/60 via-gray-800/60 to-zinc-800/60
                            cursor-not-allowed opacity-60 border border-white/10 backdrop-blur-sm"
                >
                  <Lock size={14} />
                  <span>GitHub</span>
                </button>
              )}
            </div>

        </div>
      </div>
    </motion.article>
  )
}


/* ============================
   Tarjeta en GRID (layout actual)
   ============================ */
function GridProjectCard({ project, index }: { project: LocalProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
      whileHover={{ boxShadow: '0 8px 32px rgba(180, 0, 255, 0.15)', borderColor: '#d946ef' }}
      className="relative border border-gray-700 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col"
    >
      {isInDev(project) && (
        <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1
                         text-xs px-2 py-1 rounded-full bg-yellow-500/30 border border-yellow-500/35
                         text-yellow-200 shadow-sm pointer-events-none">
          En desarrollo
        </span>
      )}

<motion.div
  className="relative overflow-hidden rounded-t aspect-[16/9]" // 👈 altura por ratio
  whileHover={{
    scale: 1.05,
    filter: 'brightness(1.1) blur(0.2px)',
    boxShadow: '0 8px 32px rgba(180, 0, 255, 0.25)'
  }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
  <ProjectImage
    src={safeImg(project)}
    alt={project.name}
    title={project.name}
    className="h-full" // ahora sí tiene alto que heredar
  />
  <motion.div
    className="absolute inset-0 pointer-events-none"
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 0.15 }}
    style={{ background: 'linear-gradient(135deg, #d946ef 0%, #6366f1 100%)' }}
  />
</motion.div>

      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-[24px] text-gray-100 font-semibold mb-2 relative after:content-[''] after:block after:w-12 after:h-1 after:bg-gray-100 after:mt-1 after:mb-6 rounded-full">
          {project.name}
        </h4>

        <p className="text-[16px] text-gray-300 mb-3">{project.description}</p>

        {project.technologies && (
          <div className="flex flex-wrap gap-2 mt-6 mb-3">
            {project.technologies.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex items-center gap-2 bg-gradient-to-r from-white/10 to-white/2 border border-white/10 rounded-full px-3 py-1 text-sm text-gray-100 backdrop-blur-md shadow-inner"
                title={tech.name}
                aria-label={tech.name}
              >
                <motion.div whileHover={{ scale: 1.2 }}>
                  <Image
                    src={tech.img || '/placeholder.webp'}
                    alt={tech.name}
                    width={20}
                    height={20}
                    className="object-contain"
                    unoptimized
                  />
                </motion.div>
                <span className="whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        )}

<div className="mt-auto pt-6 flex flex-col gap-2">
  <div className="flex w-full justify-between gap-4">
    {project.url && (
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-3
                   text-sm font-semibold text-white overflow-hidden
                   bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600
                   hover:from-violet-500 hover:via-purple-500 hover:to-blue-500
                   shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40
                   transform-gpu transition-all duration-300 ease-out
                   hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0
                   border border-white/10 backdrop-blur-sm
                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                   before:translate-x-[-100%] before:skew-x-12 before:transition-transform before:duration-700
                   hover:before:translate-x-[200%]"
      >
        <ExternalLink
          size={16}
          className="transition-transform duration-300 group-hover:scale-110 relative z-10"
        />
        <span className="relative z-10">Ver proyecto</span>
      </Link>
    )}

    {project.gitHub ? (
      <Link
        href={project.gitHub}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-3
                   text-sm font-semibold text-white overflow-hidden
                   bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800
                   hover:from-slate-700 hover:via-gray-700 hover:to-zinc-700
                   shadow-lg shadow-black/25 hover:shadow-xl hover:shadow-black/40
                   transform-gpu transition-all duration-300 ease-out
                   hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0
                   border border-white/20 backdrop-blur-sm
                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
                   before:translate-x-[-100%] before:skew-x-12 before:transition-transform before:duration-700
                   hover:before:translate-x-[200%]"
      >
        <Github
          size={16}
          className="transition-transform duration-300 group-hover:scale-110 relative z-10"
        />
        <span className="relative z-10">GitHub</span>
      </Link>
    ) : (
      <button
        type="button"
        aria-disabled
        title="Repositorio privado / pendiente de publicación"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3
                   text-sm font-semibold text-white/80 bg-gradient-to-r from-slate-800/60 via-gray-800/60 to-zinc-800/60
                   cursor-not-allowed opacity-60 border border-white/10 backdrop-blur-sm"
      >
        <Lock size={16} />
        <span>GitHub</span>
      </button>
    )}
  </div>
</div>

      </div>
    </motion.div>
  )
}




// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import { useState } from 'react'
// import { PROJECTS } from '@/utils/projects'
// import ProjectDetailsModal from './ProjectDetailsModal'
// import { ProjectType } from '@/app/types/projectType'
// import { Star, ExternalLink, Github, Lock } from 'lucide-react'
// import ProjectImage from './ProjectImage'
// import { motion } from 'framer-motion'

// export default function ProjectsSection() {
//   const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)

//   const openModal = (project: ProjectType) => {
//     setSelectedProject(project)
//   }

//   const closeModal = () => {
//     setSelectedProject(null)
//   }

//   return (
//     <section id="proyectos" className="py-20 px-4">
//       <motion.h2
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.5 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//         className="text-3xl font-bold text-center mb-12 text-white tracking-wide relative after:content-[''] after:block after:w-12 after:h-1 after:mx-auto after:bg-fuchsia-500 after:mt-2 rounded-full"
//       >
//         Proyectos
//       </motion.h2>

//       <div className="max-w-[1300px] mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {[...PROJECTS].reverse().map((project, index) => {
//             // const isFeatured = project.isFeatured

//             return (
//               <motion.div
//                 key={project.name}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.15 }}
//                 whileHover={{
//                   boxShadow: '0 8px 32px rgba(180, 0, 255, 0.15)',
//                   borderColor: '#d946ef'
//                 }}
//                 className="relative border border-gray-200 border-gray-700 bg-white/5 backdrop-blur-sm rounded-l overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col"
//               >
//                 {/* {isFeatured && (
//                   <span className="absolute top-0 right-0 bg-[var(--accent)] text-black text-xs font-semibold px-2 py-1 pl-2 pr-3 rounded-bl-xl flex items-center gap-1 z-10">
//                     <Star size={14} className="fill-black text-black" />
//                     Destacado
//                   </span>
//                 )} */}
//                   {(project.repoStatus === 'private' || project.repoStatus === 'wip') && (
//                       <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1
//                         text-xs px-2 py-1 rounded-full bg-yellow-500/30 border border-yellow-500/35
//                         text-yellow-200 shadow-sm pointer-events-none">
//                          En desarrollo
//                       </span>
//                     )}

//                 <motion.div
//                 className="overflow-hidden rounded-t"
//                 whileHover={{
//                   scale: 1.05,
//                   filter: 'brightness(1.1) blur(0.2px)',
//                   boxShadow: '0 8px 32px rgba(180, 0, 255, 0.25)'
//                 }}
//                 transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//               >
//                 <ProjectImage
//                   src={project.imgUrl}
//                   alt={project.name}
//                   title={project.name}
//                 />
//                 {/* Overlay opcional */}
//                 <motion.div
//                   className="absolute inset-0 pointer-events-none"
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 0.15 }}
//                   style={{ background: 'linear-gradient(135deg, #d946ef 0%, #6366f1 100%)' }}
//                 />
//               </motion.div>

//                 <div className="p-4 flex flex-col h-full flex-1">
//                   <div>

//                     <h4 className="text-[24px] text-gray-100 font-semibold mb-2 relative after:mx-6 after:content-[''] after:block after:w-12 after:h-1 after:bg-gray-100 after:mt-1 after:mb-6 rounded-full">
//                       {project.name}
//                     </h4>
//                     <p className="text-[16px] text-gray-300 mb-3">
//                       {project.description}
//                       {/* {project.details && (
//                         <button
//                           onClick={() => openModal(project)}
//                           className="text-blue-600 dark:text-cyan-400 underline underline-offset-2 hover:text-blue-800 dark:hover:text-white text-sm cursor-pointer"
//                           title={`Ver más detalles sobre el proyecto ${project.name}`}
//                           aria-label={`Abrir modal con más información sobre el proyecto ${project.name}`}
//                         >
//                           Más info
//                         </button>
//                       )} */}
//                     </p>

//                     <div className="flex flex-wrap gap-2 mt-6 mb-3">
//                       {project.technologies?.map((tech, i) => (
//                         <div
//                           key={i}
//                           className="flex items-center gap-2 bg-gradient-to-r from-white/10 to-white/2 border border-white/10 rounded-full px-3 py-1 text-sm text-gray-100 backdrop-blur-md shadow-inner"
//                           title={tech.name}
//                           aria-label={tech.name}
//                         >
//                           <motion.div whileHover={{ scale: 1.2 }}>
//                             <Image
//                               src={tech.img || '/placeholder.webp'}
//                               alt={tech.name}
//                               width={20}
//                               height={20}
//                               className="object-contain"
//                               unoptimized
//                             />
//                           </motion.div>
//                           <span className="whitespace-nowrap">{tech.name}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                     <div className="mt-auto pt-8 flex flex-col gap-2">
//                       <div className="flex gap-5 w-full">
//                         {project.url && (
//                           <Link
//                             href={project.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="group relative inline-flex items-center justify-center gap-2 rounded-l px-4 py-3
//                                       text-sm font-semibold text-white overflow-hidden
//                                       bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600
//                                       hover:from-violet-500 hover:via-purple-500 hover:to-blue-500
//                                       shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40
//                                       transform-gpu transition-all duration-300 ease-out
//                                       hover:scale-105 hover:-translate-y-0.5
//                                       active:scale-95 active:translate-y-0
//                                       border border-white/10 backdrop-blur-sm w-full
//                                       before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
//                                       before:translate-x-[-100%] before:skew-x-12 before:transition-transform before:duration-700
//                                       hover:before:translate-x-[200%]"
//                           >
//                             <ExternalLink size={16} className="transition-transform duration-300 group-hover:scale-110 relative z-10" />
//                             <span className="relative z-10">Ver proyecto</span>
//                           </Link>
//                         )}
//                         {project.gitHub ? (
//                               <Link
//                                 href={project.gitHub}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="group relative inline-flex items-center justify-center gap-2 rounded-l px-4
//                                           text-sm font-semibold text-white overflow-hidden
//                                           bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800
//                                           hover:from-slate-700 hover:via-gray-700 hover:to-zinc-700
//                                           shadow-lg shadow-black/25 hover:shadow-xl hover:shadow-black/40
//                                           transform-gpu transition-all duration-300 ease-out
//                                           hover:scale-105 hover:-translate-y-0.5
//                                           active:scale-95 active:translate-y-0
//                                           border border-white/20 backdrop-blur-sm w-full
//                                           before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
//                                           before:translate-x-[-100%] before:skew-x-12 before:transition-transform before:duration-700
//                                           hover:before:translate-x-[200%]"
//                               >
//                                 <Github size={16} className="transition-transform duration-300 group-hover:scale-110 relative z-10" />
//                                 <span className="relative z-10">GitHub</span>
//                               </Link>
//                             ) : (
//                               <button
//                                 type="button"
//                                 aria-disabled
//                                 title="Repositorio privado / pendiente de publicación"
//                                 className="group relative inline-flex items-center justify-center gap-2 rounded-l px-4
//                                           text-sm font-semibold text-white/80 overflow-hidden
//                                           bg-gradient-to-r from-slate-800/60 via-gray-800/60 to-zinc-800/60
//                                           cursor-not-allowed opacity-60 border border-white/10 backdrop-blur-sm w-full"
//                               >
//                                 <Lock size={16} />
//                                 <span>GitHub</span>
//                               </button>
//                             )}
//                       </div>
//                     </div>

//                 </div>
//               </motion.div>
//             )
//           })}
//         </div>
//       </div>

//       {selectedProject && (
//         <ProjectDetailsModal
//           project={selectedProject}
//           onClose={closeModal}
//         />
//       )}
//     </section>
//   )
// }

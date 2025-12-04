'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { PROJECTS } from '@/utils/projects'
import ProjectDetailsModal from './ProjectDetailsModal'
import { ProjectType } from '@/app/types/projectType'
import { ExternalLink, Github, Lock, ArrowUpRight, ExternalLinkIcon } from 'lucide-react'
import ProjectImage from './ProjectImage'
import { motion } from 'framer-motion'


type RepoStatus = 'public' | 'private' | 'wip'
type LocalProject = ProjectType & {
  isFeatured?: boolean
  repoStatus?: RepoStatus
  imgUrl?: string
  name: string
  year?: string | number
}

/** Conversión tipada una sola vez (evitamos any por todo el archivo) */
const LOCAL_PROJECTS: LocalProject[] = PROJECTS as unknown as LocalProject[]

/** Helpers de tipado */
const hasFeaturedFlag = (list: LocalProject[]) => list.some(p => Boolean(p.isFeatured))
const isInDev = (p: LocalProject) => p.repoStatus === 'private' || p.repoStatus === 'wip'
const safeImg = (p: LocalProject) => p.imgUrl ?? '/placeholder.webp'
const keyOf = (p: LocalProject, idx: number) => `${p.name || 'project'}-${idx}`

export default function ProjectsSection() {
  // lista única, inversa; si hay isFeatured, primero pero con mismo estilo
  const projects = useMemo(() => {
    const list = [...LOCAL_PROJECTS]
    const reversed = list.slice().reverse()

    if (hasFeaturedFlag(reversed)) {
      const featured = reversed.filter(p => p.isFeatured)
      const others = reversed.filter(p => !p.isFeatured)
      return [...featured, ...others]
    }

    return reversed
  }, [])

  return (
    <section id="proyectos" className="py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-3xl font-bold text-center mb-16 text-white tracking-wide
                   relative after:content-[''] after:block after:w-12 after:h-1
                   after:mx-auto after:bg-fuchsia-500 after:mt-2"
      >
        Proyectos
      </motion.h2>

      <div className="max-w-5xl mx-auto">
        {/* línea superior suave */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-2" />

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectRow
              key={keyOf(project, index)}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================
   Fila de proyecto (layout listado)
   ============================ */

function ProjectRow({ project, index }: { project: LocalProject; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  const year = project.year ? String(project.year) : ''

  const techNames = project.technologies?.map(t => t.name) ?? []
  const visibleTechs = techNames.slice(0, 5)
  const extraTechs = techNames.length - visibleTechs.length

  return (
    <article
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* contenedor principal */}
      <div className="relative py-8 md:py-8 border-b border-white/10 transition-all duration-500">
        {/* fondo sutil al hacer hover */}
        <div
          className="absolute inset-0 -mx-4 md:-mx-8 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          {/* número */}
          <span className="w-10 shrink-0 text-sm text-white/40 tracking-[0.25em]">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* título + tecnologías */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-3xl md:text-4xl text-white tracking-tight transition-colors duration-300 group-hover:text-[var(--accent)]">
              {project.name}
            </h3>

            {/* tecnologías: aparecen al hover */}
            <div
              className={`mt-4 flex flex-wrap gap-2 text-xs text-white/60 transition-all duration-500 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
            >
              {visibleTechs.map(tech => (
                <span key={tech}>{tech}</span>
              ))}
              {extraTechs > 0 && (
                <span className="text-white/40">+{extraTechs}</span>
              )}
            </div>
          </div>

          {/* año */}
          {year && (
            <span className="hidden md:block shrink-0 text-sm text-white/50 tracking-wide">
              {year}
            </span>
          )}

          {/* círculo con flecha */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 md:relative md:top-auto md:translate-y-0">
            <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]/10">
              <ArrowUpRight className="w-5 h-5 text-white/60 transition-all duration-300 group-hover:text-[var(--accent)] group-hover:rotate-45" />
            </div>
          </div>
        </div>

        {/* panel expandido: imagen + descripción + enlaces */}
        <div
          className={`relative z-10 overflow-hidden transition-all duration-700 ease-out ${
            isHovered ? 'max-h-[420px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* imagen */}
            <div className="relative aspect-video rounded-md overflow-hidden">
              <ProjectImage
                src={safeImg(project)}
                alt={project.name}
                title={project.name}
                className="h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
            </div>

            {/* texto + acciones */}
            <div className="flex flex-col justify-between h-full py-2">
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                {project.description}
              </p>
 <div className="flex gap-3 mt-6">
  {project.url && (
    <Link
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex items-center justify-center
        w-11 h-11 rounded-full
        border border-white/10
        bg-transparent backdrop-blur-sm
        transition-all duration-300
        hover:bg-white/5 hover:border-white/20
        hover:shadow-[0_0_8px_rgba(255,255,255,0.12)]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-white/80 focus-visible:ring-offset-2
        focus-visible:ring-offset-[#060013]
      "
    >
      <span className="sr-only">
        Ver proyecto {project.name} en una nueva pestaña
      </span>
      <ExternalLink
        aria-hidden="true"
        className="
          w-4 h-4 text-white/80
          transition-all duration-300
          group-hover:text-white
          group-hover:-translate-y-0.5 group-hover:translate-x-0.5
        "
      />
    </Link>
  )}

  {project.gitHub && (
    <Link
      href={project.gitHub}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex items-center justify-center
        w-11 h-11 rounded-full
        border border-white/10
        bg-transparent backdrop-blur-sm
        transition-all duration-300
        hover:bg-white/5 hover:border-white/20
        hover:shadow-[0_0_8px_rgba(255,255,255,0.12)]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-white/80 focus-visible:ring-offset-2
        focus-visible:ring-offset-[#060013]
      "
    >
      <span className="sr-only">
        Ver código de {project.name} en GitHub
      </span>
      <Github
        aria-hidden="true"
        className="
          w-4 h-4 text-white/70
          transition-all duration-300
          group-hover:text-white
          group-hover:rotate-3
        "
      />
    </Link>
  )}
</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}


/* ============================
   Tarjeta en GRID (layout actual)
   ============================ */
// function GridProjectCard({ project, index }: { project: LocalProject; index: number }) {
//   // limitamos tecnologías para que la tarjeta no explote
//   const visibleTechs = project.technologies?.slice(0, 4) ?? []

//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.3 }}
//       transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
//       whileHover={{ y: -4 }}
//       className="relative flex flex-col rounded-xl border border-white/5 bg-white/5/0
//                  backdrop-blur-sm px-3 pt-3 pb-4
//                  hover:border-[var(--accent)] hover:bg-white/5
//                  transition-colors duration-200"
//     >
//       {isInDev(project) && (
//         <span
//           className="absolute right-3 top-3 z-20 inline-flex items-center gap-1
//                      rounded-full border border-yellow-500/40 bg-yellow-500/15
//                      px-2 py-0.5 text-[10px] uppercase tracking-wide text-yellow-100"
//         >
//           En desarrollo
//         </span>
//       )}

//       {/* Imagen más pequeña, con borde suave */}
//       <div className="relative mb-3 overflow-hidden rounded-lg border border-white/5 aspect-[4/3]">
//         <ProjectImage
//           src={safeImg(project)}
//           alt={project.name}
//           title={project.name}
//           className="h-full"
//         />
//         <motion.div
//           className="pointer-events-none absolute inset-0"
//           initial={{ opacity: 0 }}
//           whileHover={{ opacity: 0.15 }}
//           style={{ background: 'linear-gradient(135deg, #d946ef 0%, #6366f1 100%)' }}
//         />
//       </div>

//       {/* Contenido */}
//       <div className="flex flex-1 flex-col gap-2">
//         <h4 className="text-base font-semibold text-gray-50">
//           {project.name}
//         </h4>

//         <p className="text-sm leading-relaxed text-gray-300/90 line-clamp-3">
//           {project.description}
//         </p>

//         {/* Tecnologías: máximo 4, más pequeñas */}
//         {visibleTechs.length > 0 && (
//           <div className="mt-1 flex flex-wrap gap-1.5">
//             {visibleTechs.map((tech, i) => (
//               <div
//                 key={`${tech.name}-${i}`}
//                 className="inline-flex items-center gap-1 rounded-full border border-white/10
//                            bg-white/5 px-2 py-0.5 text-[11px] text-gray-100"
//                 title={tech.name}
//                 aria-label={tech.name}
//               >
//                 {tech.img && (
//                   <Image
//                     src={tech.img}
//                     alt={tech.name}
//                     width={14}
//                     height={14}
//                     className="object-contain"
//                     unoptimized
//                   />
//                 )}
//                 <span className="truncate max-w-[80px]">{tech.name}</span>
//               </div>
//             ))}
//             {project.technologies && project.technologies.length > visibleTechs.length && (
//               <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-gray-300/80">
//                 +{project.technologies.length - visibleTechs.length}
//               </span>
//             )}
//           </div>
//         )}

//         {/* Enlaces: solo iconos, muy limpios */}
//         <div className="mt-3 flex items-center justify-between text-xs text-gray-300/80">
//           <div className="flex gap-1.5">
//             {project.url && (
//               <Link
//                 href={project.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 title="Ver proyecto"
//                 className="inline-flex h-8 w-8 items-center justify-center rounded-full
//                            border border-white/10 bg-white/5
//                            hover:border-[var(--accent)] hover:bg-[var(--accent)]/15
//                            transition"
//               >
//                 <ExternalLink size={14} />
//               </Link>
//             )}

//             {project.gitHub ? (
//               <Link
//                 href={project.gitHub}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 title="Ver código en GitHub"
//                 className="inline-flex h-8 w-8 items-center justify-center rounded-full
//                            border border-white/10 bg-white/5
//                            hover:border-[var(--accent)] hover:bg-[var(--accent)]/15
//                            transition"
//               >
//                 <Github size={14} />
//               </Link>
//             ) : (
//               <span
//                 title="Repositorio privado / pendiente"
//                 className="inline-flex h-8 w-8 items-center justify-center rounded-full
//                            border border-white/5 bg-white/0 text-white/40"
//               >
//                 <Lock size={14} />
//               </span>
//             )}
//           </div>

//           {/* CTA secundaria para abrir modal si lo usas así */}
//           <button
//             type="button"
//             onClick={() => {
//               // si quieres que el modal se abra desde aquí,
//               // luego adaptamos el flujo con una prop o contexto;
//               // de momento lo dejamos vacío para no romper nada.
//             }}
//             className="cursor-default text-[11px] text-gray-400/80"
//             aria-hidden="true"
//           >
//             {/* sitio reservado para "más detalles" si lo necesitas luego */}
//           </button>
//         </div>
//       </div>
//     </motion.article>
//   )
// }





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

/* ============================
   Tarjeta HORIZONTAL (destacados)
   ============================ */
// function HorizontalProjectCard({ project, index }: { project: LocalProject; index: number }) {
//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.3 }}
//       transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
//       className="relative border border-gray-700 bg-white/5 backdrop-blur-sm rounded-l overflow-hidden
//                  shadow-sm hover:shadow-xl transition max-w-6xl mx-auto" 
//     >
//       {isInDev(project) && (
//         <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1
//                          text-xs px-2 py-1 bg-yellow-500/30 border border-yellow-500/35
//                          text-yellow-200 shadow-sm pointer-events-none">
//           En desarrollo
//         </span>
//       )}

//       <div className="flex flex-col md:flex-row md:items-stretch">
//         {/* Columna izquierda */}
//         <motion.div
//           className="relative w-full overflow-hidden
//              aspect-[16/9]
//              md:aspect-auto md:w-[55%] md:self-stretch md:min-h-[260px]" 
//           whileHover={{ scale: 1.02 }}
//           transition={{ type: 'spring', stiffness: 300, damping: 22 }}
//         >
//           <ProjectImage
//             src={safeImg(project)}
//             alt={project.name}
//             title={project.name}
//             className="h-full"
//           />
//           <motion.div
//             className="absolute inset-0 pointer-events-none"
//             initial={{ opacity: 0 }}
//             whileHover={{ opacity: 0.12 }}
//             style={{ background: 'linear-gradient(135deg, #d946ef 0%, #6366f1 100%)' }}
//           />
//         </motion.div>

//         {/* Contenido a la derecha */}
//         <div className="p-8 md:w-[45%] flex flex-col justify-between"> 
//           <div>
//             <h3 className="text-2xl text-gray-100 font-semibold mb-2 relative after:content-[''] after:block after:w-10 after:h-1 after:bg-gray-100 after:mt-1 after:mb-3 rounded-full">
//               {project.name}
//             </h3>
//             <p className="text-md text-gray-300 leading-relaxed line-clamp-5">
//               {project.description}
//             </p>

//             {project.technologies && (
//               <div className="flex flex-wrap gap-2 mt-4">
//                 {project.technologies.map((tech, i) => (
//                   <div
//                     key={`${tech.name}-${i}`}
//                     className="flex items-center gap-2 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-gray-100 backdrop-blur-md shadow-inner"
//                     title={tech.name}
//                     aria-label={tech.name}
//                   >
//                     <motion.div whileHover={{ scale: 1.2 }}>
//                       <Image
//                         src={tech.img || '/placeholder.webp'}
//                         alt={tech.name}
//                         width={16}
//                         height={16}
//                         className="object-contain"
//                         unoptimized
//                       />
//                     </motion.div>
//                     <span className="whitespace-nowrap">{tech.name}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//             <div className="mt-6 flex w-full gap-x-3 justify-between">
//               {project.url && (
//                 <Link
//                   href={project.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="group relative inline-flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-3
//                             text-xs font-semibold text-white overflow-hidden
//                             bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600
//                             hover:from-violet-500 hover:via-purple-500 hover:to-blue-500
//                             shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40
//                             transform-gpu transition-all duration-300 ease-out
//                             hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0
//                             border border-white/10 backdrop-blur-sm"
//                   title={`Abrir ${project.name}`}
//                 >
//                   <ExternalLink
//                     size={14}
//                     className="transition-transform duration-300 group-hover:scale-110 relative z-10"
//                   />
//                   <span className="relative z-10">Ver proyecto</span>
//                 </Link>
//               )}

//               {project.gitHub ? (
//                 <Link
//                   href={project.gitHub}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="group relative inline-flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2
//                             text-xs font-semibold text-white overflow-hidden
//                             bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800
//                             hover:from-slate-700 hover:via-gray-700 hover:to-zinc-700
//                             shadow-lg shadow-black/25 hover:shadow-xl hover:shadow-black/40
//                             transform-gpu transition-all duration-300 ease-out
//                             hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0
//                             border border-white/20 backdrop-blur-sm"
//                   title={`GitHub de ${project.name}`}
//                 >
//                   <Github
//                     size={14}
//                     className="transition-transform duration-300 group-hover:scale-110 relative z-10"
//                   />
//                   <span className="relative z-10">GitHub</span>
//                 </Link>
//               ) : (
//                 <button
//                   type="button"
//                   aria-disabled
//                   title="Repositorio privado / pendiente de publicación"
//                   className="inline-flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-semibold
//                             text-white/80 bg-gradient-to-r from-slate-800/60 via-gray-800/60 to-zinc-800/60
//                             cursor-not-allowed opacity-60 border border-white/10 backdrop-blur-sm"
//                 >
//                   <Lock size={14} />
//                   <span>GitHub</span>
//                 </button>
//               )}
//             </div>

//         </div>
//       </div>
//     </motion.article>
//   )
// }

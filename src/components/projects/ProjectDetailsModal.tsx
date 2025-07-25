'use client'

import { ProjectType } from '@/app/types/projectType'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  onClose: () => void
  project: ProjectType
}

export default function ProjectDetailsModal({ onClose, project }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
const closeImage = () => setSelectedImage(null)
  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
      <div className="bg-white dark:bg-zinc-900 max-w-5xl w-full rounded-xl shadow-xl overflow-y-auto max-h-[90vh] relative">
        <button
          className="absolute top-3 right-3 text-zinc-600 dark:text-zinc-300 hover:text-zinc-500 cursor-pointer"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-center mb-2">{project.name}</h3>

          {project.details?.intro && (
            <p className="text-[16px] text-gray-700 dark:text-gray-300">{project.details.intro}</p>
          )}

          {project.details?.frontend && project.details.frontend.length > 0 && (
            <div>
              <p className="font-medium mt-4">Frontend:</p>
              <ul className="list-disc ml-5 text-[16px]">
                {project.details.frontend.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {project.details?.backend && project.details.backend.length > 0 && (
            <div>
              <p className="font-medium text-[16px] mt-4">Backend:</p>
              <ul className="list-disc ml-5 text-[16px]">
                {project.details.backend.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {project.details?.images && project.details.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
           {project.details.images.map((src, i) => (
              <div
                key={i}
                className="relative min-h-70 rounded overflow-hidden bg-gray-100 dark:bg-zinc-800 cursor-pointer"
                onClick={() => setSelectedImage(src)}
              >
                <Image
                  src={src}
                  alt={`Detalle ${i + 1}`}
                  fill
                  className="object-cover transition duration-200 hover:scale-105"
                  unoptimized
                />
              </div>
            ))}

            </div>
          )}
        </div>
        
      </div>
      {selectedImage && (
<div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={closeImage}>
      <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 text-white hover:text-red-400 z-10"
          onClick={closeImage}
        >
          <X size={28} />
        </button>
        <Image
          src={selectedImage}
          alt="Imagen ampliada"
          width={1200}
          height={800}
          className="w-full h-auto object-contain rounded-lg"
          unoptimized
      />
    </div>
  </div>
)}

    </div>
    
  )
}

'use client'
import { motion } from "framer-motion"
import { Linkedin, Mail } from "lucide-react"

export default function ContactSection() {
  return(
    <section id="contacto" className="py-20 px-4 max-w-[700px] mx-auto text-center text-white">
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className="text-3xl font-bold mb-6 tracking-wide relative after:content-[''] after:block after:w-12 after:h-1 after:mx-auto after:bg-fuchsia-500 after:mt-2 rounded-full"
  >
    ¿Hablamos?
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-lg text-gray-300 mb-6"
  >
    Puedes escribirme por email o conectar conmigo por LinkedIn. Estoy abierta a nuevas oportunidades o simplemente a charlar sobre proyectos.
  </motion.p>

  <div className="flex justify-center gap-6 mt-6">
    <a
      href="mailto:claramanzanocorona@gmail.com"
      className="bg-white text-slate-900 font-medium px-8 py-2 rounded-full shadow-md hover:shadow-lg transition hover:bg-gradient-to-tr from-blue-700 to-indigo-500 hover:text-white"
    >
      <Mail size={18} className="inline mr-2" />
      Enviar email
    </a>
    <a
      href="https://linkedin.com/in/clara-manzano-corona"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white text-slate-900 font-medium px-8 py-2 rounded-full shadow-md hover:shadow-lg transition hover:bg-gradient-to-tr from-blue-700 to-indigo-500 hover:text-white"
    >
      <Linkedin size={18} className="inline mr-2" />
      Conectar en LinkedIn
    </a>
  </div>
</section>
)  
}
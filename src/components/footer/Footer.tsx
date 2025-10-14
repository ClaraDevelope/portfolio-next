'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 px-4 py-10 text-sm text-gray-400">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-center gap-6 text-center md:text-left">

        
        <div>
          <p className="text-white font-semibold">Clara Manzano Corona</p>
          <p className="text-s mt-1">
            Portfolio construido con código propio.{' '}
            <a
              href="https://github.com/ClaraDevelope/portfolio-next"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Ver en GitHub
            </a>
          </p>
        </div>

        <div className="text-s text-gray-400 flex items-center gap-2">
          <p>Contenido libre salvo fotografías personales.</p>
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition"
          >
            <Image
              src="/icons/creative-commons.webp"
              alt="Licencia Creative Commons"
              width={24}
              height={24}
              className="opacity-70 hover:opacity-100 transition-all-duration-300"
            />
          </a>
          <span>2025</span>
        </div>

        <div className="text-s flex flex-col gap-1">
          <Link href="/privacy-policy" className="hover:text-white transition">
            Política de privacidad
          </Link>
        </div>

      </div>
    </footer>
  );
}

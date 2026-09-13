import FrameReveal from "../FrameReveal"

/**
 * /trabajo — Capítulo 03: Cartografiar para comprender.
 * La cartografía como aplicación concreta del trabajo (no el eje del
 * perfil): composición lateral con el mapa a ≈2/3 del ancho. Mapa
 * ilustrativo con lenguaje cartográfico real (calles con etiquetas,
 * manzanas y parcelas, río, límite municipal, norte y escala). Todos los
 * datos y marcadores son ficticios. El marco conductor actúa como zona de
 * detalle: sobre el mapa descansa una ventana que, al recibir el marco,
 * revela la capa de parcelas (técnica de clip-path de FrameReveal).
 */
function BaseMap() {
  return (
    <svg
      aria-hidden="true"
      className="block h-auto w-full"
      fill="none"
      viewBox="0 0 900 520"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Retícula geográfica tenue */}
      {[100, 200, 300, 400, 500, 600, 700, 800].map((x) => (
        <line key={`v-${x}`} stroke="#121113" strokeOpacity="0.05" x1={x} x2={x} y1="0" y2="520" />
      ))}
      {[100, 200, 300, 400].map((y) => (
        <line key={`h-${y}`} stroke="#121113" strokeOpacity="0.05" x1="0" x2="900" y1={y} y2={y} />
      ))}

      {/* Río */}
      <path
        d="M 310 -10 C 370 70 330 140 390 210 C 450 280 530 300 565 380 C 590 440 570 480 590 530 L 655 530 C 635 470 665 420 625 350 C 585 280 505 265 455 195 C 405 125 435 55 375 -10 Z"
        fill="#b7ccba"
        fillOpacity="0.45"
      />
      <text x="480" y="300" fill="#6f8373" fontFamily="Newsreader" fontSize="11" fontStyle="italic">
        R. Mayor
      </text>

      {/* Manzanas y parcelas base */}
      <g fill="#121113" fillOpacity="0.06" stroke="#121113" strokeOpacity="0.25" strokeWidth="1">
        <polygon points="20,30 210,30 210,115 20,115" />
        <polygon points="290,30 560,30 560,115 290,115" />
        <polygon points="680,30 870,30 870,115 680,115" />
        <polygon points="20,170 210,170 210,290 20,290" />
        <polygon points="290,170 340,170 340,290 290,290" />
        <polygon points="400,170 560,170 560,250 400,250" />
        <polygon points="400,270 560,270 560,290 400,290" />
        <polygon points="680,170 870,170 870,290 680,290" />
        <polygon points="20,360 210,360 210,470 20,470" />
        <polygon points="280,360 400,360 400,470 280,470" />
        <polygon points="680,360 660,470 870,470 870,360" />
        <polygon points="430,360 560,360 560,470 430,470" />
      </g>

      {/* Calles (doble trazo: sombra y luz) */}
      <g stroke="#121113" strokeOpacity="0.15" strokeWidth="16">
        <line x1="0" x2="900" y1="140" y2="140" />
        <line x1="0" x2="900" y1="330" y2="330" />
        <line x1="250" x2="250" y1="0" y2="520" />
        <line x1="640" x2="640" y1="0" y2="520" />
        <line x1="0" x2="900" y1="480" y2="60" />
      </g>
      <g stroke="#F4F0E6" strokeWidth="12">
        <line x1="0" x2="900" y1="140" y2="140" />
        <line x1="0" x2="900" y1="330" y2="330" />
        <line x1="250" x2="250" y1="0" y2="520" />
        <line x1="640" x2="640" y1="0" y2="520" />
      </g>
      <line stroke="#F4F0E6" strokeWidth="14" x1="0" x2="900" y1="480" y2="60" />

      {/* Etiquetas de calles */}
      <text x="70" y="132" fill="#6f8373" fontFamily="Newsreader" fontSize="10" fontStyle="italic" letterSpacing="2">
        C. Mayor
      </text>
      <text transform="rotate(-90 242 230)" x="242" y="230" fill="#6f8373" fontFamily="Newsreader" fontSize="10" fontStyle="italic" letterSpacing="2">
        C. Hondura
      </text>
      <text transform="rotate(-25 690 150)" x="690" y="150" fill="#6f8373" fontFamily="Newsreader" fontSize="10" fontStyle="italic" letterSpacing="2">
        Av. del Río
      </text>

      {/* Límite municipal */}
      <path
        d="M 520 -10 C 500 120 580 200 560 330 C 540 460 620 500 600 530"
        stroke="#968e95"
        strokeDasharray="8 5"
        strokeWidth="1.5"
      />
      <text x="560" y="60" fill="#968e95" fontFamily="Plus Jakarta Sans" fontSize="8" letterSpacing="1.5">
        LÍMITE MUNICIPAL
      </text>

      {/* Parque */}
      <rect fill="#b7ccba" fillOpacity="0.5" height="100" rx="2" width="120" x="700" y="360" />
      <text x="745" y="415" fill="#6f8373" fontFamily="Plus Jakarta Sans" fontSize="8" letterSpacing="1.5" textAnchor="middle">
        PARQUE
      </text>

      {/* Marcadores ficticios */}
      <g>
        <circle cx="300" cy="200" fill="#FF6B4A" r="5" />
        <text x="312" y="196" fill="#E85338" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="600" letterSpacing="1.5">
          SECTOR NORTE
        </text>
      </g>
      <g>
        <circle cx="640" cy="140" fill="#FF6B4A" r="5" />
        <text x="600" y="128" fill="#E85338" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="600" letterSpacing="1.5">
          ANTENA A-17
        </text>
      </g>
      <g>
        <circle cx="500" cy="420" fill="#FF6B4A" r="5" />
        <text x="512" y="416" fill="#E85338" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="600" letterSpacing="1.5">
          PARCELA 04-21
        </text>
      </g>

      {/* Norte */}
      <g>
        <line stroke="#121113" strokeOpacity="0.6" x1="860" x2="860" y1="58" y2="26" />
        <polygon fill="#121113" fillOpacity="0.6" points="860,18 855,30 865,30" />
        <text x="856" y="72" fill="#121113" fillOpacity="0.6" fontFamily="Newsreader" fontSize="11">
          N
        </text>
      </g>

      {/* Escala */}
      <g>
        <rect fill="#121113" fillOpacity="0.7" height="4" width="40" x="30" y="496" />
        <rect fill="#F4F0E6" height="4" stroke="#121113" strokeOpacity="0.7" strokeWidth="1" width="40" x="70" y="496" />
        <text x="30" y="490" fill="#121113" fillOpacity="0.7" fontFamily="Plus Jakarta Sans" fontSize="8">
          0
        </text>
        <text x="100" y="490" fill="#121113" fillOpacity="0.7" fontFamily="Plus Jakarta Sans" fontSize="8">
          200 m
        </text>
      </g>
    </svg>
  )
}

/**
 * Capa de parcelas: solo visible dentro de la ventana del marco conductor.
 */
function ParcelLayer() {
  return (
    <svg
      aria-hidden="true"
      className="block h-full w-full"
      fill="none"
      viewBox="0 0 900 520"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="#FF6B4A"
        fillOpacity="0.14"
        stroke="#FF6B4A"
        strokeWidth="2"
      >
        <polygon points="290,90 380,90 380,115 290,115" />
        <polygon points="400,90 480,90 480,115 400,115" />
        <polygon points="490,90 560,90 560,115 490,115" />
        <polygon points="400,170 480,170 480,210 400,210" />
        <polygon points="490,170 560,170 560,250 490,250" />
        <polygon points="400,220 480,220 480,250 400,250" />
        <polygon points="400,270 480,270 480,290 400,290" />
        <polygon points="490,270 560,270 560,290 490,290" />
      </g>
      <g fill="#E85338" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="600">
        <text x="300" y="107">04-19</text>
        <text x="410" y="107">04-20</text>
        <text x="500" y="107">04-21</text>
        <text x="410" y="195">04-22</text>
        <text x="500" y="195">04-23</text>
        <text x="410" y="242">08-07</text>
        <text x="410" y="285">08-08</text>
        <text x="500" y="285">08-09</text>
      </g>
      {/* Etiqueta de la capa, dentro de la zona de zoom */}
      <g>
        <rect fill="#121113" fillOpacity="0.75" height="20" rx="2" width="150" x="392" y="52" />
        <text x="402" y="66" fill="#EDE8E0" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="600" letterSpacing="2">
          CAPA · PARCELAS
        </text>
      </g>
    </svg>
  )
}

export default function WorkCartography() {
  return (
    <section
      id="trabajo-cartografiar"
      aria-labelledby="titulo-trabajo-cartografiar"
      className="w-full scroll-mt-28 bg-midnight-wine py-20 text-on-surface md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-4xl pb-space-xl">
          <div className="flex items-center gap-space-xs pb-space-xs">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-flame-orange" />
            <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-flame-orange">
              Capítulo 03 · Cartografía
            </span>
          </div>
          <h2
            id="titulo-trabajo-cartografiar"
            className="font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-on-surface lg:text-headline-xl"
          >
            Cartografiar para <span className="font-light italic text-primary">comprender</span>
          </h2>
        </div>

        {/* Composición lateral: texto (≈1/3) junto al mapa (≈2/3 del ancho),
            para presentar la cartografía como una aplicación concreta del
            trabajo y no como el eje de la página. */}
        <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
          <div className="space-y-space-md lg:col-span-4">
            <p className="font-sans text-body-lead text-on-surface/90">
              Una de las formas que ha tomado este trabajo es el desarrollo de herramientas
              cartográficas para organizar y consultar información técnica: ubicar elementos,
              combinar capas y representar datos sobre el territorio.
            </p>
            <p className="font-sans text-caption leading-relaxed text-on-surface-variant">
              El mapa de esta página es ilustrativo: la capa de parcelas se revela dentro del
              marco.
            </p>
          </div>

          {/* Mapa ilustrativo con ventana de zoom del marco conductor */}
          <div className="overflow-hidden rounded-sm border border-outline-variant/30 bg-paper-dim shadow-xl lg:col-span-8">
            <div className="relative">
              <BaseMap />
              <FrameReveal>
                <ParcelLayer />
              </FrameReveal>
              {/* Zona de zoom: objetivo del marco. Al recibirlo, revela la capa
                  de parcelas exactamente dentro de sus límites. */}
              <div
                data-frame-target
                aria-hidden="true"
                className="pointer-events-none absolute left-[36%] top-[12%] h-[48%] w-[34%]"
              />
            </div>
            {/* El mapa es un SVG ficticio creado localmente: sin atribución a
                fuentes externas (Leaflet/KML son herramientas reales de mi
                trabajo, pero este mapa no las utiliza). */}
            <div className="flex flex-col items-start justify-between gap-space-xs border-t border-rich-ink/10 bg-paper-dim px-space-md py-2 text-rich-ink/60 sm:flex-row sm:items-center">
              <span className="font-sans text-label-technical font-semibold uppercase tracking-widest">
                Representación con datos ficticios
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

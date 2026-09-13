/**
 * /trabajo — Proyectos desarrollados desde cero (carbón profundo).
 * Cuatro servicios construidos íntegramente desde cero, presentados justo
 * después de la introducción de la página y antes de los capítulos:
 * bloques editoriales con una composición conceptual pequeña (datos
 * ficticios, sin código ni información de los repositorios). Sin enlaces
 * ni rutas: es una sección descriptiva. Cada bloque es un objetivo del
 * marco conductor, que los recorre en orden antes de pasar a la sección
 * de aplicación.
 *
 * Composiciones (no diagramas de cajas y flechas):
 *  01. Mesa de montaje documental: documentos superpuestos, fragmento de
 *      XML, firma, sello y paquete final.
 *  02. Transparencias cartográficas: capas de fuentes distintas
 *      completando una misma ficha.
 *  03. Secuencia de tres fotogramas: acceso bloqueado, código OTP y
 *      sesión abierta.
 *  04. Hoja de contactos: miniaturas de plantillas con retículas y
 *      estructuras de página distintas.
 */

/**
 * 01. Mesa de montaje documental (ficticio).
 */
function DocumentDeskSketch() {
  return (
    <svg
      aria-hidden="true"
      className="block h-auto w-full"
      fill="none"
      viewBox="0 0 340 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sombra de la mesa */}
      <ellipse cx="170" cy="136" fill="#000000" fillOpacity="0.35" rx="140" ry="7" />

      {/* Documento de fondo (rotado) */}
      <g transform="rotate(-6 75 80)">
        <rect fill="#1f201e" height="88" stroke="#4b454b" strokeWidth="1" width="110" x="22" y="32" />
        <rect fill="#4b454b" height="3" opacity="0.8" width="88" x="32" y="44" />
        <rect fill="#4b454b" height="3" opacity="0.8" width="70" x="32" y="54" />
        <rect fill="#4b454b" height="3" opacity="0.8" width="80" x="32" y="64" />
        <rect fill="none" height="24" stroke="#4b454b" strokeWidth="1" width="24" x="32" y="84" />
      </g>

      {/* Hoja con fragmento XML (rotada) */}
      <g transform="rotate(4 170 60)">
        <rect fill="#1b1c1a" height="86" stroke="#b7ccba" strokeOpacity="0.5" strokeWidth="1" width="100" x="125" y="14" />
        <rect fill="#0e0e0d" height="66" stroke="#4b454b" strokeWidth="1" width="84" x="133" y="24" />
        <text fill="#b7ccba" fontFamily="monospace" fontSize="7" x="139" y="38">&lt;cert&gt;</text>
        <text fill="#b7ccba" fontFamily="monospace" fontSize="7" x="139" y="50">&lt;id&gt;04-21&lt;/id&gt;</text>
        <text fill="#b7ccba" fontFamily="monospace" fontSize="7" x="139" y="62">&lt;med/&gt;</text>
        <text fill="#b7ccba" fontFamily="monospace" fontSize="7" x="139" y="74">&lt;foto/&gt;</text>
        <text fill="#b7ccba" fontFamily="monospace" fontSize="7" x="139" y="86">&lt;/cert&gt;</text>
      </g>

      {/* Documento principal (papel), con firma y sello */}
      <g>
        <rect fill="#EDE8E0" height="84" width="140" x="82" y="44" />
        <rect fill="#121113" height="6" opacity="0.8" width="62" x="90" y="52" />
        <rect fill="#9a948e" height="3" width="104" x="90" y="66" />
        <rect fill="#9a948e" height="3" width="78" x="90" y="74" />
        <rect fill="#9a948e" height="3" width="90" x="90" y="82" />
        {/* Firma manuscrita (trazo ficticio) */}
        <path
          d="M 98 108 C 108 96 112 116 122 104 S 138 112 148 102 S 162 110 172 104"
          stroke="#E85338"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M 95 114 H 175" stroke="#121113" strokeOpacity="0.4" strokeWidth="1" />
        {/* Sello de validación */}
        <g transform="rotate(-14 200 78)">
          <rect fill="none" height="24" rx="3" stroke="#E85338" strokeWidth="2" width="58" x="172" y="66" />
          <text fill="#E85338" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="700" letterSpacing="2" textAnchor="middle" x="201" y="82">
            VÁLIDO
          </text>
        </g>
        {/* Sello de comprobación */}
        <circle cx="212" cy="58" fill="#EDE8E0" r="10" stroke="#121113" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M 207 58 l 4 4 l 8 -8" stroke="#E85338" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Paquete final */}
      <g>
        <rect fill="#221226" height="58" stroke="#d4c1d5" strokeWidth="1" width="64" x="252" y="58" />
        <rect fill="#FF6B4A" height="8" opacity="0.85" width="64" x="252" y="82" />
        <text fill="#d4c1d5" fontFamily="monospace" fontSize="8" letterSpacing="1.5" textAnchor="middle" x="284" y="108">
          ENTREGA
        </text>
      </g>

      {/* Anotaciones editoriales */}
      <path d="M 46 22 L 52 34" stroke="#4b454b" strokeWidth="0.75" />
      <text fill="#6f8373" fontFamily="Newsreader" fontSize="8" fontStyle="italic" x="14" y="18">
        documentación
      </text>
      <path d="M 172 12 L 175 16" stroke="#4b454b" strokeWidth="0.75" />
      <text fill="#6f8373" fontFamily="Newsreader" fontSize="8" fontStyle="italic" x="148" y="9">
        fragmento xml
      </text>
      <text fill="#6f8373" fontFamily="Newsreader" fontSize="8" fontStyle="italic" x="96" y="146">
        firma y sello
      </text>
      <text fill="#6f8373" fontFamily="Newsreader" fontSize="8" fontStyle="italic" x="254" y="146">
        paquete final
      </text>
    </svg>
  )
}

/**
 * 02. Transparencias cartográficas completando una ficha (ficticio).
 */
function LayeredSourcesSketch() {
  return (
    <svg
      aria-hidden="true"
      className="block h-auto w-full"
      fill="none"
      viewBox="0 0 340 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Capa de catastro (rotada, con coordenadas ficticias) */}
      <g transform="rotate(-7 70 60)">
        <rect fill="#b7ccba" fillOpacity="0.12" height="100" stroke="#b7ccba" strokeDasharray="4 3" strokeOpacity="0.5" width="150" x="20" y="24" />
        <text fill="#b7ccba" fontFamily="Plus Jakarta Sans" fontSize="7" letterSpacing="2" x="46" y="36">
          CATASTRO
        </text>
        <rect fill="none" height="28" stroke="#b7ccba" strokeOpacity="0.7" strokeWidth="1" width="34" x="40" y="44" />
        <path d="M 30 100 L 90 70 L 140 96" stroke="#b7ccba" strokeOpacity="0.6" strokeWidth="1" />
        <text fill="#b7ccba" fillOpacity="0.8" fontFamily="monospace" fontSize="6.5" x="60" y="118">
          N 41.0° · O 4.0°
        </text>
      </g>

      {/* Capa de registro de antenas (rotada) */}
      <g transform="rotate(5 160 70)">
        <rect fill="#d4c1d5" fillOpacity="0.12" height="96" stroke="#d4c1d5" strokeDasharray="4 3" strokeOpacity="0.5" width="140" x="120" y="18" />
        <text fill="#d4c1d5" fontFamily="Plus Jakarta Sans" fontSize="7" letterSpacing="2" x="146" y="30">
          REGISTRO
        </text>
        <circle cx="150" cy="50" fill="#d4c1d5" r="3.5" />
        <circle cx="190" cy="42" fill="#d4c1d5" r="3.5" />
        <circle cx="210" cy="74" fill="#d4c1d5" r="3.5" />
        <path d="M 160 84 A 30 30 0 0 1 220 84" stroke="#d4c1d5" strokeDasharray="3 3" strokeOpacity="0.7" strokeWidth="1" />
      </g>

      {/* Ficha que se completa (papel) */}
      <g>
        <rect fill="#EDE8E0" height="84" width="118" x="196" y="40" />
        <text fill="#121113" fillOpacity="0.6" fontFamily="Plus Jakarta Sans" fontSize="7" letterSpacing="2" x="204" y="52">
          FICHA
        </text>
        {/* Filas completadas por cada fuente; una pendiente */}
        <circle cx="206" cy="62" fill="#b7ccba" r="2.5" />
        <rect fill="#9a948e" height="3" width="16" x="214" y="60" />
        <rect fill="#b7ccba" height="4" width="72" x="234" y="60" />
        <circle cx="206" cy="74" fill="#d4c1d5" r="2.5" />
        <rect fill="#9a948e" height="3" width="16" x="214" y="72" />
        <rect fill="#d4c1d5" height="4" width="54" x="234" y="72" />
        <circle cx="206" cy="86" fill="#E85338" r="2.5" />
        <rect fill="#9a948e" height="3" width="16" x="214" y="84" />
        <rect fill="#E85338" height="4" width="34" x="234" y="84" />
        <circle cx="206" cy="98" fill="#9a948e" r="2.5" />
        <rect fill="#9a948e" height="3" width="16" x="214" y="96" />
        <rect fill="none" height="4" stroke="#9a948e" strokeDasharray="3 2" strokeWidth="1" width="40" x="234" y="96" />
        <text fill="#121113" fillOpacity="0.45" fontFamily="monospace" fontSize="6.5" x="204" y="116">
          pendiente · fuente 3
        </text>
      </g>

      {/* Anotación */}
      <text fill="#6f8373" fontFamily="Newsreader" fontSize="8" fontStyle="italic" x="20" y="142">
        tres fuentes, una misma ficha
      </text>
    </svg>
  )
}

/**
 * 03. Secuencia de fotogramas: bloqueo, código y sesión (ficticio).
 */
function AccessFramesSketch() {
  const holes = Array.from({ length: 12 })
  return (
    <svg
      aria-hidden="true"
      className="block h-auto w-full"
      fill="none"
      viewBox="0 0 340 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Perforaciones de la tira */}
      {holes.map((_, i) => (
        <rect key={`t-${i}`} fill="#EDE8E0" fillOpacity="0.25" height="5" rx="1" width="10" x={20 + i * 27} y="8" />
      ))}
      {holes.map((_, i) => (
        <rect key={`b-${i}`} fill="#EDE8E0" fillOpacity="0.25" height="5" rx="1" width="10" x={20 + i * 27} y="137" />
      ))}

      {/* F.1 — Acceso bloqueado */}
      <g>
        <rect fill="#1b1c1a" height="104" stroke="#4b454b" strokeWidth="1" width="92" x="18" y="22" />
        <text fill="#FF6B4A" fontFamily="monospace" fontSize="7" x="25" y="34">F.1</text>
        <rect fill="#0e0e0d" height="56" stroke="#d4c1d5" strokeWidth="1.5" width="52" x="38" y="46" />
        <path d="M 44 50 V 98 M 62 50 V 98 M 80 50 V 98" stroke="#4b454b" strokeWidth="1" />
        <path d="M 56 68 v -6 a 8 8 0 0 1 16 0 v 6" stroke="#FF6B4A" strokeWidth="2" />
        <rect fill="#FF6B4A" height="18" width="24" x="52" y="68" />
        <circle cx="64" cy="75" fill="#121113" r="2.5" />
        <text fill="#6f8373" fontFamily="Plus Jakarta Sans" fontSize="7" letterSpacing="2" textAnchor="middle" x="64" y="118">
          BLOQUEO
        </text>
      </g>

      {/* F.2 — Introducción del código */}
      <g>
        <rect fill="#1b1c1a" height="104" stroke="#4b454b" strokeWidth="1" width="92" x="124" y="22" />
        <text fill="#FF6B4A" fontFamily="monospace" fontSize="7" x="131" y="34">F.2</text>
        <rect fill="#0e0e0d" height="22" stroke="#d4c1d5" strokeWidth="1" width="16" x="140" y="58" />
        <rect fill="#0e0e0d" height="22" stroke="#d4c1d5" strokeWidth="1" width="16" x="158" y="58" />
        <rect fill="#0e0e0d" height="22" stroke="#FF6B4A" strokeWidth="1.5" width="16" x="176" y="58" />
        <rect fill="#0e0e0d" height="22" stroke="#4b454b" strokeWidth="1" width="16" x="194" y="58" />
        <text fill="#b7ccba" fontFamily="monospace" fontSize="10" textAnchor="middle" x="148" y="73">7</text>
        <text fill="#b7ccba" fontFamily="monospace" fontSize="10" textAnchor="middle" x="166" y="73">3</text>
        <text fill="#FF6B4A" fontFamily="monospace" fontSize="10" textAnchor="middle" x="184" y="73">•</text>
        <path d="M 140 92 H 210" stroke="#4b454b" strokeDasharray="3 3" strokeWidth="1" />
        <text fill="#6f8373" fontFamily="Plus Jakarta Sans" fontSize="7" letterSpacing="2" textAnchor="middle" x="170" y="118">
          CÓDIGO
        </text>
      </g>

      {/* F.3 — Sesión abierta */}
      <g>
        <rect fill="#1b1c1a" height="104" stroke="#4b454b" strokeWidth="1" width="92" x="230" y="22" />
        <text fill="#FF6B4A" fontFamily="monospace" fontSize="7" x="237" y="34">F.3</text>
        <path d="M 250 62 a 8 8 0 0 1 16 0 v 4" stroke="#b7ccba" strokeWidth="2" />
        <rect fill="#b7ccba" height="18" width="24" x="248" y="66" />
        <path d="M 282 58 l 5 5 l 9 -9" stroke="#FF6B4A" strokeWidth="2" strokeLinecap="round" />
        <circle cx="276" cy="92" r="12" stroke="#FF6B4A" strokeDasharray="4 3" strokeWidth="1.5" />
        <text fill="#e4e2df" fontFamily="Plus Jakarta Sans" fontSize="6" letterSpacing="1" textAnchor="middle" x="276" y="94">
          SESIÓN
        </text>
        <text fill="#6f8373" fontFamily="Plus Jakarta Sans" fontSize="7" letterSpacing="2" textAnchor="middle" x="276" y="118">
          ABIERTA
        </text>
      </g>
    </svg>
  )
}

/**
 * 04. Hoja de contactos de plantillas (ficticio): miniaturas con
 * retículas y estructuras de página distintas; una seleccionada.
 */
function TemplatesSheetSketch() {
  const cell = (x: number, y: number) => ({ x, y })
  const cells = [
    cell(26, 40),
    cell(100, 40),
    cell(174, 40),
    cell(248, 40),
    cell(26, 84),
    cell(100, 84),
    cell(174, 84),
    cell(248, 84),
  ]
  return (
    <svg
      aria-hidden="true"
      className="block h-auto w-full"
      fill="none"
      viewBox="0 0 340 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hoja de contactos */}
      <rect fill="#1b1c1a" height="112" stroke="#4b454b" strokeWidth="1" width="312" x="14" y="18" />
      <text fill="#6f8373" fontFamily="Plus Jakarta Sans" fontSize="6" letterSpacing="1.5" x="22" y="30">
        PLANTILLAS · HOJA DE CONTACTOS
      </text>

      {/* Marcas de retícula */}
      <text fill="#FF6B4A" fontFamily="monospace" fontSize="9" x="18" y="28">+</text>
      <text fill="#FF6B4A" fontFamily="monospace" fontSize="9" x="316" y="28">+</text>
      <text fill="#FF6B4A" fontFamily="monospace" fontSize="9" x="18" y="128">+</text>
      <text fill="#FF6B4A" fontFamily="monospace" fontSize="9" x="316" y="128">+</text>

      {/* Miniatura a: cabecera y texto */}
      <g>
        <rect fill="#EDE8E0" height="34" width="66" x={cells[0].x} y={cells[0].y} />
        <rect fill="#121113" height="5" opacity="0.8" width="46" x={cells[0].x + 5} y={cells[0].y + 5} />
        <rect fill="#9a948e" height="2.5" width="54" x={cells[0].x + 5} y={cells[0].y + 16} />
        <rect fill="#9a948e" height="2.5" width="40" x={cells[0].x + 5} y={cells[0].y + 22} />
        <rect fill="#9a948e" height="2.5" width="48" x={cells[0].x + 5} y={cells[0].y + 28} />
      </g>

      {/* Miniatura b: tabla */}
      <g>
        <rect fill="#EDE8E0" height="34" width="66" x={cells[1].x} y={cells[1].y} />
        <rect fill="#121113" height="5" opacity="0.8" width="20" x={cells[1].x + 5} y={cells[1].y + 5} />
        <path d={`M ${cells[1].x + 5} ${cells[1].y + 16} V ${cells[1].y + 31} M ${cells[1].x + 61} ${cells[1].y + 16} V ${cells[1].y + 31} M ${cells[1].x + 5} ${cells[1].y + 23} H ${cells[1].x + 61}`} stroke="#121113" strokeOpacity="0.35" strokeWidth="1" />
      </g>

      {/* Miniatura c: con mapa (seleccionada) */}
      <g>
        <rect fill="#EDE8E0" height="34" stroke="#FF6B4A" strokeWidth="1.5" width="66" x={cells[2].x} y={cells[2].y} />
        <rect fill="#121113" height="5" opacity="0.8" width="30" x={cells[2].x + 5} y={cells[2].y + 5} />
        <path d={`M ${cells[2].x + 8} ${cells[2].y + 28} L ${cells[2].x + 26} ${cells[2].y + 18} L ${cells[2].x + 40} ${cells[2].y + 26}`} stroke="#b7ccba" strokeWidth="1.5" />
        <circle cx={cells[2].x + 50} cy={cells[2].y + 24} fill="#E85338" r="3" />
        <text fill="#FF6B4A" fontFamily="monospace" fontSize="9" x={cells[2].x + 58} y={cells[2].y + 10}>+</text>
      </g>

      {/* Miniatura d: con fotografía */}
      <g>
        <rect fill="#EDE8E0" height="34" width="66" x={cells[3].x} y={cells[3].y} />
        <rect fill="#121113" height="5" opacity="0.8" width="26" x={cells[3].x + 5} y={cells[3].y + 5} />
        <rect fill="#1f201e" height="16" width="24" x={cells[3].x + 5} y={cells[3].y + 14} />
        <rect fill="#9a948e" height="2.5" width="28" x={cells[3].x + 33} y={cells[3].y + 18} />
        <rect fill="#9a948e" height="2.5" width="22" x={cells[3].x + 33} y={cells[3].y + 24} />
      </g>

      {/* Miniatura e: con firma */}
      <g>
        <rect fill="#EDE8E0" height="34" width="66" x={cells[4].x} y={cells[4].y} />
        <rect fill="#121113" height="5" opacity="0.8" width="40" x={cells[4].x + 5} y={cells[4].y + 5} />
        <path d={`M ${cells[4].x + 8} ${cells[4].y + 26} C ${cells[4].x + 14} ${cells[4].y + 18} ${cells[4].x + 16} ${cells[4].y + 30} ${cells[4].x + 22} ${cells[4].y + 22} S ${cells[4].x + 34} ${cells[4].y + 28} ${cells[4].x + 40} ${cells[4].y + 22}`} stroke="#E85338" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Miniatura f: título grande */}
      <g>
        <rect fill="#EDE8E0" height="34" width="66" x={cells[5].x} y={cells[5].y} />
        <rect fill="#121113" height="7" opacity="0.8" width="54" x={cells[5].x + 5} y={cells[5].y + 6} />
        <rect fill="#9a948e" height="2.5" width="44" x={cells[5].x + 5} y={cells[5].y + 20} />
        <rect fill="#9a948e" height="2.5" width="52" x={cells[5].x + 5} y={cells[5].y + 26} />
      </g>

      {/* Miniatura g: lista de comprobación */}
      <g>
        <rect fill="#EDE8E0" height="34" width="66" x={cells[6].x} y={cells[6].y} />
        <rect fill="none" height="5" stroke="#121113" strokeOpacity="0.6" strokeWidth="1" width="5" x={cells[6].x + 6} y={cells[6].y + 7} />
        <rect fill="#E85338" height="5" width="5" x={cells[6].x + 6} y={cells[6].y + 16} />
        <rect fill="none" height="5" stroke="#121113" strokeOpacity="0.6" strokeWidth="1" width="5" x={cells[6].x + 6} y={cells[6].y + 25} />
        <rect fill="#9a948e" height="2.5" width="40" x={cells[6].x + 16} y={cells[6].y + 9} />
        <rect fill="#9a948e" height="2.5" width="34" x={cells[6].x + 16} y={cells[6].y + 18} />
        <rect fill="#9a948e" height="2.5" width="42" x={cells[6].x + 16} y={cells[6].y + 27} />
      </g>

      {/* Miniatura h: dos columnas */}
      <g>
        <rect fill="#EDE8E0" height="34" width="66" x={cells[7].x} y={cells[7].y} />
        <rect fill="#121113" height="5" opacity="0.8" width="22" x={cells[7].x + 5} y={cells[7].y + 5} />
        <path d={`M ${cells[7].x + 33} ${cells[7].y + 14} V ${cells[7].y + 31}`} stroke="#121113" strokeOpacity="0.35" strokeWidth="1" />
        <rect fill="#9a948e" height="2.5" width="24" x={cells[7].x + 6} y={cells[7].y + 17} />
        <rect fill="#9a948e" height="2.5" width="18" x={cells[7].x + 6} y={cells[7].y + 24} />
        <rect fill="#9a948e" height="2.5" width="24" x={cells[7].x + 37} y={cells[7].y + 17} />
        <rect fill="#9a948e" height="2.5" width="20" x={cells[7].x + 37} y={cells[7].y + 24} />
      </g>

      {/* Anotación */}
      <text fill="#6f8373" fontFamily="Newsreader" fontSize="8" fontStyle="italic" x="22" y="142">
        una plantilla por documento
      </text>
    </svg>
  )
}

const projects = [
  {
    number: "01",
    title: "Firma digital y preparación documental",
    description:
      "He desarrollado un servicio web que sustituye el uso manual de AutoFirma dentro del proceso. Valida la información, firma documentos PDF y XML mediante certificados electrónicos y genera automáticamente el paquete final, sin instalar ni ejecutar programas en cada equipo.",
    stack: ["Python", "Flask", "pyHanko", "lxml"],
    sketch: <DocumentDeskSketch />,
  },
  {
    number: "02",
    title: "Enriquecimiento de datos desde fuentes externas",
    description:
      "He creado un servicio que parte de unas coordenadas, consulta Catastro, fuentes públicas y otros sistemas, normaliza los resultados y los incorpora a la base de datos. También gestiona cargas masivas, validaciones previas y detección de duplicados para evitar correcciones manuales posteriores.",
    stack: ["Node.js", "TypeScript", "Express", "Supabase"],
    sketch: <LayeredSourcesSketch />,
  },
  {
    number: "03",
    title: "Integración con un portal sin API",
    description:
      "He construido una API para integrar un portal que no ofrecía una propia. El servicio gestiona el inicio de sesión, el doble factor mediante OTP, la persistencia y recuperación de la sesión, y transforma las respuestas del portal en datos estructurados que otras aplicaciones pueden utilizar.",
    stack: ["Node.js", "TypeScript", "Express"],
    sketch: <AccessFramesSketch />,
  },
  {
    number: "04",
    title: "Generación documental con plantillas HTML",
    description:
      "He diseñado un sistema que sustituye las plantillas Word por versiones HTML rellenadas automáticamente con los datos, mapas y fotografías de cada trabajo. Permite revisar el contenido, generar los PDF y conectarlos con el servicio de firma sin preparar cada documento manualmente.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "Puppeteer"],
    sketch: <TemplatesSheetSketch />,
  },
]

export default function WorkProjects() {
  return (
    <section
      id="trabajo-proyectos"
      aria-labelledby="titulo-trabajo-proyectos"
      className="w-full scroll-mt-28 bg-surface py-20 text-on-surface md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-4xl pb-space-xl">
          <div className="flex items-center gap-space-xs pb-space-xs">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-flame-orange" />
            <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-flame-orange">
              Proyectos
            </span>
          </div>
          <h2
            id="titulo-trabajo-proyectos"
            className="font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-on-surface lg:text-headline-xl"
          >
            Proyectos desarrollados <span className="font-light italic text-primary">desde cero</span>
          </h2>
          <p className="max-w-3xl pt-space-sm font-sans text-body-lead text-on-surface/90">
            Servicios profesionales que he diseñado y desarrollado desde cero para automatizar
            procesos, conectar sistemas y trabajar con información compleja.
          </p>
        </div>

        {/* Objetivos del marco conductor: un bloque por proyecto */}
        <div className="divide-y divide-outline-variant/20">
          {projects.map(({ number, title, description, stack, sketch }) => (
            <article
              key={number}
              data-frame-target
              className="grid grid-cols-1 items-center gap-space-lg p-space-lg md:grid-cols-12 lg:p-space-xl"
            >
              <div className="space-y-space-md md:col-span-7">
                <div className="flex items-baseline gap-space-sm">
                  <span className="font-mono text-sm text-flame-orange">{number}</span>
                  <h3 className="font-serif text-headline-sm font-medium text-on-surface">
                    {title}
                  </h3>
                </div>
                <p className="max-w-xl font-sans text-body-md leading-relaxed text-on-surface-variant">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2 pt-space-xs">
                  {stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm bg-surface-container px-3 py-1 font-sans text-label-technical font-semibold uppercase tracking-wider text-on-surface"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Composición conceptual ilustrativa */}
              <div className="border border-outline-variant/30 bg-surface-container-lowest p-space-md md:col-span-5">
                {sketch}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

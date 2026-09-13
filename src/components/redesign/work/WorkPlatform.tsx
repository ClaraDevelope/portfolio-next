/**
 * /trabajo — Evolucionar una aplicación en uso (marfil).
 * Sección diferenciada sobre una aplicación interna en producción, en
 * la que Clara trabaja de forma continuada desde su incorporación (no es
 * un proyecto "desde cero"). Cuatro áreas breves de aportación y una
 * composición conceptual tipo mesa de luz. El panel de la composición es
 * el objetivo del marco conductor en esta sección.
 */

/**
 * Mesa de luz por capas (datos ficticios): mapa de teselas en distintos
 * estados (cargada, pendiente, actualizada), transparencia cartográfica
 * con parcela, radio y coordenadas, fragmento de interfaz de capas, tira
 * de fotografías técnicas, plantilla documental y una indicación discreta
 * de automatización (datos → documento → validación). Sin antenas, logos
 * ni información real.
 */
const TILE_W = 48
const TILE_H = 53.5
const TILE_STEP_X = 49.5
const TILE_STEP_Y = 55
const MAP_X = 14
const MAP_Y = 56

/** Estados ficticios de las teselas: c = cargada, p = pendiente, a = actualizada */
const tileStates: Array<Array<"c" | "p" | "a">> = [
  ["c", "c", "c", "p", "c"],
  ["c", "c", "c", "c", "c"],
  ["p", "c", "c", "c", "a"],
]

const streetPaths = [
  "M 14 100 H 260",
  "M 14 158 H 260",
  "M 88 56 V 220",
  "M 178 56 V 220",
  "M 14 200 L 260 76",
]

function AppSketch() {
  return (
    <svg
      aria-hidden="true"
      className="block h-auto w-full"
      fill="none"
      viewBox="0 0 460 250"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ===== Capa base: mapa de teselas ===== */}
      {tileStates.flatMap((row, j) =>
        row.map((state, i) => {
          const x = MAP_X + i * TILE_STEP_X
          const y = MAP_Y + j * TILE_STEP_Y
          if (state === "p") return null
          return (
            <rect
              key={`tile-${i}-${j}`}
              fill="#EDE8E0"
              height={TILE_H}
              stroke="#121113"
              strokeOpacity="0.25"
              strokeWidth="0.75"
              width={TILE_W}
              x={x}
              y={y}
            />
          )
        }),
      )}
      {/* Parque ficticio en una tesela */}
      <rect fill="#b7ccba" fillOpacity="0.5" height="14" width="22" x="117" y="115" />

      {/* Calles (doble trazo, sobre las teselas cargadas) */}
      <g stroke="#121113" strokeOpacity="0.2" strokeWidth="5">
        {streetPaths.map((d) => (
          <path key={`casing-${d}`} d={d} />
        ))}
      </g>
      <g stroke="#F4F0E6" strokeWidth="3">
        {streetPaths.map((d) => (
          <path key={`core-${d}`} d={d} />
        ))}
      </g>

      {/* Teselas pendientes (tapan las calles) y actualizadas */}
      {tileStates.flatMap((row, j) =>
        row.map((state, i) => {
          const x = MAP_X + i * TILE_STEP_X
          const y = MAP_Y + j * TILE_STEP_Y
          if (state === "p") {
            return (
              <g key={`pend-${i}-${j}`}>
                <rect
                  fill="#1f201e"
                  fillOpacity="0.96"
                  height={TILE_H}
                  stroke="#4b454b"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                  width={TILE_W}
                  x={x}
                  y={y}
                />
                <text
                  fill="#6f8373"
                  fontFamily="monospace"
                  fontSize="9"
                  textAnchor="middle"
                  x={x + TILE_W / 2}
                  y={y + 24}
                >
                  ···
                </text>
                <text
                  fill="#6f8373"
                  fontFamily="Plus Jakarta Sans"
                  fontSize="5.5"
                  letterSpacing="1"
                  textAnchor="middle"
                  x={x + TILE_W / 2}
                  y={y + 40}
                >
                  PEND.
                </text>
              </g>
            )
          }
          if (state === "a") {
            return (
              <g key={`upd-${i}-${j}`}>
                <polygon
                  fill="#FF6B4A"
                  fillOpacity="0.9"
                  points={`${x + TILE_W - 10},${y} ${x + TILE_W},${y} ${x + TILE_W},${y + 10}`}
                />
                <text
                  fill="#E85338"
                  fontFamily="Plus Jakarta Sans"
                  fontSize="5.5"
                  letterSpacing="1"
                  textAnchor="end"
                  x={x + TILE_W - 4}
                  y={y + TILE_H - 5}
                >
                  ACT.
                </text>
              </g>
            )
          }
          return null
        }),
      )}

      {/* Marcas de recorte del mapa */}
      <path d="M 6 56 H 12 M 14 48 V 54 M 262 220 H 268 M 260 222 V 228" stroke="#4b454b" strokeWidth="1" />

      {/* ===== Transparencia cartográfica superpuesta ===== */}
      <g transform="rotate(-4 235 105)">
        <rect
          fill="#b7ccba"
          fillOpacity="0.1"
          height="126"
          stroke="#b7ccba"
          strokeDasharray="5 4"
          strokeOpacity="0.6"
          width="170"
          x="150"
          y="42"
        />
        {/* Cinta adhesiva en las esquinas */}
        <rect fill="#d8c7b5" fillOpacity="0.55" height="7" transform="rotate(-24 158 46)" width="18" x="150" y="42" />
        <rect fill="#d8c7b5" fillOpacity="0.55" height="7" transform="rotate(18 314 160)" width="18" x="304" y="156" />
        {/* Parcela */}
        <rect fill="#FF6B4A" fillOpacity="0.14" height="40" stroke="#E85338" strokeWidth="1.5" width="54" x="170" y="64" />
        <path d="M 197 64 V 104" stroke="#E85338" strokeOpacity="0.6" strokeWidth="1" />
        {/* Radio y marca de ubicación */}
        <circle cx="252" cy="120" fill="none" r="32" stroke="#E85338" strokeDasharray="6 3" strokeWidth="1.5" />
        <path d="M 252 120 H 284" stroke="#E85338" strokeOpacity="0.7" strokeWidth="1" />
        <circle cx="252" cy="120" fill="#E85338" r="3" />
        <path d="M 196 142 V 150 M 192 146 H 200" stroke="#FF6B4A" strokeWidth="1.5" />
        <circle cx="196" cy="146" fill="#FF6B4A" r="3.5" />
        {/* Coordenadas ficticias */}
        <text fill="#b7ccba" fontFamily="monospace" fontSize="6.5" x="156" y="162">
          N 41.0° · O 4.0°
        </text>
        <text fill="#b7ccba" fontFamily="Plus Jakarta Sans" fontSize="6" letterSpacing="1.5" x="156" y="52">
          CAPA
        </text>
      </g>

      {/* ===== Fragmento de interfaz: control de capas ===== */}
      <g transform="rotate(2 395 57)">
        <rect fill="#1f201e" height="86" stroke="#d4c1d5" strokeWidth="1" width="130" x="330" y="14" />
        <rect fill="#2a2a28" height="12" width="130" x="330" y="14" />
        <circle cx="338" cy="20" fill="#4b454b" r="2" />
        <circle cx="346" cy="20" fill="#4b454b" r="2" />
        <text fill="#6f8373" fontFamily="Plus Jakarta Sans" fontSize="6" letterSpacing="1.5" x="338" y="36">
          CAPAS
        </text>
        <rect fill="none" height="8" stroke="#b7ccba" strokeWidth="1" width="8" x="338" y="42" />
        <rect fill="#4b454b" height="3" width="72" x="352" y="44" />
        <rect fill="#FF6B4A" height="8" width="8" x="338" y="56" />
        <rect fill="#d4c1d5" fillOpacity="0.7" height="3" width="56" x="352" y="58" />
        <rect fill="none" height="8" stroke="#4b454b" strokeWidth="1" width="8" x="338" y="70" />
        <rect fill="#4b454b" height="3" width="64" x="352" y="72" />
        <rect fill="none" height="10" stroke="#4b454b" strokeWidth="1" width="22" x="428" y="42" />
        <rect fill="#FF6B4A" height="5" width="22" x="428" y="47" />
      </g>

      {/* ===== Plantilla documental ===== */}
      <g transform="rotate(-2 380 144)">
        <rect fill="#EDE8E0" height="64" width="88" x="336" y="112" />
        <rect fill="#121113" height="5" opacity="0.75" width="40" x="342" y="118" />
        <rect fill="#9a948e" height="2.5" width="70" x="342" y="130" />
        <rect fill="#9a948e" height="2.5" width="54" x="342" y="137" />
        <rect fill="#9a948e" height="2.5" width="62" x="342" y="144" />
        <path
          d="M 348 166 C 356 156 358 170 366 160 S 378 166 386 158"
          stroke="#E85338"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M 344 168 H 404" stroke="#121113" strokeOpacity="0.35" strokeWidth="1" />
      </g>

      {/* ===== Tira de fotografías técnicas ===== */}
      <g transform="rotate(1 380 200)">
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={`photo-${i}`}
            fill="#0e0e0d"
            height="26"
            stroke="#d8c7b5"
            strokeWidth="1"
            width="34"
            x={300 + i * 37}
            y={186}
          />
        ))}
        <path d="M 312 192 V 206 M 305 199 H 319" stroke="#FF6B4A" strokeWidth="1" />
        <circle cx="317" cy="199" fill="none" r="5" stroke="#FF6B4A" strokeWidth="1.5" />
        <text fill="#d8c7b5" fontFamily="monospace" fontSize="5.5" x="340" y="201">
          PM1
        </text>
        <path d="M 374 202 H 402" stroke="#b7ccba" strokeOpacity="0.6" strokeWidth="1" />
        <circle cx="388" cy="197" fill="#b7ccba" r="2" />
        <path d="M 416 190 H 428 M 416 190 V 198" stroke="#6f8373" strokeWidth="1" />
      </g>

      {/* ===== Indicación de automatización: datos → documento → validación ===== */}
      <g>
        <rect fill="#1b1c1a" height="16" stroke="#b7ccba" strokeOpacity="0.6" width="52" x="18" y="226" />
        <text fill="#b7ccba" fontFamily="monospace" fontSize="7" letterSpacing="1" textAnchor="middle" x="44" y="237">
          DATOS
        </text>
        <path d="M 76 234 H 94" stroke="#6f8373" strokeWidth="1" />
        <polygon fill="#6f8373" points="94,231 94,237 100,234" />
        <rect fill="#EDE8E0" height="20" width="18" x="104" y="224" />
        <rect fill="#9a948e" height="2" width="12" x="107" y="228" />
        <rect fill="#9a948e" height="2" width="10" x="107" y="232" />
        <rect fill="#9a948e" height="2" width="12" x="107" y="236" />
        <path d="M 128 234 H 146" stroke="#6f8373" strokeWidth="1" />
        <polygon fill="#6f8373" points="146,231 146,237 152,234" />
        <circle cx="164" cy="234" fill="none" r="9" stroke="#E85338" strokeWidth="1.5" />
        <path d="M 160 234 l 3 3 l 6 -6" stroke="#E85338" strokeWidth="1.5" strokeLinecap="round" />
        <text fill="#6f8373" fontFamily="Newsreader" fontSize="8" fontStyle="italic" x="180" y="238">
          automatización
        </text>
      </g>

      {/* ===== Marcas de encuadre y anotaciones ===== */}
      <text fill="#FF6B4A" fontFamily="monospace" fontSize="9" x="6" y="14">+</text>
      <text fill="#FF6B4A" fontFamily="monospace" fontSize="9" x="448" y="14">+</text>
      <text fill="#FF6B4A" fontFamily="monospace" fontSize="9" x="6" y="244">+</text>
      <text fill="#FF6B4A" fontFamily="monospace" fontSize="9" x="448" y="244">+</text>
      <text fill="#6f8373" fontFamily="Newsreader" fontSize="8" fontStyle="italic" x="14" y="46">
        mapa de teselas
      </text>
      <text fill="#6f8373" fontFamily="Newsreader" fontSize="8" fontStyle="italic" x="152" y="34">
        capa cartográfica
      </text>
      <text fill="#6f8373" fontFamily="Newsreader" fontSize="8" fontStyle="italic" x="338" y="108">
        documento
      </text>
      <text fill="#6f8373" fontFamily="Newsreader" fontSize="8" fontStyle="italic" x="300" y="222">
        fotografías
      </text>
    </svg>
  )
}

const areas = [
  {
    label: "Cartografía",
    text: "Capas, capturas automáticas y mapas calibrados para documentación técnica.",
  },
  {
    label: "Documentación",
    text: "Construcción de datos, certificados, capturas y trazabilidad del proceso.",
  },
  {
    label: "Datos y automatización",
    text: "Importaciones, validaciones, operaciones atómicas y conexión con servicios externos.",
  },
  {
    label: "Uso cotidiano",
    text: "Gestión de mediciones, fotografías, sectorizaciones y mejoras de interfaz y accesibilidad.",
  },
]

export default function WorkPlatform() {
  return (
    <section
      id="trabajo-aplicacion"
      aria-labelledby="titulo-trabajo-aplicacion"
      className="w-full scroll-mt-28 bg-paper-dim py-24 text-rich-ink md:py-36"
    >
      <div className="mx-auto w-full max-w-7xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-4xl pb-space-xl">
          <div className="flex items-center gap-space-xs pb-space-xs">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-flame-orange" />
            <span className="font-sans text-label-technical font-semibold uppercase tracking-widest text-rich-ink/70">
              Aplicación interna en producción
            </span>
          </div>
          <h2
            id="titulo-trabajo-aplicacion"
            className="font-serif text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-rich-ink lg:text-headline-xl"
          >
            Evolucionar una aplicación <span className="font-light italic text-rich-ink/80">en uso</span>.
          </h2>
          <p className="max-w-3xl pt-space-sm font-sans text-body-lead text-rich-ink/85">
            Una parte importante de mi trabajo ha sido ampliar una aplicación interna que ya
            estaba en producción cuando me incorporé al equipo. He desarrollado nuevas
            funciones, automatizado procesos y mejorado su cartografía, la gestión de datos y
            la generación documental.
          </p>
        </div>

        {/* Dos columnas equilibradas: áreas y composición al 50 %, con el
            panel de la mesa de luz alineado a la altura completa del bloque
            de áreas (la composición queda centrada verticalmente). */}
        <div className="grid grid-cols-1 items-stretch gap-space-xl lg:grid-cols-12">
          {/* Cuatro áreas de aportación */}
          <div className="flex flex-col justify-center lg:col-span-6">
            {areas.map(({ label, text }, index) => (
              <div
                key={label}
                className={index === 0 ? "" : "border-t border-rich-ink/10 pt-space-md"}
              >
                <p className="pb-space-xs font-sans text-label-technical font-semibold uppercase tracking-wider text-flame-orange-deep">
                  {label}
                </p>
                <p className="font-sans text-body-md leading-relaxed text-rich-ink/75">{text}</p>
                {index < areas.length - 1 && <div className="h-space-md" />}
              </div>
            ))}
          </div>

          {/* Mesa de luz (objetivo del marco). Panel
              con aire interior amplio para que el encuadre respire. */}
          <div
            data-frame-target
            className="flex items-center border border-outline-variant/30 bg-surface-container-lowest p-space-lg lg:col-span-6"
          >
            <AppSketch />
          </div>
        </div>
      </div>
    </section>
  )
}

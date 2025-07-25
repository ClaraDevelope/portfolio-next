// components/PrivacyPolicy.tsx
export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-26">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      <p className="mb-4">
        Este sitio web recoge información básica de las visitas con el objetivo de analizar el tráfico y mejorar la
        experiencia del usuario. Los datos recopilados no se utilizan para identificarte de forma personal.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">¿Qué datos se recogen?</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Dirección IP</li>
        <li>Tipo de navegador o dispositivo (user agent)</li>
        <li>Fuente de la visita (por ejemplo, si accedes desde LinkedIn o InfoJobs)</li>
        <li>Ubicación geográfica aproximada derivada de la IP (como ciudad o país)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">¿Con qué finalidad se usan?</h2>
      <p className="mb-4">
        Esta información se utiliza exclusivamente para comprender de dónde vienen las visitas, detectar posibles
        errores o abusos, y mejorar el contenido del sitio. No se comparte con terceros ni se utiliza con fines
        comerciales.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">¿Se utilizan cookies?</h2>
      <p className="mb-4">
        No se utilizan cookies ni tecnologías de seguimiento en este sitio web.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Responsable del tratamiento</h2>
      <p className="mb-4">
        Clara Manzano Corona es la responsable de este sitio. Puedes contactar a través del formulario de contacto si
        tienes alguna duda relacionada con la privacidad.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación o supresión de datos, aunque ten en cuenta que no se
        almacenan datos personales identificables. Para más información, contacta desde el apartado de contacto del
        sitio.
      </p>
    </div>
  );
}

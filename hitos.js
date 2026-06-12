// ============================================================
// JACA RA — Datos del juego
// ------------------------------------------------------------
// Este archivo lo comparten el mapa (index.html) y la vista
// de realidad aumentada (ra.html).
//
// Para añadir, quitar o ajustar hitos, edita solo esta lista.
//   - lat / lon : coordenadas GPS del hito
//   - radio     : a cuántos metros se puede "descubrir" (ajústalo
//                 si el GPS de tu móvil es poco preciso)
// ============================================================

const HITOS = [
  {
    id: "catedral",
    nombre: "Catedral de San Pedro",
    emoji: "⛪",
    lat: 42.5707728,
    lon: -0.5495069,
    radio: 30,
    epoca: "Siglo XI",
    descripcion:
      "Iniciada hacia 1077 por orden del rey Sancho Ramírez, es una de las " +
      "primeras catedrales románicas de España. Su famoso «ajedrezado jaqués» " +
      "se copió después en templos de todo el Camino de Santiago.",
  },
  {
    id: "ciudadela",
    nombre: "Ciudadela de Jaca",
    emoji: "🏰",
    lat: 42.5724757,
    lon: -0.5522693,
    radio: 35,
    epoca: "Siglo XVI",
    descripcion:
      "Fortaleza pentagonal mandada construir por Felipe II a finales del " +
      "siglo XVI para defender el Pirineo. Es una de las ciudadelas " +
      "abaluartadas mejor conservadas de Europa y su foso aún tiene ciervos.",
  },
  {
    id: "torre",
    nombre: "Torre del Reloj",
    emoji: "🕰️",
    lat: 42.5686221,
    lon: -0.5494693,
    radio: 25,
    epoca: "Siglo XV",
    descripcion:
      "Torre gótica levantada hacia 1445 donde antes estuvo el palacio real. " +
      "Durante siglos sirvió de cárcel y hoy es la sede de la Comunidad de " +
      "Trabajo de los Pirineos.",
  },
  {
    id: "puente",
    nombre: "Puente de San Miguel",
    emoji: "🌉",
    lat: 42.5742687,
    lon: -0.5622587,
    radio: 35,
    epoca: "Edad Media",
    descripcion:
      "Puente medieval sobre el río Aragón por el que los peregrinos del " +
      "Camino de Santiago aragonés entraban en Jaca tras cruzar el Pirineo.",
  },
  {
    id: "santiago",
    nombre: "Iglesia de Santiago",
    emoji: "✝️",
    lat: 42.5677246,
    lon: -0.5500242,
    radio: 25,
    epoca: "Año 1088",
    descripcion:
      "Reconstruida en 1088 sobre un templo anterior, es una de las iglesias " +
      "más antiguas de la ciudad y todavía sella la credencial a los " +
      "peregrinos del Camino.",
  },
];

// ------------------------------------------------------------
// Funciones compartidas
// ------------------------------------------------------------

// Distancia en metros entre dos coordenadas GPS (fórmula de Haversine)
function distanciaMetros(lat1, lon1, lat2, lon2) {
  const R = 6371000; // radio de la Tierra en metros
  const rad = (grados) => (grados * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// El progreso se guarda en el navegador del móvil (localStorage)
const CLAVE_GUARDADO = "jaca-ra-descubiertos";

function cargarDescubiertos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_GUARDADO)) || [];
  } catch (e) {
    return [];
  }
}

function marcarDescubierto(id) {
  const lista = cargarDescubiertos();
  if (!lista.includes(id)) {
    lista.push(id);
    localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(lista));
  }
}

function reiniciarJuego() {
  localStorage.removeItem(CLAVE_GUARDADO);
}

// Busca un hito por su id
function buscarHito(id) {
  return HITOS.find((h) => h.id === id);
}

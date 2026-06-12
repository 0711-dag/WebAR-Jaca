// ============================================================
// JACA RA — Figuras 3D temáticas de los hitos
// ------------------------------------------------------------
// Cada hito tiene su propia figura, montada con piezas
// geométricas sencillas (cajas, cilindros, esferas, conos...),
// como un juguete de construcción. No descarga nada de fuera.
//
//   catedral  → Llave de San Pedro (el santo de las llaves)
//   ciudadela → Fortaleza pentagonal con su bandera
//   torre     → Torre con su reloj marcando las 12 y cuarto
//   puente    → Puente de un ojo sobre el río Aragón
//   santiago  → Vieira, la concha del peregrino del Camino
//   ermita    → Ermita románica con espadaña, campana y ábside
//
// CÓMO INSTALARLO EN EL JUEGO (un solo paso):
//   En ra.html, justo debajo de la línea
//       <script src="hitos.js"></script>
//   añade esta otra:
//       <script src="modelos.js"></script>
//   Nada más. Este archivo localiza el octaedro dorado de la
//   escena y lo sustituye por la figura del hito él solito.
//
// PARA PERSONALIZAR:
//   - Colores: cambia los códigos de la PALETA de aquí abajo.
//   - Tamaños: las medidas están en metros reales; si una
//     figura te parece pequeña en la calle, envuélvela con
//     setAttribute("scale", "1.3 1.3 1.3") o sube sus números.
// ============================================================

// ---------- Paleta de materiales ----------
const ORO           = "color: #d9a62e; metalness: 0.45; roughness: 0.3; emissive: #6b4e10";
const PIEDRA        = "color: #b8ad9c; roughness: 0.95; emissive: #3a352c";
const PIEDRA_OSCURA = "color: #978c7b; roughness: 0.95; emissive: #2e2a23";
const TEJADO        = "color: #555b66; roughness: 0.85; emissive: #1b1d22";
const MADERA        = "color: #6e5b3f; roughness: 0.9; emissive: #20180e";
const ROJO_BANDERA  = "color: #b33a31; roughness: 0.7; emissive: #3a0f0c";
const ESFERA_RELOJ  = "color: #f4ecd8; roughness: 0.6; emissive: #6b6657";
const NEGRO         = "color: #2b2b2b; roughness: 0.6; emissive: #000000";
const AMARILLO      = "color: #e8b733; metalness: 0.25; roughness: 0.45; emissive: #6e5210";
const AGUA          = "color: #4d7d9c; roughness: 0.25; metalness: 0.1; opacity: 0.55; transparent: true";

// Crea una pieza (<a-box>, <a-cylinder>...) con sus atributos.
// La clase "clickable" hace que el rayo táctil del juego la detecte.
function pieza(tipo, atributos = {}) {
  const elemento = document.createElement(tipo);
  for (const [nombre, valor] of Object.entries(atributos)) {
    elemento.setAttribute(nombre, valor);
  }
  elemento.classList.add("clickable");
  return elemento;
}

// ---------- ⛪ Catedral de San Pedro → Llave de San Pedro ----------
// San Pedro es "el de las llaves del cielo": una gran llave dorada
// con una cruz dentro del anillo. Mide unos 8,5 m de alto.
function modeloLlave() {
  const figura = pieza("a-entity");

  // Anillo (la empuñadura redonda de arriba)
  figura.appendChild(pieza("a-torus", {
    radius: 1.5, "radius-tubular": 0.32,
    position: "0 6.6 0", material: ORO,
  }));

  // Cruz dentro del anillo
  figura.appendChild(pieza("a-box", {
    width: 0.22, height: 1.6, depth: 0.22,
    position: "0 6.6 0", material: ORO,
  }));
  figura.appendChild(pieza("a-box", {
    width: 1.0, height: 0.22, depth: 0.22,
    position: "0 6.95 0", material: ORO,
  }));

  // Tija (el cuerpo largo de la llave)
  figura.appendChild(pieza("a-cylinder", {
    radius: 0.32, height: 5.4,
    position: "0 2.7 0", material: ORO,
  }));

  // Dientes (los "paletones" de abajo, hacia un lado)
  figura.appendChild(pieza("a-box", {
    width: 1.5, height: 0.55, depth: 0.34,
    position: "0.75 0.55 0", material: ORO,
  }));
  figura.appendChild(pieza("a-box", {
    width: 1.05, height: 0.55, depth: 0.34,
    position: "0.53 1.45 0", material: ORO,
  }));

  // Puntita inferior
  figura.appendChild(pieza("a-cone", {
    "radius-bottom": 0.32, "radius-top": 0.04, height: 0.5,
    position: "0 -0.22 0", rotation: "180 0 0", material: ORO,
  }));

  return figura;
}

// ---------- 🏰 Ciudadela → Fortaleza pentagonal ----------
// La Ciudadela en miniatura: muralla de 5 lados con un bastión
// en cada punta, torreón central y bandera roja. Unos 8 m.
function modeloFortaleza() {
  const figura = pieza("a-entity");

  // Muralla pentagonal (un cilindro de solo 5 caras)
  figura.appendChild(pieza("a-cylinder", {
    radius: 4, height: 1.9, "segments-radial": 5,
    position: "0 0.95 0", material: PIEDRA,
  }));

  // Suelo del patio interior
  figura.appendChild(pieza("a-cylinder", {
    radius: 3.45, height: 0.25,
    position: "0 1.95 0", material: PIEDRA_OSCURA,
  }));

  // Un bastión (cubo girado en rombo) en cada una de las 5 puntas
  for (let k = 0; k < 5; k++) {
    const angulo = (k * 72 * Math.PI) / 180;
    const x = (4 * Math.sin(angulo)).toFixed(2);
    const z = (4 * Math.cos(angulo)).toFixed(2);
    figura.appendChild(pieza("a-box", {
      width: 1.7, height: 2.5, depth: 1.7,
      position: x + " 1.25 " + z,
      rotation: "0 " + (k * 72 + 45) + " 0",
      material: PIEDRA,
    }));
  }

  // Torreón central con tejado
  figura.appendChild(pieza("a-cylinder", {
    radius: 1.05, height: 3.2,
    position: "0 1.6 0", material: PIEDRA,
  }));
  figura.appendChild(pieza("a-cone", {
    "radius-bottom": 1.35, height: 1.3, "segments-radial": 6,
    position: "0 3.85 0", material: TEJADO,
  }));

  // Mástil y bandera
  figura.appendChild(pieza("a-cylinder", {
    radius: 0.06, height: 2.0,
    position: "0 5.5 0", material: MADERA,
  }));
  figura.appendChild(pieza("a-box", {
    width: 1.05, height: 0.6, depth: 0.06,
    position: "0.58 6.15 0", material: ROJO_BANDERA,
  }));

  return figura;
}

// ---------- 🕰️ Torre del Reloj → Torre con su reloj ----------
// Torre gótica esbelta con esfera blanca, agujas marcando las
// 12 y cuarto, ventana ojival y tejado piramidal. Unos 9 m.
function modeloTorreReloj() {
  const figura = pieza("a-entity");

  // Zócalo y cuerpo de la torre
  figura.appendChild(pieza("a-box", {
    width: 3.3, height: 0.8, depth: 3.3,
    position: "0 0.4 0", material: PIEDRA_OSCURA,
  }));
  figura.appendChild(pieza("a-box", {
    width: 2.7, height: 6.4, depth: 2.7,
    position: "0 3.4 0", material: PIEDRA,
  }));

  // Esfera del reloj (mirando al frente) con marco dorado
  figura.appendChild(pieza("a-cylinder", {
    radius: 1.0, height: 0.16, rotation: "90 0 0",
    position: "0 5.1 1.43", material: ESFERA_RELOJ,
  }));
  figura.appendChild(pieza("a-torus", {
    radius: 1.0, "radius-tubular": 0.1,
    position: "0 5.1 1.47", material: ORO,
  }));

  // Agujas: la larga apunta arriba, la corta a las 3
  figura.appendChild(pieza("a-box", {
    width: 0.1, height: 0.8, depth: 0.07,
    position: "0 5.44 1.58", material: NEGRO,
  }));
  figura.appendChild(pieza("a-box", {
    width: 0.55, height: 0.1, depth: 0.07,
    position: "0.21 5.1 1.58", material: NEGRO,
  }));
  figura.appendChild(pieza("a-sphere", {
    radius: 0.09, position: "0 5.1 1.6", material: NEGRO,
  }));

  // Ventana ojival (rectángulo + medio punto encima)
  figura.appendChild(pieza("a-box", {
    width: 0.55, height: 1.0, depth: 0.12,
    position: "0 2.7 1.39", material: NEGRO,
  }));
  figura.appendChild(pieza("a-cylinder", {
    radius: 0.28, height: 0.12, rotation: "90 0 0",
    position: "0 3.2 1.39", material: NEGRO,
  }));

  // Cornisa, tejado piramidal y bola dorada
  figura.appendChild(pieza("a-box", {
    width: 3.15, height: 0.35, depth: 3.15,
    position: "0 6.7 0", material: PIEDRA_OSCURA,
  }));
  figura.appendChild(pieza("a-cone", {
    "radius-bottom": 2.3, height: 2.1, "segments-radial": 4,
    rotation: "0 45 0", position: "0 7.92 0", material: TEJADO,
  }));
  figura.appendChild(pieza("a-sphere", {
    radius: 0.15, position: "0 9.05 0", material: ORO,
  }));

  return figura;
}

// ---------- 🌉 Puente de San Miguel → Puente del peregrino ----------
// Puente medieval de un solo ojo con "lomo de asno": arco de
// piedra, tablero a dos aguas, pretiles y el río debajo. ~10 m.
function modeloPuente() {
  const figura = pieza("a-entity");
  figura.setAttribute("scale", "0.9 0.9 0.9");

  // El río Aragón (lámina de agua semitransparente)
  figura.appendChild(pieza("a-box", {
    width: 9.8, height: 0.25, depth: 2.6,
    position: "0 0.12 0", material: AGUA,
  }));

  // El ojo del puente: medio anillo de piedra (arc: 180 = medio)
  figura.appendChild(pieza("a-torus", {
    radius: 2.4, "radius-tubular": 0.55, arc: 180,
    "segments-tubular": 24,
    position: "0 0.95 0", material: PIEDRA_OSCURA,
  }));

  // Tablero central y las dos rampas inclinadas (el "lomo")
  figura.appendChild(pieza("a-box", {
    width: 3.6, height: 0.5, depth: 1.7,
    position: "0 3.9 0", material: PIEDRA,
  }));
  figura.appendChild(pieza("a-box", {
    width: 3.4, height: 0.5, depth: 1.7,
    position: "3.4 3.32 0", rotation: "0 0 -20", material: PIEDRA,
  }));
  figura.appendChild(pieza("a-box", {
    width: 3.4, height: 0.5, depth: 1.7,
    position: "-3.4 3.32 0", rotation: "0 0 20", material: PIEDRA,
  }));

  // Estribos (los apoyos macizos de cada orilla)
  figura.appendChild(pieza("a-box", {
    width: 1.5, height: 2.8, depth: 1.8,
    position: "4.95 1.4 0", material: PIEDRA,
  }));
  figura.appendChild(pieza("a-box", {
    width: 1.5, height: 2.8, depth: 1.8,
    position: "-4.95 1.4 0", material: PIEDRA,
  }));

  // Pretiles (los muretes laterales del tramo central)
  figura.appendChild(pieza("a-box", {
    width: 3.5, height: 0.35, depth: 0.18,
    position: "0 4.32 0.78", material: PIEDRA_OSCURA,
  }));
  figura.appendChild(pieza("a-box", {
    width: 3.5, height: 0.35, depth: 0.18,
    position: "0 4.32 -0.78", material: PIEDRA_OSCURA,
  }));

  return figura;
}

// ---------- ✝️ Iglesia de Santiago → Vieira del Camino ----------
// La concha del peregrino: un abanico de 7 costillas que salen
// de la charnela, con sus dos orejuelas. Amarillo Camino. ~7 m.
function modeloVieira() {
  const figura = pieza("a-entity");
  figura.setAttribute("scale", "1.45 1.45 1.45");

  // Charnela (la bisagra de abajo) y orejuelas
  const charnela = pieza("a-sphere", {
    radius: 0.5, position: "0 0.15 0", material: AMARILLO,
  });
  charnela.setAttribute("scale", "1 0.75 0.55");
  figura.appendChild(charnela);

  figura.appendChild(pieza("a-box", {
    width: 0.75, height: 0.5, depth: 0.3,
    position: "0.62 0.2 0", material: AMARILLO,
  }));
  figura.appendChild(pieza("a-box", {
    width: 0.75, height: 0.5, depth: 0.3,
    position: "-0.62 0.2 0", material: AMARILLO,
  }));

  // Las 7 costillas en abanico: [inclinación en grados, largo en metros]
  const costillas = [
    [0, 4.6],
    [18, 4.3], [-18, 4.3],
    [36, 3.7], [-36, 3.7],
    [54, 2.9], [-54, 2.9],
  ];
  for (const [inclinacion, largo] of costillas) {
    const brazo = pieza("a-entity", { rotation: "0 0 " + inclinacion });
    const costilla = pieza("a-sphere", {
      radius: 0.5,
      position: "0 " + (largo / 2) + " 0",
      material: AMARILLO,
    });
    // Estirar la esfera la convierte en una costilla alargada
    costilla.setAttribute("scale", "0.62 " + largo + " 0.34");
    brazo.appendChild(costilla);
    figura.appendChild(brazo);
  }

  return figura;
}

// ---------- 🔔 Ermita de Sarsa → Ermita románica ----------
// La ermita en miniatura: nave de piedra con tejado a dos aguas,
// ábside semicircular detrás, portada con su arquivolta y, en lo
// alto de la fachada, la espadaña con su campana dorada y su cruz.
// El edificio real se trasladó piedra a piedra... y esta figura
// también va montada pieza a pieza. Unos 7,4 m con su escala.
function modeloErmita() {
  const figura = pieza("a-entity");
  figura.setAttribute("scale", "1.2 1.2 1.2");

  // Los muros de los gabletes (triángulos) se ven por las dos caras
  const PIEDRA_DOBLE = PIEDRA + "; side: double";

  // Zócalo (la peana de piedra sobre la que se asienta todo)
  figura.appendChild(pieza("a-box", {
    width: 3.8, height: 0.5, depth: 4.8,
    position: "0 0.25 0", material: PIEDRA_OSCURA,
  }));

  // Nave (el cuerpo principal, con la fachada mirando al frente)
  figura.appendChild(pieza("a-box", {
    width: 3.4, height: 2.6, depth: 4.4,
    position: "0 1.8 0", material: PIEDRA,
  }));

  // Gabletes: los triángulos que cierran el tejado por delante y detrás
  figura.appendChild(pieza("a-triangle", {
    "vertex-a": "-1.7 3.1 0", "vertex-b": "1.7 3.1 0", "vertex-c": "0 4.05 0",
    position: "0 0 2.2", material: PIEDRA_DOBLE,
  }));
  figura.appendChild(pieza("a-triangle", {
    "vertex-a": "-1.7 3.1 0", "vertex-b": "1.7 3.1 0", "vertex-c": "0 4.05 0",
    position: "0 0 -2.2", material: PIEDRA_DOBLE,
  }));

  // Tejado a dos aguas (dos planchas inclinadas) y su cumbrera
  figura.appendChild(pieza("a-box", {
    width: 2.08, height: 0.16, depth: 4.8,
    position: "-0.93 3.58 0", rotation: "0 0 27", material: TEJADO,
  }));
  figura.appendChild(pieza("a-box", {
    width: 2.08, height: 0.16, depth: 4.8,
    position: "0.93 3.58 0", rotation: "0 0 -27", material: TEJADO,
  }));
  figura.appendChild(pieza("a-box", {
    width: 0.24, height: 0.12, depth: 4.9,
    position: "0 4.08 0", material: TEJADO,
  }));

  // Ábside semicircular pegado a la parte de atrás, con su tejadillo
  figura.appendChild(pieza("a-cylinder", {
    radius: 1.1, height: 2.3,
    position: "0 1.65 -2.2", material: PIEDRA,
  }));
  figura.appendChild(pieza("a-cone", {
    "radius-bottom": 1.25, height: 0.65,
    position: "0 3.1 -2.2", material: TEJADO,
  }));

  // Portada: puerta de medio punto con su arquivolta de piedra
  figura.appendChild(pieza("a-box", {
    width: 0.62, height: 1.05, depth: 0.14,
    position: "0 1.03 2.21", material: NEGRO,
  }));
  figura.appendChild(pieza("a-cylinder", {
    radius: 0.31, height: 0.14, rotation: "90 0 0",
    position: "0 1.55 2.21", material: NEGRO,
  }));
  figura.appendChild(pieza("a-torus", {
    radius: 0.42, "radius-tubular": 0.08, arc: 180,
    position: "0 1.55 2.24", material: PIEDRA_OSCURA,
  }));

  // Óculo: la ventanita redonda del gablete
  figura.appendChild(pieza("a-cylinder", {
    radius: 0.17, height: 0.14, rotation: "90 0 0",
    position: "0 3.5 2.21", material: NEGRO,
  }));

  // Espadaña: el muro-campanario con su hueco, su campana y su cruz
  figura.appendChild(pieza("a-box", {
    width: 1.45, height: 1.55, depth: 0.28,
    position: "0 4.8 2.2", material: PIEDRA,
  }));
  figura.appendChild(pieza("a-box", {
    width: 0.52, height: 0.8, depth: 0.34,
    position: "0 4.92 2.2", material: NEGRO,
  }));
  figura.appendChild(pieza("a-cone", {
    "radius-bottom": 0.19, "radius-top": 0.06, height: 0.3,
    position: "0 4.88 2.2", material: ORO,
  }));
  figura.appendChild(pieza("a-box", {
    width: 0.1, height: 0.6, depth: 0.1,
    position: "0 5.85 2.2", material: ORO,
  }));
  figura.appendChild(pieza("a-box", {
    width: 0.38, height: 0.1, depth: 0.1,
    position: "0 5.95 2.2", material: ORO,
  }));

  return figura;
}

// ---------- Figura de reserva: el octaedro dorado de siempre ----------
function modeloGema() {
  const figura = pieza("a-entity");
  figura.appendChild(pieza("a-octahedron", {
    radius: 5, material: ORO,
  }));
  return figura;
}

// ============================================================
// crearModelo(id) → devuelve la figura del hito, ya girando
// y flotando, lista para colgarla de la escena.
// ============================================================
function crearModelo(idHito) {
  const constructores = {
    catedral: modeloLlave,
    ciudadela: modeloFortaleza,
    torre: modeloTorreReloj,
    puente: modeloPuente,
    santiago: modeloVieira,
    ermita: modeloErmita,
  };
  const construir = constructores[idHito] || modeloGema;
  const figura = construir();

  // Las mismas animaciones que tenía el octaedro: girar y flotar
  figura.setAttribute("animation",
    "property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true");
  figura.setAttribute("animation__flotar",
    "property: position; from: 0 -0.6 0; to: 0 0.6 0; dir: alternate; dur: 1700; easing: easeInOutSine; loop: true");

  return figura;
}

// ============================================================
// Instalación automática en ra.html
// ------------------------------------------------------------
// ra.html crea un octaedro dorado cuando carga la escena. Este
// bloque lo espera, lo hace invisible y cuelga en su lugar la
// figura del hito. Los toques sobre la figura se reenvían al
// octaedro oculto, que es quien sabe "descubrir" el hito; así
// no hay que tocar nada de la lógica del juego.
// ============================================================
(function instalarFiguraTematica() {
  if (window.JACA_VISTA_PREVIA) return; // en la vista previa no hace falta

  function idDelHitoActual() {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("hito") || parametros.get("id");
    const lista = typeof HITOS !== "undefined" ? HITOS : [];
    if (lista.some(function (h) { return h.id === id; })) return id;
    // Plan B: deducirlo por la etiqueta con el nombre que flota en la escena
    const etiqueta = document.querySelector("a-text");
    const nombre = etiqueta ? etiqueta.getAttribute("value") : "";
    const hito = lista.find(function (h) { return h.nombre === nombre; });
    return hito ? hito.id : id;
  }

  function intentarSustituir() {
    const octaedro = document.querySelector("a-octahedron");
    if (!octaedro) return false; // la escena aún no está lista (o no es ra.html)
    if (document.querySelector("[data-figura-tematica]")) return true; // ya hecho

    const figura = crearModelo(idDelHitoActual());
    figura.setAttribute("data-figura-tematica", "");
    figura.addEventListener("click", function () {
      octaedro.dispatchEvent(new CustomEvent("click"));
    });
    octaedro.parentNode.appendChild(figura);
    octaedro.setAttribute("visible", "false");
    octaedro.classList.remove("clickable");
    return true;
  }

  const vigilante = setInterval(function () {
    if (intentarSustituir()) clearInterval(vigilante);
  }, 500);
  setTimeout(function () { clearInterval(vigilante); }, 30000);
})();

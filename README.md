# Jaca RA 🏔️

Juego de caza de hitos históricos en Jaca (Huesca), al estilo Pokémon GO:
el mapa del juego es el mapa real de la ciudad. Camina hasta cada uno de los
5 hitos, abre la cámara y "captura" el objeto dorado en realidad aumentada.

Funciona en el navegador del móvil: **no hay que instalar ninguna app**.

## Los archivos

| Archivo      | Qué hace                                                              |
|--------------|-----------------------------------------------------------------------|
| `index.html` | El mapa del juego (Leaflet + OpenStreetMap), tu posición GPS y el progreso |
| `ra.html`    | La vista de cámara con realidad aumentada (A-Frame + AR.js)           |
| `hitos.js`   | Los datos de los 5 hitos: coordenadas, textos y radio de captura      |
| `README.md`  | Este documento                                                        |

## Publicarlo gratis en GitHub Pages (10 minutos)

El juego necesita estar en una web con HTTPS (sin HTTPS el navegador no deja
usar la cámara ni el GPS). GitHub Pages lo da gratis:

1. Crea una cuenta en [github.com](https://github.com) si no la tienes.
2. Arriba a la derecha, pulsa **+** → **New repository**.
3. Nombre: `jaca-ra`. Marca **Public**. Pulsa **Create repository**.
4. En la página del repositorio, pulsa **uploading an existing file**
   (o **Add file → Upload files**).
5. Arrastra los 4 archivos de esta carpeta y pulsa **Commit changes**.
6. Ve a **Settings → Pages**. En *Branch* elige `main` y pulsa **Save**.
7. Espera 1-2 minutos. Tu juego estará en:
   `https://TU_USUARIO.github.io/jaca-ra/`

Cada vez que edites un archivo y lo vuelvas a subir, la web se actualiza sola
en un par de minutos.

## Jugar en Jaca

1. Abre la URL en **Chrome para Android**.
2. Acepta el permiso de **ubicación** (elige "ubicación precisa" si te lo pregunta).
3. Camina hacia un hito. Cuando estés a menos de ~25-35 m aparecerá el botón
   **"Ver en RA"**.
4. Acepta el permiso de **cámara**, mueve el móvil hasta encontrar el octaedro
   dorado y púlsalo (o pulsa el botón **"¡Descubrir hito!"**).
5. El hito se marca en dorado en el mapa. Descubre los 5 para completar el juego.

El progreso se guarda en el navegador del móvil aunque cierres la pestaña.

## Probar desde casa (sin ir andando)

Añade `?test=1` al final de la URL:

```
https://TU_USUARIO.github.io/jaca-ra/index.html?test=1
```

El juego simula que estás junto a la Catedral: el botón de RA se activa y en
la vista de cámara el objeto aparece sin estar allí. Perfecto para programar
y probar cambios desde el sofá.

## Problemas comunes

**No aparece mi punto azul en el mapa.**
Comprueba que el GPS del móvil está activado y que diste permiso de ubicación
a Chrome (Ajustes → Aplicaciones → Chrome → Permisos). Recarga la página.
En interiores el GPS tarda más o directamente no llega.

**La cámara sale en negro.**
Falta el permiso de cámara, o estás abriendo el archivo sin HTTPS
(por ejemplo, abriéndolo directamente desde el explorador de archivos).
Tiene que ser a través de la URL de GitHub Pages.

**El objeto 3D aparece desplazado o "baila".**
Es normal: el GPS de un móvil tiene un error de ±5-15 m, y más entre calles
estrechas. Trucos: espera 20-30 segundos quieto a que el GPS afine, calibra
la brújula moviendo el móvil dibujando un 8 en el aire, y si hace falta sube
el `radio` de ese hito en `hitos.js`.

**El botón "Ver en RA" no llega a aparecer.**
Estás más lejos de lo que crees o el GPS es impreciso. Sube el `radio` del
hito en `hitos.js` (por ejemplo de 30 a 45).

**No funciona en el iPhone de un amigo.**
iOS pide un paso extra de permisos para los sensores de movimiento. Este
prototipo está pensado y probado para Android; el soporte de iPhone puede
añadirse más adelante.

## Editar los hitos

Todo está en `hitos.js`. Para cambiar un texto, mover un punto o añadir un
hito nuevo, copia uno de los bloques existentes y cambia sus datos:

```js
{
  id: "ayuntamiento",            // sin espacios ni acentos, único
  nombre: "Ayuntamiento de Jaca",
  emoji: "🏛️",
  lat: 42.5700,                  // en Google Maps: pulsación larga sobre
  lon: -0.5497,                  // el punto y copia las coordenadas
  radio: 30,
  epoca: "Siglo XVI",
  descripcion: "Texto que se muestra al descubrirlo.",
},
```

## Ideas para la siguiente versión

- Sustituir el octaedro por un modelo 3D propio (formato `.glb`, se carga
  con `<a-entity gltf-model="...">`).
- Sonido y animación de captura.
- Insignias o puntos por hito, y un premio final al completar los 5.
- Una ruta sugerida entre hitos dibujada sobre el mapa.
- Más hitos: Ayuntamiento, Monasterio de las Benedictinas, Fuerte de Rapitán…

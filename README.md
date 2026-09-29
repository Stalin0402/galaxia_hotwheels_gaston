# Galaxia Hot Wheels — Gastón

Versión actualizada de la galaxia interactiva.

## Contenido
- `index.html` — estructura de la página.
- `style.css` — estilos visuales.
- `script.js` — galaxia 3D, interacción, mensajes, partículas y música.
- `cancion.mp3` — música que comienza al tocar la llama de inicio.
- `imagen-centro.png` — imagen original completa usada como referencia para la figura central.
- `carros/` — 30 Hot Wheels reales proporcionados por el usuario, convertidos a PNG transparente para integrarlos en la galaxia.

## Funcionamiento
- Hay exactamente 30 Hot Wheels reales orbitando la galaxia.
- Cada Hot Wheels es interactivo y muestra uno de los 30 mensajes.
- La llama de inicio inicia la experiencia y reproduce `cancion.mp3` mediante una interacción del usuario.
- El centro conserva la generación del carro hecho de estrellas.
- La segunda forma NO es una silueta: reconstruye la imagen completa de `imagen-centro.png` mediante miles de estrellas coloreadas con los píxeles de la fotografía, manteniendo su composición, colores y proporciones.
- La figura central cambia automáticamente y también puede cambiarse con el botón `✨`.

## Para GitHub Pages
Sube toda esta carpeta respetando esta estructura:

```text
index.html
style.css
script.js
cancion.mp3
imagen-centro.png
carros/
  hotwheels_01.png
  ...
  hotwheels_30.png
```

No cambies los nombres de los archivos de la carpeta `carros`, porque `script.js` los carga automáticamente.

/* =====================================================================
   🏎️🌌 GALAXIA HOT WHEELS — "Feliz día de los Hot Wheels, Gastón"
   Escena 3D con Three.js: una galaxia cian con carritos orbitando,
   palabras cortas girando y, en el centro, una figura hecha de estrellas
   que muta entre un carro y la imagen completa reconstruida con estrellas.
   Los 30 carritos usan las imágenes reales proporcionadas y la figura central reconstruye la imagen completa con estrellas.
   ===================================================================== */

(function () {
  "use strict";

  /* =====================================================================
     1) CONFIGURACIÓN — CAMBIAR AQUÍ LO IMPORTANTE
     ===================================================================== */

  // Palabras cortas que giran alrededor de la galaxia (CAMBIAR AQUÍ)
  const PALABRAS = [
    "Full velocidad", "Vroom vroom", "Pista libre", "Modo turbo",
    "Nitro", "A fondo", "Sin frenos", "Motor listo",
    "Coleccionista", "Acelera", "Derrapando", "Edición limitada",
    "Gastón al volante", "Meta 🏁", "Turbo on", "Cero tráfico"
  ];

  // Mensajes que salen al tocar un carrito (CAMBIAR AQUÍ)
  const MENSAJES = [
    "Tu calma lo cambia todo.",
    "Tienes chispa de las buenas.",
    "Tu risa me alegra el día.",
    "Eres de los que no se olvidan.",
    "Me gusta cómo ves las cosas.",
    "Tu forma de ser es tu mejor carta.",
    "No presumes, pero se nota.",
    "Tienes algo que engancha.",
    "Esa seguridad tuya me encanta.",
    "Contigo todo se siente fácil.",
    "Tienes cabeza fría y buen corazón.",
    "Me gusta tu manera de estar.",
    "Eres de los que dejan marca.",
    "Tu risa es mi parte favorita.",
    "Tienes un brillo que no se paga.",
    "Me gusta cómo te lanzas sin miedo.",
    "Tu calma es contagiosa.",
    "Eres de los que suman, no restan.",
    "Tienes un encanto que no presume.",
    "Me gusta tu forma de mirar.",
    "Eres pura buena vibra.",
    "Tu forma de ser no tiene igual.",
    "Tienes algo que no se explica.",
    "Me gusta cómo cuidas lo que quieres.",
    "Eres de los que se quedan en la memoria.",
    "Tu manera de reír me gana.",
    "Tienes una paz que se siente bien.",
    "Eres auténtico, y eso vale mucho.",
    "Me gusta la persona que eres.",
    "Gastón, tienes algo muy tuyo."
  ];

  // OPCIONAL: si quieres agregar fotos reales de tus carritos, ponlas en esta
  // misma carpeta y escribe aquí sus nombres. Ejemplo: ["carro1.png", "carro2.jpg"]
  const FOTOS_CARROS = Array.from({ length: 30 }, (_, i) => `carros/hotwheels_${String(i + 1).padStart(2, "0")}.png`);

  const NUM_CARROS = 30;             // exactamente 30 Hot Wheels reales proporcionados
  const NUM_PARTICULAS_FIGURA = 14000; // estrellas de la figura central
  const NUM_GALAXIA = 9000;          // partículas de los brazos de la galaxia
  const NUM_ESTRELLAS = 2400;        // estrellas del fondo
  const INTERVALO_MUTACION_MS = 9000; // cada cuánto cambia la figura sola

  /* Datos de la silueta (generada a partir de la imagen que enviaste).
     No hace falta tocarlos. */
  // La imagen central se carga directamente desde imagen-centro.png.

  /* =====================================================================
     2) ESCENA BÁSICA
     ===================================================================== */

  const canvas = document.getElementById("escena3d");
  const PR = Math.min(window.devicePixelRatio || 1, 1.75);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(PR);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000306, 1);

  const escena = new THREE.Scene();
  const FOV = 58;
  const camara = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 600);

  // Todo lo que forma el "disco" de la galaxia va en este grupo, ligeramente inclinado
  const plano = new THREE.Group();
  plano.rotation.x = 0.16;
  plano.rotation.z = 0.05;
  escena.add(plano);

  const azar = (a, b) => a + Math.random() * (b - a);
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
  const limitar = (v, a, b) => Math.max(a, Math.min(b, v));

  /* =====================================================================
     3) TEXTURAS Y MATERIAL DE PARTÍCULAS (con parpadeo de estrellas)
     ===================================================================== */

  function texturaPunto() {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, "rgba(255,255,255,1)");
    gr.addColorStop(0.2, "rgba(255,255,255,0.85)");
    gr.addColorStop(0.5, "rgba(255,255,255,0.22)");
    gr.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = gr;
    g.fillRect(0, 0, 64, 64);
    // pequeño destello en cruz, como una estrella
    g.globalCompositeOperation = "lighter";
    const h = g.createLinearGradient(0, 32, 64, 32);
    h.addColorStop(0, "rgba(255,255,255,0)");
    h.addColorStop(0.5, "rgba(255,255,255,0.65)");
    h.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = h; g.fillRect(0, 31, 64, 2);
    const v = g.createLinearGradient(32, 0, 32, 64);
    v.addColorStop(0, "rgba(255,255,255,0)");
    v.addColorStop(0.5, "rgba(255,255,255,0.65)");
    v.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = v; g.fillRect(31, 0, 2, 64);
    return new THREE.CanvasTexture(c);
  }

  function texturaHalo() {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, "rgba(255,255,255,1)");
    gr.addColorStop(0.3, "rgba(255,255,255,0.4)");
    gr.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = gr;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }

  const TEX_PUNTO = texturaPunto();
  const TEX_HALO = texturaHalo();

  const materialesPuntos = [];

  const FRAGMENTO = `
    uniform sampler2D uMapa;
    uniform float uOpac;
    varying vec3 vColor;
    varying float vBrillo;
    void main() {
      float a = texture2D(uMapa, gl_PointCoord).a;
      gl_FragColor = vec4(vColor * (0.7 + 0.6 * vBrillo), a * uOpac);
    }
  `;

  const VERTICE_BASICO = `
    attribute vec3 aColor;
    attribute float aTam;
    attribute float aFase;
    uniform float uTiempo;
    uniform float uTam;
    uniform float uEscala;
    varying vec3 vColor;
    varying float vBrillo;
    void main() {
      vColor = aColor;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      float t = 0.6 + 0.4 * sin(uTiempo * 1.8 + aFase * 6.2831);
      vBrillo = t;
      gl_PointSize = uTam * aTam * (0.75 + 0.5 * t) * (uEscala / -mv.z);
      gl_Position = projectionMatrix * mv;
    }
  `;

  // La figura central tiene dos posiciones y dos colores por partícula, y se mezclan
  const VERTICE_FIGURA = `
    attribute vec3 aPosB;
    attribute vec3 aColor;
    attribute vec3 aColorB;
    attribute float aTam;
    attribute float aFase;
    uniform float uTiempo;
    uniform float uTam;
    uniform float uEscala;
    uniform float uMezcla;
    varying vec3 vColor;
    varying float vBrillo;
    void main() {
      float e = uMezcla * uMezcla * (3.0 - 2.0 * uMezcla);
      vec3 p = mix(position, aPosB, e);
      float remolino = sin(e * 3.14159265);
      p += vec3(
        sin(aFase * 40.0 + uTiempo * 2.0),
        cos(aFase * 31.0 + uTiempo * 1.7),
        sin(aFase * 23.0 + uTiempo * 2.3)
      ) * remolino * 2.2;
      p.x += sin(uTiempo * 1.1 + aFase * 12.0) * 0.07;
      p.y += cos(uTiempo * 1.3 + aFase * 9.0) * 0.07;
      vColor = mix(aColor, aColorB, e);
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      float t = 0.6 + 0.4 * sin(uTiempo * 2.0 + aFase * 6.2831);
      vBrillo = t;
      gl_PointSize = uTam * aTam * (0.75 + 0.5 * t) * (uEscala / -mv.z);
      gl_Position = projectionMatrix * mv;
    }
  `;

  function crearMaterial(vertexShader, tamBase, opacidad) {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTiempo: { value: 0 },
        uMapa: { value: TEX_PUNTO },
        uTam: { value: tamBase * PR },
        uEscala: { value: window.innerHeight * 0.5 },
        uOpac: { value: opacidad },
        uMezcla: { value: 0 }
      },
      vertexShader,
      fragmentShader: FRAGMENTO,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    materialesPuntos.push(mat);
    return mat;
  }

  /* =====================================================================
     4) ESTRELLAS DE FONDO
     ===================================================================== */

  (function crearEstrellas() {
    const pos = new Float32Array(NUM_ESTRELLAS * 3);
    const col = new Float32Array(NUM_ESTRELLAS * 3);
    const tam = new Float32Array(NUM_ESTRELLAS);
    const fase = new Float32Array(NUM_ESTRELLAS);
    const c = new THREE.Color();
    for (let i = 0; i < NUM_ESTRELLAS; i++) {
      const r = azar(130, 280);
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph) * 0.7;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      if (Math.random() > 0.85) c.setHSL(0.09, 0.9, 0.7);   // alguna cálida
      else c.setHSL(0.53 + Math.random() * 0.08, 0.5, 0.75);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      tam[i] = azar(0.5, 1.3);
      fase[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("aTam", new THREE.BufferAttribute(tam, 1));
    geo.setAttribute("aFase", new THREE.BufferAttribute(fase, 1));
    const puntos = new THREE.Points(geo, crearMaterial(VERTICE_BASICO, 1.6, 0.9));
    puntos.frustumCulled = false;
    escena.add(puntos);
  })();

  /* =====================================================================
     5) GALAXIA: brazos en espiral, núcleo brillante y órbitas
     ===================================================================== */

  const galaxia = (function crearGalaxia() {
    const N = NUM_GALAXIA;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const tam = new Float32Array(N);
    const fase = new Float32Array(N);
    const c = new THREE.Color();
    const brazos = 3;
    for (let i = 0; i < N; i++) {
      const r = Math.pow(Math.random(), 0.6) * 46 + 2;
      const brazo = i % brazos;
      const ang = r * 0.15 + (brazo / brazos) * Math.PI * 2;
      const dispersion = 0.3 + r * 0.05;
      pos[i * 3] = Math.cos(ang) * r + gauss() * dispersion;
      pos[i * 3 + 1] = gauss() * (0.25 + r * 0.02);
      pos[i * 3 + 2] = Math.sin(ang) * r + gauss() * dispersion;
      const t = r / 48;
      if (Math.random() < 0.06) c.setHSL(0.07, 0.95, 0.6);           // chispas naranjas
      else if (t < 0.2) c.setHSL(0.5, 0.6, 0.78 - t);                 // núcleo casi blanco
      else if (t < 0.6) c.setHSL(0.51, 0.9, 0.55 - t * 0.15);         // cian
      else c.setHSL(0.58 + (t - 0.6) * 0.25, 0.8, 0.42);              // azul-violeta
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      tam[i] = azar(0.5, 1.5);
      fase[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("aTam", new THREE.BufferAttribute(tam, 1));
    geo.setAttribute("aFase", new THREE.BufferAttribute(fase, 1));
    const puntos = new THREE.Points(geo, crearMaterial(VERTICE_BASICO, 0.34, 0.85));
    puntos.frustumCulled = false;
    plano.add(puntos);
    return puntos;
  })();

  // núcleo luminoso (halo cian + centro blanco)
  (function crearNucleo() {
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: TEX_HALO, color: 0x22d8ff, transparent: true, opacity: 0.55,
      depthWrite: false, blending: THREE.AdditiveBlending
    }));
    halo.scale.set(36, 36, 1);
    plano.add(halo);
    const centro = new THREE.Sprite(new THREE.SpriteMaterial({
      map: TEX_HALO, color: 0xe8ffff, transparent: true, opacity: 0.9,
      depthWrite: false, blending: THREE.AdditiveBlending
    }));
    centro.scale.set(10, 10, 1);
    plano.add(centro);
  })();

  // anillos de órbita finos, como las elipses del video
  [15, 23, 32, 42].forEach((r, i) => {
    const anillo = new THREE.Mesh(
      new THREE.RingGeometry(r, r + 0.07, 160),
      new THREE.MeshBasicMaterial({
        color: 0xbff8ff, transparent: true, opacity: 0.2 - i * 0.03,
        side: THREE.DoubleSide, depthWrite: false
      })
    );
    anillo.rotation.x = Math.PI / 2;
    plano.add(anillo);
  });

  /* =====================================================================
     6) FIGURA CENTRAL: carro de estrellas <-> FOTO COMPLETA DE ESTRELLAS
     ---------------------------------------------------------------------
     La segunda forma NO es una silueta. Se reconstruye la imagen completa
     enviada por el usuario como un mapa de partículas: rostro, cabello,
     flores, camiseta, brazos, mesa y fondo conservan sus colores y
     proporciones. Al terminar la transición, las posiciones de las estrellas
     coinciden con la imagen, por lo que no se dibuja una silueta aparte.
     ===================================================================== */

  function capaDesdeCanvas(w, h, dibujar) {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const g = c.getContext("2d");
    dibujar(g);
    const datos = g.getImageData(0, 0, w, h).data;
    const idx = [];
    for (let i = 3; i < datos.length; i += 4) if (datos[i] > 110) idx.push((i - 3) >> 2);
    return { w, h, idx };
  }

  // --- FORMA A: carro deportivo visto de lado, hecho de estrellas ---
  function capasCarroEstrellas() {
    const W = 640, H = 300;
    const contorno = new Path2D();
    contorno.moveTo(40, 226);
    contorno.bezierCurveTo(36, 205, 52, 190, 90, 184);
    contorno.lineTo(190, 172);
    contorno.bezierCurveTo(215, 140, 250, 118, 300, 112);
    contorno.lineTo(372, 112);
    contorno.bezierCurveTo(410, 114, 440, 140, 468, 168);
    contorno.lineTo(540, 182);
    contorno.bezierCurveTo(574, 190, 580, 210, 574, 226);
    contorno.closePath();
    const ruedas = [[170, 232], [440, 232]];

    const borde = capaDesdeCanvas(W, H, (g) => {
      g.lineWidth = 7; g.lineJoin = "round"; g.strokeStyle = "#fff";
      g.stroke(contorno);
      ruedas.forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 46, 0, Math.PI * 2); g.stroke(); });
      g.beginPath(); g.moveTo(52, 176); g.lineTo(118, 168); g.stroke();
      g.beginPath(); g.moveTo(66, 178); g.lineTo(66, 190); g.stroke();
    });
    const detalle = capaDesdeCanvas(W, H, (g) => {
      g.lineWidth = 6; g.lineJoin = "round"; g.lineCap = "round"; g.strokeStyle = "#fff";
      g.beginPath();
      g.moveTo(222, 166); g.bezierCurveTo(240, 140, 268, 126, 305, 124);
      g.lineTo(368, 124); g.bezierCurveTo(396, 126, 418, 144, 440, 168); g.closePath(); g.stroke();
      g.beginPath(); g.moveTo(336, 124); g.lineTo(336, 168); g.stroke();
      g.beginPath(); g.moveTo(96, 208); g.bezierCurveTo(190, 192, 320, 204, 470, 190); g.stroke();
      g.beginPath(); g.moveTo(120, 218); g.bezierCurveTo(220, 208, 330, 216, 500, 206); g.stroke();
      ruedas.forEach(([x, y]) => {
        for (let k = 0; k < 6; k++) {
          const a = (k / 6) * Math.PI * 2;
          g.beginPath();
          g.moveTo(x + Math.cos(a) * 8, y + Math.sin(a) * 8);
          g.lineTo(x + Math.cos(a) * 30, y + Math.sin(a) * 30); g.stroke();
        }
        g.beginPath(); g.arc(x, y, 28, 0, Math.PI * 2); g.stroke();
      });
      g.beginPath(); g.arc(552, 200, 6, 0, Math.PI * 2); g.stroke();
    });
    const relleno = capaDesdeCanvas(W, H, (g) => { g.fillStyle = "#fff"; g.fill(contorno); });
    return { capas: [borde, detalle, relleno], pesos: [0.5, 0.34, 0.16] };
  }

  function muestrear(def, n, tamObjetivo) {
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    def.capas.forEach((capa) => capa.idx.forEach((i) => {
      const x = i % capa.w, y = (i / capa.w) | 0;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }));
    const escala = tamObjetivo / Math.max(maxX - minX, maxY - minY);
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    const pos = new Float32Array(n * 3), pixel = new Float32Array(n * 2);
    const capaDe = new Uint8Array(n), acumulado = [];
    let suma = 0;
    def.pesos.forEach((p) => { suma += p; acumulado.push(suma); });
    for (let i = 0; i < n; i++) {
      const r = Math.random() * suma;
      let k = 0; while (k < acumulado.length - 1 && r > acumulado[k]) k++;
      const capa = def.capas[k];
      const idx = capa.idx[(Math.random() * capa.idx.length) | 0];
      const px = (idx % capa.w) + Math.random() - 0.5;
      const py = ((idx / capa.w) | 0) + Math.random() - 0.5;
      pos[i * 3] = (px - cx) * escala;
      pos[i * 3 + 1] = -(py - cy) * escala;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      capaDe[i] = k;
      pixel[i * 2] = px; pixel[i * 2 + 1] = py;
    }
    return { pos, capaDe, pixel, w: 1, h: 1 };
  }

  // Posiciones temporales para que la escena aparezca de inmediato mientras
  // se carga la fotografía. Serán sustituidas por los píxeles reales.
  const N_FIG = NUM_PARTICULAS_FIGURA;
  const figA = muestrear(capasCarroEstrellas(), N_FIG, 27);
  const figB = {
    pos: new Float32Array(N_FIG * 3),
    pixel: new Float32Array(N_FIG * 2),
    capaDe: new Uint8Array(N_FIG),
    w: 1, h: 1
  };
  for (let i = 0; i < N_FIG; i++) {
    figB.pos[i * 3] = figA.pos[i * 3];
    figB.pos[i * 3 + 1] = figA.pos[i * 3 + 1];
    figB.pos[i * 3 + 2] = 0;
  }

  const colA = new Float32Array(N_FIG * 3);
  const colB = new Float32Array(N_FIG * 3);
  const tmp = new THREE.Color();
  for (let i = 0; i < N_FIG; i++) {
    const capa = figA.capaDe[i];
    if (capa === 0) tmp.setHSL(0.5, 0.85, azar(0.62, 0.9));
    else if (capa === 1) tmp.setHSL(azar(0.08, 0.14), 1, azar(0.55, 0.7));
    else tmp.setHSL(azar(0.0, 0.03), 0.95, azar(0.5, 0.62));
    colA[i * 3] = tmp.r; colA[i * 3 + 1] = tmp.g; colA[i * 3 + 2] = tmp.b;
    colB[i * 3] = 1; colB[i * 3 + 1] = 1; colB[i * 3 + 2] = 1;
  }

  const tamFig = new Float32Array(N_FIG), faseFig = new Float32Array(N_FIG);
  for (let i = 0; i < N_FIG; i++) {
    tamFig[i] = azar(0.55, 1.45);
    faseFig[i] = Math.random();
  }

  const geoFig = new THREE.BufferGeometry();
  geoFig.setAttribute("position", new THREE.BufferAttribute(figA.pos, 3));
  geoFig.setAttribute("aPosB", new THREE.BufferAttribute(figB.pos, 3));
  geoFig.setAttribute("aColor", new THREE.BufferAttribute(colA, 3));
  geoFig.setAttribute("aColorB", new THREE.BufferAttribute(colB, 3));
  geoFig.setAttribute("aTam", new THREE.BufferAttribute(tamFig, 1));
  geoFig.setAttribute("aFase", new THREE.BufferAttribute(faseFig, 1));

  // Carga la imagen completa y la convierte en una nube de estrellas.
  function cargarFotoComoEstrellas() {
    const img = new Image();
    img.onload = () => {
      const maxW = 220;
      const scale = maxW / img.width;
      const cw = maxW;
      const ch = Math.max(1, Math.round(img.height * scale));
      const c = document.createElement("canvas");
      c.width = cw; c.height = ch;
      const g = c.getContext("2d", { willReadFrequently: true });
      g.drawImage(img, 0, 0, cw, ch);
      const datos = g.getImageData(0, 0, cw, ch).data;

      // Muestreo estratificado: conserva detalles del rostro, cabello, flores,
      // brazos, camiseta, mesa y fondo, en vez de reducirlo a una silueta.
      const total = cw * ch;
      const paso = Math.sqrt(total / N_FIG);
      const candidatos = [];
      for (let y = 0; y < ch; y += paso) {
        for (let x = 0; x < cw; x += paso) {
          const xx = Math.min(cw - 1, Math.floor(x + Math.random() * paso));
          const yy = Math.min(ch - 1, Math.floor(y + Math.random() * paso));
          candidatos.push([xx, yy]);
        }
      }
      while (candidatos.length < N_FIG) candidatos.push([Math.random() * cw, Math.random() * ch]);

      const pos = geoFig.getAttribute("aPosB").array;
      const colors = geoFig.getAttribute("aColorB").array;
      const aspect = ch / cw;
      const ancho = 25;
      const alto = ancho * aspect;
      const ox = -ancho / 2, oy = alto / 2;

      for (let i = 0; i < N_FIG; i++) {
        const q = candidatos[i % candidatos.length];
        const x = Math.max(0, Math.min(cw - 1, Math.floor(q[0])));
        const y = Math.max(0, Math.min(ch - 1, Math.floor(q[1])));
        const p = (y * cw + x) * 4;
        const r = datos[p] / 255, gg = datos[p + 1] / 255, b = datos[p + 2] / 255;

        pos[i * 3] = ox + (x / Math.max(1, cw - 1)) * ancho;
        pos[i * 3 + 1] = oy - (y / Math.max(1, ch - 1)) * alto;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
        colors[i * 3] = r;
        colors[i * 3 + 1] = gg;
        colors[i * 3 + 2] = b;
      }
      geoFig.getAttribute("aPosB").needsUpdate = true;
      geoFig.getAttribute("aColorB").needsUpdate = true;
      // La imagen es la forma B desde el primer momento; no se altera ni se recorta.
    };
    img.src = "imagen-centro.png";
  }
  cargarFotoComoEstrellas();

  const matFigura = crearMaterial(VERTICE_FIGURA, 0.28, 1.0);
  const figura = new THREE.Points(geoFig, matFigura);
  figura.frustumCulled = false;
  const grupoFigura = new THREE.Group();
  grupoFigura.position.set(0, 17, 0);
  grupoFigura.add(figura);
  escena.add(grupoFigura);

  const haloFigura = new THREE.Sprite(new THREE.SpriteMaterial({
    map: TEX_HALO, color: 0x1ab8d8, transparent: true, opacity: 0.22,
    depthWrite: false, blending: THREE.AdditiveBlending
  }));
  haloFigura.scale.set(34, 34, 1);
  haloFigura.position.z = -1;
  grupoFigura.add(haloFigura);

  let mezcla = 0;
  let destinoMezcla = 0;
  function alternarFigura() { destinoMezcla = destinoMezcla === 0 ? 1 : 0; }

  /* =====================================================================
     7) CARRITOS HOT WHEELS — RENDER REALISTA DE JUGUETE DE COLECCIÓN
     Cada sprite se renderiza en alta resolución con pintura metálica,
     reflejos, cristales, neumáticos, rines, sombras y detalles de carrera.
     ===================================================================== */

  const COLORES_CARRO = [
    { hex: "#e10600", acento: "#ffcf3a", nombre: "rojo" },
    { hex: "#ffb900", acento: "#ff3a18", nombre: "amarillo" },
    { hex: "#ff5a00", acento: "#ffe45b", nombre: "naranja" },
    { hex: "#1478ff", acento: "#23e6ff", nombre: "azul" },
    { hex: "#14b866", acento: "#d8ff62", nombre: "verde" },
    { hex: "#f2f4f7", acento: "#ff3b30", nombre: "blanco" },
    { hex: "#8d35d8", acento: "#ff64cf", nombre: "violeta" },
    { hex: "#00b8c8", acento: "#ffffff", nombre: "cian" },
    { hex: "#ff268a", acento: "#ffe14d", nombre: "rosa" },
    { hex: "#20252d", acento: "#ff6a00", nombre: "grafito" }
  ];

  function rgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return { r: n >> 16, g: (n >> 8) & 255, b: n & 255 };
  }

  function shade(hex, amount) {
    const c = rgb(hex);
    const f = amount >= 0 ? 255 : 0;
    const t = Math.abs(amount);
    return `rgb(${Math.round(c.r + (f-c.r)*t)},${Math.round(c.g + (f-c.g)*t)},${Math.round(c.b + (f-c.b)*t)})`;
  }

  const carros = [];
  const spritesCarros = [];
  const texturasCarro = [];

  // Los 30 carros son las imágenes reales entregadas por el usuario.
  function agregarCarro(textura, url, relacion, ancho, indice) {
    const mat = new THREE.SpriteMaterial({
      map: textura, transparent: true, depthWrite: false,
      alphaTest: 0.04
    });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(ancho, ancho / relacion, 1);
    const radio = azar(16, 49);
    const datos = {
      sprite, url, radio,
      ang: Math.random() * Math.PI * 2,
      vel: (0.55 + Math.random() * 0.5) / Math.pow(radio, 0.85),
      altura: azar(-9, 9),
      fase: Math.random() * Math.PI * 2,
      indice: indice ?? 0
    };
    sprite.userData = datos;
    plano.add(sprite);
    carros.push(datos);
    spritesCarros.push(sprite);
  }

  const cargadorCarros = new THREE.TextureLoader();
  FOTOS_CARROS.forEach((ruta, i) => {
    cargadorCarros.load(ruta, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      tex.minFilter = THREE.LinearFilter;
      const rel = tex.image.width / tex.image.height;
      texturasCarro.push(tex);
      agregarCarro(tex, ruta, rel, azar(6.2, 10.2), i);
    }, undefined, () => {
      console.warn("No se pudo cargar el Hot Wheels:", ruta);
    });
  });

  /* =====================================================================
     8) PALABRAS CORTAS ORBITANDO
     ===================================================================== */

  const palabras = [];

  function texturaTexto(texto, colorTexto, colorBrillo) {
    const fuente = "500 34px Fredoka, sans-serif";
    const medida = document.createElement("canvas").getContext("2d");
    medida.font = fuente;
    const ancho = Math.ceil(medida.measureText(texto).width) + 44;
    const alto = 64;
    const c = document.createElement("canvas");
    c.width = ancho; c.height = alto;
    const g = c.getContext("2d");
    g.font = fuente;
    g.textAlign = "center"; g.textBaseline = "middle";
    g.shadowColor = colorBrillo; g.shadowBlur = 16;
    g.fillStyle = colorTexto;
    g.fillText(texto, ancho / 2, alto / 2);
    g.shadowBlur = 6;
    g.fillText(texto, ancho / 2, alto / 2);
    const t = new THREE.CanvasTexture(c);
    t.minFilter = THREE.LinearFilter;
    return { textura: t, relacion: ancho / alto };
  }

  function crearPalabras() {
    PALABRAS.forEach((texto, i) => {
      const calida = i % 5 === 3;
      const { textura, relacion } = texturaTexto(
        texto,
        calida ? "#ffe9a8" : "#d9fcff",
        calida ? "rgba(255,150,30,0.9)" : "rgba(34,229,255,0.95)"
      );
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: textura, transparent: true, depthWrite: false,
        opacity: 0.8, blending: THREE.AdditiveBlending
      }));
      const alto = 1.7;
      sprite.scale.set(alto * relacion, alto, 1);
      const radio = 17 + (i % 4) * 8 + azar(0, 4);
      palabras.push({
        sprite, radio,
        ang: (i / PALABRAS.length) * Math.PI * 2,
        vel: (0.45 + Math.random() * 0.3) / Math.pow(radio, 0.85),
        altura: azar(-10, 10),
        fase: Math.random() * Math.PI * 2
      });
      plano.add(sprite);
    });
  }

  // esperamos a la tipografía para que las palabras se dibujen con Fredoka
  const esperaFuente = document.fonts && document.fonts.load
    ? Promise.race([document.fonts.load("500 34px Fredoka"), new Promise((r) => setTimeout(r, 1800))])
    : Promise.resolve();
  esperaFuente.then(crearPalabras, crearPalabras);

  /* =====================================================================
     9) CÁMARA E INTERACCIÓN
     ===================================================================== */

  let anguloCamara = 0.4;
  let alturaCamara = 15;
  let distancia = 54;
  let velocidadGiro = 0.0012;
  const GIRO_BASE = 0.0012;
  let arrastrando = false;
  let movido = 0;
  let inicioToque = 0;
  let distPinza = 0;
  const punteros = new Map();

  function distanciaPunteros() {
    const v = Array.from(punteros.values());
    return Math.hypot(v[0].x - v[1].x, v[0].y - v[1].y);
  }

  canvas.addEventListener("pointerdown", (e) => {
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
    punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (punteros.size === 1) { movido = 0; inicioToque = performance.now(); arrastrando = true; }
    else if (punteros.size === 2) { distPinza = distanciaPunteros(); }
  });

  canvas.addEventListener("pointermove", (e) => {
    const p = punteros.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    if (punteros.size === 1) {
      movido += Math.abs(dx) + Math.abs(dy);
      anguloCamara -= dx * 0.005;
      alturaCamara = limitar(alturaCamara + dy * 0.08, -4, 46);
      velocidadGiro = -dx * 0.0003;
    } else if (punteros.size === 2) {
      const d = distanciaPunteros();
      distancia = limitar(distancia - (d - distPinza) * 0.12, 22, 110);
      distPinza = d;
      movido += 12;
    }
  });

  function soltar(e) {
    const estaba = punteros.has(e.pointerId);
    punteros.delete(e.pointerId);
    if (estaba && punteros.size === 0) {
      arrastrando = false;
      if (movido < 10 && performance.now() - inicioToque < 450) tocar(e.clientX, e.clientY);
    }
  }
  canvas.addEventListener("pointerup", soltar);
  canvas.addEventListener("pointercancel", soltar);

  canvas.addEventListener("wheel", (e) => {
    distancia = limitar(distancia + e.deltaY * 0.05, 22, 110);
    e.preventDefault();
  }, { passive: false });

  /* --- Tocar un carrito --- */
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();

  function tocar(x, y) {
    if (!iniciado) return;
    ndc.x = (x / window.innerWidth) * 2 - 1;
    ndc.y = -(y / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(ndc, camara);
    const choques = raycaster.intersectObjects(spritesCarros, false);
    if (choques.length > 0) abrirTarjeta(choques[0].object.userData);
  }

  const capaTarjeta = document.getElementById("capa-tarjeta");
  const tarjetaImg = document.getElementById("tarjeta-img");
  const tarjetaTexto = document.getElementById("tarjeta-texto");
  let ultimoMensaje = -1;

  function abrirTarjeta(datos) {
    let k;
    do { k = (Math.random() * MENSAJES.length) | 0; } while (k === ultimoMensaje && MENSAJES.length > 1);
    ultimoMensaje = k;
    tarjetaImg.src = datos.url;
    tarjetaTexto.textContent = MENSAJES[k];
    capaTarjeta.classList.remove("oculto");
  }

  function cerrarTarjeta() { capaTarjeta.classList.add("oculto"); }
  document.getElementById("cerrar-tarjeta").addEventListener("click", cerrarTarjeta);
  capaTarjeta.addEventListener("click", (e) => { if (e.target === capaTarjeta) cerrarTarjeta(); });

  /* =====================================================================
     10) INICIO Y MÚSICA
     ===================================================================== */

  const pantallaInicio = document.getElementById("inicio");
  const reloj = new THREE.Clock();
  let iniciado = false;
  let tInicio = 0;

  const audio = document.getElementById("audio-fondo");
  const btnAudio = document.getElementById("btn-audio");
  const icPlay = document.getElementById("ic-play");
  const icPausa = document.getElementById("ic-pausa");
  let sonando = false;
  audio.volume = 0.78;

  function marcarSonando(valor) {
    sonando = valor;
    icPlay.classList.toggle("oculto", valor);
    icPausa.classList.toggle("oculto", !valor);
  }

  function intentarMusica() {
    audio.play().then(() => marcarSonando(true)).catch(() => { /* sin archivo de música: no pasa nada */ });
  }

  function iniciar() {
    if (iniciado) return;
    iniciado = true;
    tInicio = reloj.getElapsedTime();
    pantallaInicio.classList.add("saliendo");
    setTimeout(() => pantallaInicio.remove(), 1000);
    intentarMusica();
  }
  pantallaInicio.addEventListener("click", iniciar);
  pantallaInicio.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") iniciar(); });

  btnAudio.addEventListener("click", () => {
    if (!sonando) intentarMusica();
    else { audio.pause(); marcarSonando(false); }
  });

  document.getElementById("btn-forma").addEventListener("click", alternarFigura);
  setInterval(() => { if (iniciado && capaTarjeta.classList.contains("oculto")) alternarFigura(); }, INTERVALO_MUTACION_MS);

  /* =====================================================================
     11) BUCLE DE ANIMACIÓN
     ===================================================================== */

  function suave(x) { return x * x * (3 - 2 * x); }

  function animar() {
    requestAnimationFrame(animar);
    const dt = Math.min(reloj.getDelta(), 0.05);
    const t = reloj.getElapsedTime();

    materialesPuntos.forEach((m) => { m.uniforms.uTiempo.value = t; });

    // entrada de cámara: se acerca desde lejos al tocar para iniciar
    let intro = 1;
    if (iniciado) intro = 1 - suave(limitar((t - tInicio) / 4.2, 0, 1));
    const distanciaFinal = distancia + intro * 80;

    if (!arrastrando) velocidadGiro += (GIRO_BASE - velocidadGiro) * 0.02;
    anguloCamara += velocidadGiro * (arrastrando ? 0 : 1);
    camara.position.set(
      Math.sin(anguloCamara) * distanciaFinal,
      alturaCamara + intro * 10,
      Math.cos(anguloCamara) * distanciaFinal
    );
    camara.lookAt(0, 9, 0);

    // la galaxia gira despacio
    galaxia.rotation.y += dt * 0.035;

    // figura central: mutación y siempre mirando de frente a la cámara
    mezcla += (destinoMezcla - mezcla) * Math.min(1, dt * 1.25);
    matFigura.uniforms.uMezcla.value = mezcla;
    grupoFigura.rotation.y = Math.atan2(camara.position.x, camara.position.z);
    grupoFigura.position.y = 17 + Math.sin(t * 0.6) * 0.5;

    // carritos orbitando
    carros.forEach((c) => {
      c.ang += c.vel * dt * 6;
      c.sprite.position.set(
        Math.cos(c.ang) * c.radio,
        c.altura + Math.sin(t * 0.7 + c.fase) * 0.9,
        Math.sin(c.ang) * c.radio
      );
      c.sprite.material.rotation = Math.sin(t * 0.8 + c.fase) * 0.07;
    });

    // palabras orbitando
    palabras.forEach((p) => {
      p.ang += p.vel * dt * 5;
      p.sprite.position.set(
        Math.cos(p.ang) * p.radio,
        p.altura + Math.sin(t * 0.5 + p.fase) * 1.0,
        Math.sin(p.ang) * p.radio
      );
      p.sprite.material.opacity = 0.55 + Math.sin(t * 0.9 + p.fase) * 0.25;
    });

    renderer.render(escena, camara);
  }

  animar();

  window.addEventListener("resize", () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    materialesPuntos.forEach((m) => { m.uniforms.uEscala.value = window.innerHeight * 0.5; });
  });

})();

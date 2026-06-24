/* =========================================================
   Hero — Three.js neural network particle field
   Floating nodes + connecting lines, gentle camera drift,
   reacts to mouse position.
   ========================================================= */
(function () {
  'use strict';
  if (typeof THREE === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const mount = document.querySelector('.hero-canvas');
  if (!mount) return;

  const width = () => mount.clientWidth;
  const height = () => mount.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width() / height(), 0.1, 1000);
  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width(), height());
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);

  /* --- Nodes (particles) --- */
  const NODE_COUNT = 110;
  const RADIUS = 60;
  const positions = new Float32Array(NODE_COUNT * 3);
  const velocities = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    const r = Math.cbrt(Math.random()) * RADIUS;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = r * Math.cos(phi);
    velocities.push({
      x: (Math.random() - 0.5) * 0.05,
      y: (Math.random() - 0.5) * 0.05,
      z: (Math.random() - 0.5) * 0.05,
    });
  }

  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Node sprite — soft round point
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(100,255,218,1)');
  grad.addColorStop(0.4, 'rgba(100,255,218,0.5)');
  grad.addColorStop(1, 'rgba(100,255,218,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const sprite = new THREE.CanvasTexture(canvas);

  const nodeMat = new THREE.PointsMaterial({
    size: 2.6,
    map: sprite,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: 0x64ffda,
  });
  const points = new THREE.Points(nodeGeo, nodeMat);
  scene.add(points);

  /* --- Lines (connections within distance) --- */
  const MAX_LINKS = NODE_COUNT * 6;
  const lineGeo = new THREE.BufferGeometry();
  const linePositions = new Float32Array(MAX_LINKS * 6);
  const lineColors = new Float32Array(MAX_LINKS * 6);
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
  const lineMat = new THREE.LineBasicMaterial({
    vertexColors: true, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  const LINK_DIST = 18;

  /* --- Mouse parallax --- */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  /* --- Resize --- */
  function resize() {
    camera.aspect = width() / height();
    camera.updateProjectionMatrix();
    renderer.setSize(width(), height());
  }
  window.addEventListener('resize', resize);

  /* --- Animate --- */
  const tmp = new THREE.Vector3();
  function tick() {
    // ease mouse
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;

    // drift nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i*3]   += velocities[i].x;
      positions[i*3+1] += velocities[i].y;
      positions[i*3+2] += velocities[i].z;

      const r = Math.hypot(positions[i*3], positions[i*3+1], positions[i*3+2]);
      if (r > RADIUS) {
        velocities[i].x *= -1;
        velocities[i].y *= -1;
        velocities[i].z *= -1;
      }
    }
    nodeGeo.attributes.position.needsUpdate = true;

    // rebuild line segments within distance threshold
    let li = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i*3] - positions[j*3];
        const dy = positions[i*3+1] - positions[j*3+1];
        const dz = positions[i*3+2] - positions[j*3+2];
        const d  = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (d < LINK_DIST && li < MAX_LINKS) {
          const o = li * 6;
          linePositions[o]   = positions[i*3];
          linePositions[o+1] = positions[i*3+1];
          linePositions[o+2] = positions[i*3+2];
          linePositions[o+3] = positions[j*3];
          linePositions[o+4] = positions[j*3+1];
          linePositions[o+5] = positions[j*3+2];
          const a = 1 - d / LINK_DIST;
          // gradient cyan -> soft white
          lineColors[o]   = 0.39; lineColors[o+1] = 1.0;  lineColors[o+2] = 0.85;
          lineColors[o+3] = 0.6 + a*0.4; lineColors[o+4] = 0.9;  lineColors[o+5] = 1.0;
          li++;
        }
      }
    }
    lineGeo.setDrawRange(0, li * 2);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;

    // gentle rotation + parallax
    points.rotation.y += 0.0009;
    points.rotation.x += 0.0004;
    lines.rotation.copy(points.rotation);

    camera.position.x += (mouse.x * 16 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y * 12 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
})();

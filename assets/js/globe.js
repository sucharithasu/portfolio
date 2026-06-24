/* =========================================================
   Globe — 3D rotating wireframe globe with collaboration markers.
   Pure Three.js, no external textures.
   ========================================================= */
(function () {
  'use strict';
  if (typeof THREE === 'undefined') return;
  const mount = document.querySelector('#globe');
  if (!mount) return;

  const W = () => mount.clientWidth;
  const H = () => mount.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W()/H(), 0.1, 100);
  camera.position.set(0, 0, 4.2);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);

  // ---------- Sphere base ----------
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 64, 64),
    new THREE.MeshBasicMaterial({ color: 0x0a192f, transparent: true, opacity: 0.85 })
  );
  scene.add(sphere);

  // Wireframe overlay
  const wire = new THREE.Mesh(
    new THREE.SphereGeometry(1.51, 32, 24),
    new THREE.MeshBasicMaterial({ color: 0x64ffda, wireframe: true, transparent: true, opacity: 0.18 })
  );
  scene.add(wire);

  // Outer glow ring
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.72, 1.76, 96),
    new THREE.MeshBasicMaterial({ color: 0x64ffda, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
  );
  ring.rotation.x = Math.PI / 2.3;
  scene.add(ring);

  // ---------- Markers ----------
  const cities = [
    // Home
    { name: 'Hyderabad, India',   lat: 17.385, lon: 78.486, home: true },
    // Conferences / collaborations
    { name: 'Hanoi, Vietnam',     lat: 21.028, lon: 105.804 },
    { name: 'Tainan, Taiwan',     lat: 22.999, lon: 120.227 },
    { name: 'Indore, India',      lat: 22.719, lon: 75.857 },
    { name: 'New York, USA',      lat: 40.713, lon: -74.006 },
    { name: 'London, UK',         lat: 51.507, lon: -0.128 },
    { name: 'Cairo, Egypt',       lat: 30.044, lon: 31.236 },
    { name: 'Hobart, Australia',  lat: -42.882, lon: 147.328 },
    { name: 'Berlin, Germany',    lat: 52.520, lon: 13.405 },
    { name: 'Singapore',          lat: 1.352,  lon: 103.820 },
    { name: 'Beijing, China',     lat: 39.904, lon: 116.407 },
    { name: 'Toronto, Canada',    lat: 43.651, lon: -79.347 },
  ];

  function latLonToVec3(lat, lon, r = 1.52) {
    const phi   = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta)
    );
  }

  // Marker dots
  const dotGeo = new THREE.SphereGeometry(0.025, 12, 12);
  cities.forEach((c, i) => {
    const color = c.home ? 0xffffff : 0x64ffda;
    const dot = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color }));
    dot.position.copy(latLonToVec3(c.lat, c.lon));
    sphere.add(dot);

    if (c.home) {
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x64ffda, transparent: true, opacity: 0.4 })
      );
      halo.position.copy(dot.position);
      halo.userData.pulse = true;
      sphere.add(halo);
    }
  });

  // Arc connections from Hyderabad to each marker
  const home = latLonToVec3(17.385, 78.486);
  cities.slice(1).forEach(c => {
    const dest = latLonToVec3(c.lat, c.lon);
    const mid = home.clone().add(dest).multiplyScalar(0.5);
    const dist = home.distanceTo(dest);
    mid.normalize().multiplyScalar(1.52 + dist * 0.4);
    const curve = new THREE.QuadraticBezierCurve3(home, mid, dest);
    const pts = curve.getPoints(48);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: 0x64ffda, transparent: true, opacity: 0.35 });
    sphere.add(new THREE.Line(geo, mat));
  });

  // ---------- Particles around globe ----------
  const starGeo = new THREE.BufferGeometry();
  const starCount = 250;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const r = 3.2 + Math.random() * 4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    starPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    starPos[i*3+2] = r * Math.cos(phi);
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
    color: 0x8892b0, size: 0.02, transparent: true, opacity: 0.55,
  })));

  // ---------- Drag rotation ----------
  let isDown = false, lx = 0, ly = 0, vy = 0.0025, vx = 0;
  mount.addEventListener('pointerdown', (e) => { isDown = true; lx = e.clientX; ly = e.clientY; });
  window.addEventListener('pointerup', () => { isDown = false; });
  window.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - lx, dy = e.clientY - ly;
    vy = dx * 0.005; vx = dy * 0.005;
    sphere.rotation.y += vy;
    sphere.rotation.x = THREE.MathUtils.clamp(sphere.rotation.x + vx, -1.0, 1.0);
    lx = e.clientX; ly = e.clientY;
  });

  function resize() {
    camera.aspect = W()/H();
    camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  }
  window.addEventListener('resize', resize);

  let t = 0;
  function tick() {
    t += 0.012;
    if (!isDown) sphere.rotation.y += 0.0024;
    wire.rotation.copy(sphere.rotation);

    sphere.children.forEach(ch => {
      if (ch.userData.pulse) {
        const s = 1 + Math.sin(t * 2) * 0.4;
        ch.scale.setScalar(s);
        ch.material.opacity = 0.5 - Math.sin(t * 2) * 0.25;
      }
    });
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
})();

require('../assets/sass/main.sass');

import * as THREE from 'three';

let camera, scene, renderer;
let geometry, material, mesh, line;

init();
animate();
scroll();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshPhongMaterial({
    color: new THREE.Color('red'),
    opacity: 0.3,
    transparent: true
  });

  const edges = new THREE.EdgesGeometry(geometry);
  line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({
      color: '0xFF4400',
      linewidth: 2
    })
  );

  const light = new THREE.DirectionalLight('0xFFFFFF', 1);
  light.position.set(0, 0.5, 1).normalize();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  scene.add(line);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

function scroll() {
  document.addEventListener('wheel', e => {
    if (e.deltaY > 0) {
      mesh.rotation.x += 0.05;
      line.rotation.x += 0.05;
    } else {
      mesh.rotation.x -= 0.05;
      line.rotation.x -= 0.05;
    }
  });
}

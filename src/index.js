require('../assets/sass/main.sass');

import Scene from './Scene';

let scene;

init();

function init() {
  scene = new Scene();
  scene.init();
  animate();
  bindScroll();
}

function animate() {
  requestAnimationFrame(animate);

  scene.render();
}

function bindScroll() {
  document.addEventListener('wheel', event => {
    scene.scroll(event);
  });
}

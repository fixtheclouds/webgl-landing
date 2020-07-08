import * as THREE from 'three';

export default class Scene {
  constructor() {
    this.counter = 0;
  }

  init() {
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      10
    );
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshPhongMaterial({
      color: new THREE.Color('red'),
      opacity: 0.3,
      transparent: true
    });

    const edges = new THREE.EdgesGeometry(this.geometry);
    this.line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({
        color: '0xFF4400',
        linewidth: 2
      })
    );

    const light = new THREE.DirectionalLight('0xFFFFFF', 1);
    light.position.set(0, 0.5, 1).normalize();

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
    this.scene.add(this.line);
    this.scene.add(light);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  scroll(event) {
    let key = 'x';
    if (this.counter >= 2) {
      this.counter = 0;
    } else if (this.counter >= 1) {
      key = 'y';
    }

    if (event.deltaY > 0) {
      this.mesh.rotation[key] = Number(
        (this.mesh.rotation[key] + 0.05).toFixed(2)
      );
      this.line.rotation[key] = Number(
        (this.line.rotation[key] + 0.05).toFixed(2)
      );
    } else {
      this.mesh.rotation[key] = Number(
        (this.mesh.rotation[key] - 0.05).toFixed(2)
      );
      this.line.rotation[key] = Number(
        (this.line.rotation[key] - 0.05).toFixed(2)
      );
    }

    this.counter = Number((this.counter + 0.05).toFixed(2));
  }
}

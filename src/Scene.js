import * as THREE from 'three';

const rotationStep = 0.05;
const maxRotationStep = 1.5;

export default class Scene {
  constructor() {
    this.rotationSpeed = 0;
    this.rotationAngle = 0;
    this.lastDirection = 'x';
    this.direction = Object.assign(this.lastDirection);
    this.debouncedScroll = _.debounce(this._scroll, 50, {
      leading: true,
      trailing: false
    });
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
    this._scrollNext();
    this.renderer.render(this.scene, this.camera);
  }

  _scrollNext() {
    if (!this.rotationSpeed) {
      return;
    }
    this.rotationAngle = Number(
      (this.rotationAngle + this.rotationSpeed).toFixed(2)
    );

    if (this._scrollStop()) {
      this.rotationAngle = 0;
      this.rotationSpeed = 0;
    }

    this.mesh.rotation[this.direction] = this.rotationAngle;
    this.line.rotation[this.direction] = this.rotationAngle;
  }

  _scrollStop() {
    if (this.rotationSpeed > 0) {
      return this.rotationAngle > maxRotationStep;
    }

    return this.rotationAngle < -maxRotationStep;
  }

  _scroll(event) {
    this.rotationAngle = 0;
    this.rotationSpeed = event.deltaY > 0 ? rotationStep : -rotationStep;
    this._switchDirection();
  }

  _switchDirection() {
    this.lastDirection = Object.assign(this.direction);
    this.direction = this.direction === 'x' ? 'y' : 'x';
  }

  scroll(event) {
    this.debouncedScroll(event);
  }
}

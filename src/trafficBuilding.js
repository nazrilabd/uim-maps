import * as THREE from "three";
const Geometry = new THREE.BoxGeometry(50, 0.5, 13);
const Geometry2 = new THREE.BoxGeometry(80, 0.5, 13);
const texture = new THREE.TextureLoader().load("assets/textures/jalan.jpg");
const Material = new THREE.MeshBasicMaterial({ map: texture, color: 0x2d2d2d });
const traffic = new THREE.Mesh(Geometry, Material);
const traffic2 = traffic.clone();
traffic2.geometry = Geometry2;

export function buildTraffic(scene) {
  traffic.position.set(20, 1, -25);
  scene.add(traffic);
  traffic2.position.set(40, 1, 0);
  traffic2.rotation.y = Math.PI / 2;
  scene.add(traffic2);
}

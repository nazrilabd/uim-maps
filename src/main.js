import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { buildingData } from "./buildingData";
// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(50, 100, 50);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

// ==================================================
// 1. Tanah Hijau
const groundSize = 100;
const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228b22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./assets/textures/texture-bank.jpg");
// Terapkan ke semua material dalam model

//objLoader

// 2. Grid Kotak
const gridHelper = new THREE.GridHelper(
  groundSize,
  groundSize / 5,
  0x000000,
  0x000000
);
// groundSize/5 artinya jarak antar garis, hitam warnanya
gridHelper.position.y = 0.01; // biar ga nabrak plane hijau
scene.add(gridHelper);

async function createBuilding() {
  const buildings = await buildingData();

  buildings.forEach(async (building) => {
    const size = building.size || [8, 5, 8]; // default 8x8 kotak kalau tidak ditentukan
    const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
    const material = new THREE.MeshLambertMaterial({ color: building.color });
    let scale = building.scale ?? 0.2;

    const mesh = building.model;
    mesh.material = material;
    // mesh.geometry = geometry;
    mesh.position.set(building.position[0], 0, building.position[2]);
    if (building.rotate) {
      let r = building.rotate;
      mesh.rotation.y = r;
    }
    mesh.scale.set(scale, scale, scale);
    scene.add(mesh);
    console.log(building.name);
    console.log(building.model);
  });
}
createBuilding();
// ===== Responsive resize =====
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
function zoom(factor) {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  camera.position.add(direction.multiplyScalar(factor)); // positif: zoom in, negatif: zoom out
}
document.getElementById("zoomIn").addEventListener("click", () => {
  zoom(-2); // zoom in
});

document.getElementById("zoomOut").addEventListener("click", () => {
  zoom(2); // zoom out
});

// ==================================================

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

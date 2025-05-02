import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { buildingData } from "./buildingData";
import { buildTraffic } from "./trafficBuilding";
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
const buildingMeshes = [];
async function createBuilding() {
  const buildings = await buildingData();

  buildings.forEach(async (building) => {
    const size = building.size || [8, 5, 8]; // default 8x8 kotak kalau tidak ditentukan
    const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);

    let scale = building.scale ?? 1;

    const mesh = building.model;
    mesh.userData = {
      name: building.name,
      description: building.description || "No description available", // Optional description
    };

    mesh.position.x = building.position[0];
    mesh.position.z = building.position[2];
    if (building.rotate) {
      let r = building.rotate;
      mesh.rotation.y = r;
    }
    mesh.scale.set(scale, scale, scale);
    if (building.name == "ruang aula") {
      mesh.position.y = 2;
    }

    scene.add(mesh);
    buildingMeshes.push(mesh);
  });
}
createBuilding();
buildTraffic(scene);
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
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const popup = document.getElementById("popup");

renderer.domElement.addEventListener("click", (event) => {
  const buildingMeshe = buildingMeshes;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(buildingMeshes, true);

  if (intersects.length > 0) {
    console.log(intersects[0].object.userData.name);
    const intersected = intersects[0].object;

    const { name, description } = intersected.userData;

    popup.innerHTML = `
      <div class="font-semibold mb-1">${name}</div>
      <div>${description}</div>
    `;
    popup.style.left = `${event.clientX + 12}px`;
    popup.style.top = `${event.clientY + 12}px`;
    popup.classList.remove("hidden");
  } else {
    popup.classList.add("hidden");
  }
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

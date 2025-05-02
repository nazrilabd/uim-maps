import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";
import { label, lightPosition } from "three/src/nodes/TSL.js";
//gltf loade init
const gltfLoader = new GLTFLoader();
const fbxLoader = new FBXLoader();
const objLoader = new OBJLoader();

// export let buildingClass;
// export let buildingGateF;
// export let buildingGateB;
// export let buildingToilet;
// export let buildingTraffic;
// export let buildingAula;
// export let buildingTugu;
// export let buildingParkiran;
// export let buildingLapangan;
//building-class

function createBox(x, y, z, textures) {
  const Geometry = new THREE.BoxGeometry(x, y, z);

  const texture = new THREE.TextureLoader().load(textures);

  const material = [
    new THREE.MeshLambertMaterial({
      map: texture,
    }),
    new THREE.MeshLambertMaterial({
      map: texture,
    }),
    new THREE.MeshLambertMaterial({
      color: 0xd2691e,
    }),
    new THREE.MeshLambertMaterial({
      map: texture,
    }),
    new THREE.MeshLambertMaterial({
      map: texture,
    }),
    new THREE.MeshLambertMaterial({
      map: texture,
    }),
  ];
  const box = new THREE.Mesh(Geometry, material);
  box.position.y = y / 2;
  return box;
}

function createLapangan(x, y, z, textures) {
  const Geometry = new THREE.BoxGeometry(x, y, z);

  const texture = new THREE.TextureLoader().load(textures);

  const material = new THREE.MeshPhongMaterial({
    map: texture,
    color: 0x008000,
    flatShading: true,
  });
  const box = new THREE.Mesh(Geometry, material);
  box.position.y = y / 2;
  return box;
}

function createParkir(x, y, z, textures) {
  const Geometry = new THREE.BoxGeometry(x, y, z);

  const texture = new THREE.TextureLoader().load(textures);

  const material = new THREE.MeshPhongMaterial({
    map: texture,
  });
  const box = new THREE.Mesh(Geometry, material);
  box.position.y = y / 2;
  return box;
}
function loadModel(url, loader) {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        resolve(gltf);
      },
      undefined,
      reject
    );
  });
}

export async function models() {
  const root = await loadModel(
    "../assets/3dmodel/building-bank.glb",
    gltfLoader
  );

  const gateChina = await loadModel(
    "../assets/3dmodel/gate-china.glb",
    gltfLoader
  );
  const statue = await loadModel(
    "../assets/3dmodel/burger-statue.glb",
    gltfLoader
  );
  const laptex = new THREE.TextureLoader().load(
    "../assets/textures/building-house.png"
  );
  const lapangan = createLapangan(10, 0.2, 7, "/assets/textures/rumput.jpg");
  const aula = createBox(25, 5, 10, "/assets/textures/building-aula.png");
  const school = createBox(5, 5, 5, "/assets/textures/building-school.png");
  const toilet = createBox(4, 3, 5, "/assets/textures/toilet.png");
  const parkiran = createParkir(25, 2, 2, "/assets/textures/jalan.jpg");

  return {
    buildingClass: school,
    buildingGateF: gateChina.scene.children[0],
    buildingGateB: gateChina.scene.children[0],
    buildingAula: aula,
    buildingToilet: toilet,
    buildingTraffic: root.scene.children[0],
    buildingTugu: statue.scene.children[0],
    buildingLapangan: lapangan,
    buildingParkiran: parkiran,
  };
}

//   console.log(root);

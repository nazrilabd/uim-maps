import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { FBXLoader } from "three/examples/jsm/Addons.js";

//gltf loade init
const gltfLoader = new GLTFLoader();
const fbxLoader = new FBXLoader();
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
  const school = await loadModel(
    "../assets/3dmodel/building-school.glb",
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
  const aula = await loadModel(
    "../assets/3dmodel/building-aula.glb",
    gltfLoader
  );
  return {
    buildingClass: root.scene.children[0],
    buildingGateF: gateChina.scene.children[0],
    buildingGateB: gateChina.scene.children[0],
    buildingAula: aula.scene.children[0],
    buildingToilet: school.scene.children[0],
    buildingTraffic: root.scene.children[0],
    buildingTugu: statue.scene.children[0],
    buildingLapangan: root.scene.children[0],
    buildingParkiran: root.scene.children[0],
  };
}

//   console.log(root);

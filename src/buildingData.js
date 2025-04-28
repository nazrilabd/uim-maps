import { models } from "./ModelLoad.js";
//building
export async function buildingData() {
  const model = await models();
  const buildingDat = [
    {
      name: "toilet",
      color: 0xff69b4,
      position: [-40, 0, 30],
      model: model.buildingToilet.clone(),
    }, // pojok kiri atas
    {
      name: "kelas d1",
      color: 0x808080,
      position: [-30, 0, 30],
      model: model.buildingClass.clone(),
    },
    {
      name: "kelas d2",
      color: 0x808080,
      position: [-20, 0, 30],
      model: model.buildingClass.clone(),
    },
    {
      name: "kelas d3",
      color: 0x808080,
      position: [-10, 0, 30],
      model: model.buildingClass.clone(),
    },
    {
      name: "kelas c2",
      color: 0x808080,
      position: [-30, 0, 20],
      model: model.buildingClass.clone(),
    },
    {
      name: "kelas c2",
      color: 0x808080,
      position: [-30, 0, 10],
      model: model.buildingClass.clone,
    },
    {
      name: "kelas c1",
      color: 0x808080,
      position: [-30, 0, 0],
      model: model.buildingClass.clone(),
    },
    {
      name: "lapangan",
      color: 0x008000,
      position: [-5, 0, 10],
      size: [30, 5, 25],
      model: model.buildingLapangan,
    },
    {
      name: "kelas b1",
      color: 0x808080,
      position: [-30, 0, -10],
      model: model.buildingClass.clone(),
    },
    {
      name: "kelas b2",
      color: 0x808080,
      position: [-20, 0, -10],
      model: model.buildingClass.clone(),
    },
    {
      name: "kelas b1",
      color: 0x808080,
      position: [-10, 0, -10],
      model: model.buildingClass.clone(),
    },
    {
      name: "toilet",
      color: 0xff69b4,
      position: [-40, 0, -10],
      model: model.buildingToilet.clone(),
    },
    {
      name: "ruang aula",
      color: 0x800080,
      position: [10, 0, -10],
      size: [30, 5, 10],
      model: model.buildingAula.clone(),
      scale: 1,
    },
    {
      name: "kantor",
      color: 0x0000ff,
      position: [20, 0, 30],
      model: model.buildingClass.clone(),
    },
    {
      name: "perpustakaan",
      color: 0x0000ff,
      position: [20, 0, 20],
      model: model.buildingClass.clone(),
    },
    {
      name: "ruang kantor",
      color: 0x0000ff,
      position: [20, 0, 0],
      model: model.buildingClass.clone(),
    },
    {
      name: "gerbang",
      color: 0xffff00,
      position: [20, 0, 10],
      model: model.buildingGateF.clone(),
      rotate: Math.PI / 2,
      scale: 1,
    },
    {
      name: "gerbang",
      color: 0xffff00,
      position: [40, 0, -40],
      model: model.buildingGateB.clone(),
      scale: 1,
    },
    {
      name: "tugu pancasila",
      color: 0xaaaaaa,
      position: [40, 0, -20],
      model: model.buildingTugu.clone(),
      scale: 1,
    },
    {
      name: "parkiran",
      color: 0xffa500,
      position: [0, 0, -35],
      size: [30, 5, 10],
      model: model.buildingParkiran,
    },
    {
      name: "parkiran",
      color: 0xffa500,
      position: [0, 0, -23],
      size: [30, 5, 10],
      model: model.buildingParkiran,
    },
  ];
  return buildingDat;
}

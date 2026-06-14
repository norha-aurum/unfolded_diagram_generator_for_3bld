import { state } from "../state/appState.js";

// Map配列のインデックスに対応するSVG polygon ID
const edgeIds = [
  "UB", "UR", "UF", "UL", "LU", "LF", "LD", "LB", "FU", "FR", "FD", "FL", 
  "RU", "RB", "RD", "RF", "BU", "BL", "BD", "BR", "DF", "DR", "DB", "DL"
];
const cornerIds = [
  "UBL", "UBR", "UFR", "UFL", "LUB", "LUF", "LDF", "LDB", "FUL", "FUR", "FDR", "FDL", 
  "RUF", "RUB", "RDB", "RDF", "BUR", "BUL", "BDL", "BDR", "DFL", "DFR", "DBR", "DBL"
];

// 色適用ロジック
function getColorByStickerId(id) {
  if (id >= 0 && id <= 3) return "white";
  if (id >= 4 && id <= 7) return "orange";
  if (id >= 8 && id <= 11) return "green";
  if (id >= 12 && id <= 15) return "red";
  if (id >= 16 && id <= 19) return "blue";
  if (id >= 20 && id <= 23) return "yellow";
  return "black";
}

// SVGの更新
export function updateSVG() {
  for (let i = 0; i < 24; i++) {
    const edgePoly = document.getElementById(edgeIds[i]);
    const cornerPoly = document.getElementById(cornerIds[i]);
    if (edgePoly) edgePoly.setAttribute('fill', getColorByStickerId(state.cube.edgeMap[i]));
    if (cornerPoly) cornerPoly.setAttribute('fill', getColorByStickerId(state.cube.cornerMap[i]));
  }
}
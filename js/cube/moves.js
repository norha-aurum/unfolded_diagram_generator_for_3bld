import { state } from "../state/appState.js";

// --- Cube 回転ロジック ---
export function cycle(arr, indices) {
  const temp = arr[indices[0]];
  for (let i = 0; i < indices.length - 1; i++) {
    arr[indices[i]] = arr[indices[i + 1]];
  }
  arr[indices[indices.length - 1]] = temp;
}

export function applyMoveLogic(cube, edgeCycles, cornerCycles) {
  const e = [...cube.edgeMap];
  const c = [...cube.cornerMap];
  edgeCycles.forEach(cyc => cycle(e, cyc));
  cornerCycles.forEach(cyc => cycle(c, cyc));
  cube.edgeMap = e;
  cube.cornerMap = c;
}

// R
function applyR(cube) { applyMoveLogic(cube, [[1,9,21,19],[12,15,14,13]], [[1,9,21,19],[16,2,10,22],[13,12,15,14]]); }
function applyR2(cube) { applyR(cube); applyR(cube); }
function applyRP(cube) { applyR(cube); applyR(cube); applyR(cube); }
// L
function applyL(cube) { applyMoveLogic(cube, [[3,17,23,11],[4,7,6,5]], [[0,18,20,8],[17,23,11,3],[4,7,6,5]]); }
function applyL2(cube) { applyL(cube); applyL(cube); }
function applyLP(cube) { applyL(cube); applyL(cube); applyL(cube); }
// U
function applyU(cube) { applyMoveLogic(cube, [[0,3,2,1],[16,4,8,12]], [[0,3,2,1],[17,5,9,13],[4,8,12,16]]); }
function applyU2(cube) { applyU(cube); applyU(cube); }
function applyUP(cube) { applyU(cube); applyU(cube); applyU(cube); }
// D
function applyD(cube) { applyMoveLogic(cube, [[20,23,22,21],[10,6,18,14]], [[20,23,22,21],[11,7,19,15],[6,18,14,10]]); }
function applyD2(cube) { applyD(cube); applyD(cube); }
function applyDP(cube) { applyD(cube); applyD(cube); applyD(cube); }
// F
function applyF(cube) { applyMoveLogic(cube, [[8,11,10,9],[2,5,20,15]], [[8,11,10,9],[3,6,21,12],[5,20,15,2]]); }
function applyF2(cube) { applyF(cube); applyF(cube); }
function applyFP(cube) { applyF(cube); applyF(cube); applyF(cube); }
// B
function applyB(cube) { applyMoveLogic(cube, [[16,19,18,17],[0,13,22,7]], [[16,19,18,17],[1,14,23,4],[13,22,7,0]]); }
function applyB2(cube) { applyB(cube); applyB(cube); }
function applyBP(cube) { applyB(cube); applyB(cube); applyB(cube); }

// 単一文字列に基づく適用
export function applySingleMove(moveStr) {
  switch (moveStr.toUpperCase()) {
    case 'R': applyR(state.cube); break;
    case 'R2': applyR2(state.cube); break;
    case "R'": applyRP(state.cube); break;
    case 'L': applyL(state.cube); break;
    case 'L2': applyL2(state.cube); break;
    case "L'": applyLP(state.cube); break;
    case 'U': applyU(state.cube); break;
    case 'U2': applyU2(state.cube); break;
    case "U'": applyUP(state.cube); break;
    case 'D': applyD(state.cube); break;
    case 'D2': applyD2(state.cube); break;
    case "D'": applyDP(state.cube); break;
    case 'F': applyF(state.cube); break;
    case 'F2': applyF2(state.cube); break;
    case "F'": applyFP(state.cube); break;
    case 'B': applyB(state.cube); break;
    case 'B2': applyB2(state.cube); break;
    case "B'": applyBP(state.cube); break;
  }
}
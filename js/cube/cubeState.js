import { state } from "../state/appState.js";
// 初期化関数
export function initCube() {
  for (let i = 0; i < 24; i++) {
    state.cube.edgeMap[i] = i;
    state.cube.cornerMap[i] = i;
  }
}
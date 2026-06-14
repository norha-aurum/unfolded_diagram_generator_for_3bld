import { state } from "../state/appState.js";
import { initCube } from "./cubeState.js";
import { applySingleMove } from "./moves.js";
import { updateSVG } from "../diagram/render.js";

// --- Scramble生成・検証 ---

// ムーブの軸を取得（0:U/D, 1:R/L, 2:F/B）
function getAxis(move) {
  const base = move.charAt(0).toUpperCase();
  if (base === 'U' || base === 'D') return 0;
  if (base === 'R' || base === 'L') return 1;
  if (base === 'F' || base === 'B') return 2;
  return -1;
}

// ランダムスクランブル生成
export function generateRandomScramble() {
  const moveSets = [
    ["U", "U'", "U2", "D", "D'", "D2"],
    ["R", "R'", "R2", "L", "L'", "L2"],
    ["F", "F'", "F2", "B", "B'", "B2"]
  ];
  let scramble = [];
  let lastAxis = -1;

  for (let i = 0; i < 20; i++) {
    let axis;
    do {
      axis = Math.floor(Math.random() * 3);
    } while (axis === lastAxis);
    lastAxis = axis;
    const moves = moveSets[axis];
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    scramble.push(randomMove);
  }
  return scramble.join(" ");
}

// 入力文字列のバリデーション
export function isValidScramble(str) {
  if (!str) return false;
  const moves = str.trim().split(" ");
  if (moves.length < 1 || moves.length > 30) return false;

  const validRegex = /^[UDRLFB][2\']?$/i;
  let lastAxis = -1;

  for (let i = 0; i < moves.length; i++) {
    const m = moves[i];
    if (!validRegex.test(m)) return false;
    const axis = getAxis(m);
    if (axis === -1 || axis === lastAxis) return false; // 無効文字 or 同一軸連続
    lastAxis = axis;
  }
  return true;
}

// 完全なスクランブル文字列の適用
export function applyScramble(scrambleStr) {
  initCube(); // 初期状態に戻す
  state.scramble = scrambleStr.toUpperCase();
  document.getElementById('current-scramble').innerText = state.scramble;

  const viewScramble = document.getElementById('view-scramble');
  if (viewScramble) {
  viewScramble.innerText = state.scramble;
  }
  
  if(state.scramble.trim() === "") return;

  const moves = state.scramble.split(" ");
  moves.forEach(m => applySingleMove(m));
  updateSVG();
}
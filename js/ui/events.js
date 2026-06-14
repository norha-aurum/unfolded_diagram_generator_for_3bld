import { generateRandomScramble, applyScramble, isValidScramble } from "../cube/scramble.js";
import { state } from "../state/appState.js";

// --- イベント制御・UIロジック ---

function hideError() {
  document.getElementById('error-msg').style.visibility = 'hidden';
}

function showError() {
  document.getElementById('error-msg').style.visibility = 'visible';
}

document.getElementById('btn-generate').addEventListener('click', () => {
  hideError();
  document.getElementById('input-scramble').value = ""; // 入力ウィンドウをクリア
  const newScramble = generateRandomScramble();
  applyScramble(newScramble);
});

document.getElementById('btn-copy').addEventListener('click', async () => {
  await navigator.clipboard.writeText(state.scramble);
});

document.getElementById('btn-apply').addEventListener('click', () => {
  hideError();
  const inputEl = document.getElementById('input-scramble');
  const inputStr = inputEl.value;

  if (isValidScramble(inputStr)) {
    applyScramble(inputStr);
    inputEl.value = ""; // 成功時は空欄に戻す
  } else {
    showError();
  }
});

document.getElementById('btn-view').addEventListener('click', () => {
  hideError();
  document.getElementById('top-page').classList.remove('active');
  document.getElementById('view-page').classList.add('active');
});

document.getElementById('btn-top').addEventListener('click', () => {
  document.getElementById('view-page').classList.remove('active');
  document.getElementById('top-page').classList.add('active');
});

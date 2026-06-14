import "./ui/events.js";

import {
  generateRandomScramble,
  applyScramble
} from "./cube/scramble.js";

window.onload = () => {
  const initialScramble = generateRandomScramble();
  applyScramble(initialScramble);
};

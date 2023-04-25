import { draw } from "./views/index.js";
import { handleClick, handleKeyDown } from "./controllers/index.js";
import { getEnemies } from "./models/enemy.js";
import { getPellets } from "./models/index.js";
import { getGame } from "./models/game.js";
let level = 1;
let correctTypes = 0;
let startTime = new Date();
let typos = 0;
const canvas = document.getElementById('canvas');
function handleKeyDownEvent(event) {
    handleKeyDown(event, canvas, getEnemies(), getPellets());
}
document.addEventListener("keydown", handleKeyDownEvent, false);
function handleMouseEvent(event) {
    handleClick(canvas, event, getGame());
}
document.addEventListener('click', handleMouseEvent, false);
draw();

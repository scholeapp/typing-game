import { getTowerCoordinates } from "params/index.js";
export function drawTower(canvas, ctx) {
    const towerCoordinate = getTowerCoordinates(canvas);
    const { x: towerX, y: towerY, width: towerWidth, height: towerHeight } = towerCoordinate;
    ctx.beginPath();
    ctx.rect(towerX, towerY, towerWidth, towerHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

import { anyPelletVisible, getEnemy } from "../models/index.js";
import { enemyApproxHeight, getTowerCoordinates, pelletAngVelocity, pelletRadiusX, pelletRadiusY, pelletVelocity } from "../params/index.js";
const footsteps = document.getElementById('footsteps');
export function drawPellets(canvas, ctx, pellets, enemies) {
    const { height: towerHeight } = getTowerCoordinates(canvas);
    for (let i = 0; i < pellets.length; i++) {
        const pellet = pellets[i];
        if (!pellet.visible) {
            continue;
        }
        const enemy = getEnemy(pellet.target);
        if (enemy === undefined) {
            console.warn(pellet, 'does not have corresponding target enemy');
            continue;
        }
        const textMetrics = ctx.measureText(enemy.remainingText);
        const enemyWidth = textMetrics.width;
        const dx = (enemy.x - enemyWidth / 2) - canvas.width / 2;
        const dy = (enemy.y + enemyApproxHeight / 2) - (canvas.height - towerHeight / 2);
        const vx = pelletVelocity * dx / Math.sqrt(dx ** 2 + dy ** 2);
        const vy = pelletVelocity * dy / Math.sqrt(dx ** 2 + dy ** 2);
        if (!pellet.visible) {
            continue;
        }
        ctx.beginPath();
        ctx.ellipse(pellet.x, pellet.y, pelletRadiusX, pelletRadiusY, pellet.rotation, 0, 2 * Math.PI);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        pellet.x += vx;
        pellet.y += vy;
        pellet.rotation += pelletAngVelocity;
    }
    if (!anyPelletVisible()) {
        footsteps.pause();
    }
}

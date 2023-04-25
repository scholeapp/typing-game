import { createPellet } from "../../models/index.js";
import { getTowerCoordinates, pelletRadiusX, pelletRadiusY } from "../../params/index.js";
function sortEnemies(e1, e2) {
    return e1.y - e2.y;
}
function filterVisibleEnemy(enemy) {
    return enemy.visible && enemy.remainingText.length > 0;
}
export function handleKeyDown(event, canvas, enemies, pellets) {
    let enemy = undefined;
    const { y: towerY } = getTowerCoordinates(canvas);
    const visibleEnemies = enemies
        .sort(sortEnemies)
        .filter(filterVisibleEnemy);
    for (let i = 0; i < visibleEnemies.length; i++) {
        const currentEnemy = visibleEnemies[i];
        if (currentEnemy.focus) {
            enemy = currentEnemy;
            break;
        }
        if (currentEnemy.remainingText[0].toLocaleLowerCase() === event.key) {
            enemy = currentEnemy;
        }
    }
    if (enemy === undefined) {
        // hit no enemy
        return;
    }
    if (enemy.remainingText[0].toLocaleLowerCase() === event.key) {
        createPellet((canvas.width - (pelletRadiusX + pelletRadiusY) / 2) / 2, towerY - (pelletRadiusX + pelletRadiusY) / 2 / 2, enemy.id, event.key);
        enemy.remainingText = enemy.remainingText.slice(1);
        enemy.focus = true;
        return;
    }
}

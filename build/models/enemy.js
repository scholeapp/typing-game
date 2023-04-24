import { minDy } from "params";
const enemies = [];
let enemyId = 0;
export function createEnemy(x, word) {
    const dy = Math.max(Math.random(), minDy);
    const newEnemy = {
        id: enemyId,
        x: x,
        y: 0,
        text: word.text,
        dy: dy,
        visibleText: word.text,
        visible: true,
        japanese: word.japanese,
        focus: false,
    };
    enemyId++;
    return newEnemy;
}
export function getEnemies() {
    return enemies;
}

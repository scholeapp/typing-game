import { minDy } from "../params/index.js";
const enemies = [];
let enemyId = 0;
export function createEnemy(x, word) {
    const dy = Math.max(Math.random(), minDy);
    const newEnemy = {
        id: enemyId,
        x: x,
        y: 0,
        originalText: word.text,
        remainingText: word.text,
        hitText: '',
        dy: dy,
        visible: true,
        japanese: word.japanese,
        focus: false,
    };
    enemies.push(newEnemy);
    enemyId++;
    return newEnemy;
}
export function getEnemies() {
    return enemies;
}
export function removeEnemy(id) {
}

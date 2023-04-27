import { getRandomInt } from "../utils/index.js";
const pellets = [];
let pelletId = 0;
export function getPellets() {
    return pellets;
}
export function createPellet(x, y, enemyId, key) {
    const newPellet = {
        id: pelletId,
        x: x,
        y: y,
        rotation: getRandomInt(180),
        visible: true,
        target: enemyId,
        key: key
    };
    pellets.push(newPellet);
    pelletId++;
    return newPellet;
}
export function anyPelletVisible() {
    for (let i = 0; i < pellets.length; i++) {
        if (pellets[i].visible) {
            return true;
        }
    }
    return false;
}

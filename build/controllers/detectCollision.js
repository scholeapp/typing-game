import { incrementGameScore } from "../models/index.js";
import { enemyApproxHeight } from "../params/index.js";
export function detectCollision(pellets, enemies, game) {
    for (let i = 0; i < pellets.length; i++) {
        const pellet = pellets[i];
        if (!pellet.visible) {
            continue;
        }
        const enemy = enemies.find(function (enemy) {
            return enemy.id === pellet.target;
        });
        if (enemy === undefined) {
            console.warn(pellet, 'does not have corresponding target enemy');
            continue;
        }
        if (!enemy.visible || !pellet.visible) {
            continue;
        }
        if (enemy.y + enemyApproxHeight > pellet.y &&
            enemy.y < pellet.y) {
            // check collision
            if (enemy.originalText.startsWith(enemy.hitText + pellet.key)) {
                // check if the right key hits. This should be true when max enemies = 1
                enemy.hitText = enemy.hitText + pellet.key;
                pellet.visible = false;
            }
            if (enemy.originalText === enemy.hitText) {
                enemy.visible = false;
                enemy.focus = false;
                incrementGameScore();
            }
        }
    }
}

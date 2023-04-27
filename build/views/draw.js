import { getGame, getEnemies, getPellets } from "../models/index.js";
import { clear, drawEnemies, drawGameover, drawOpening, drawPellets, drawScore, drawTower } from "./index.js";
import { addEnemyIfNeccesary, detectCollision } from "../controllers/index.js";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const audio = document.getElementById('audio');
export function draw() {
    clear(canvas, ctx);
    const game = getGame();
    const enemies = getEnemies();
    const pellets = getPellets();
    switch (game.scene) {
        case 'opening':
            drawOpening(canvas, ctx);
            break;
        case 'playing':
            addEnemyIfNeccesary(canvas, ctx, enemies, audio);
            drawTower(canvas, ctx);
            drawPellets(canvas, ctx, pellets, enemies);
            drawEnemies(canvas, ctx, game, enemies);
            drawScore(ctx, game.score);
            detectCollision(pellets, enemies, game);
            break;
        case 'gameover':
            drawGameover(canvas, ctx, game.score);
            break;
        default:
            const _never = game.scene;
    }
    requestAnimationFrame(draw);
}

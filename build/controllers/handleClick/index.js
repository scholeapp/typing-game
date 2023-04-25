import { restart } from "./restart.js";
import { start } from "./start.js";
export function handleClick(canvas, event, game) {
    switch (game.scene) {
        case 'opening':
            start(canvas, event, game);
            break;
        case 'gameover':
            restart(canvas, event, game);
            break;
    }
}

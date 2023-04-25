import { getClickCoordinates } from "./getClickCoordinates.js";
import { getStartbuttonCoordinates } from "../../params/index.js";
export function start(canvas, event, game) {
    const { x, y } = getClickCoordinates(canvas, event);
    const { x: startButtonX, y: startButtonY, width: startButtonWidth, height: startButtonHeight } = getStartbuttonCoordinates(canvas);
    if (x > startButtonX
        && x < startButtonX + startButtonWidth
        && y > startButtonY
        && y < startButtonY + startButtonHeight) {
        game.scene = 'playing';
    }
}

import { getClickCoordinates } from "./getClickCoordinates.js";
import { resetGame } from "../../models/index.js";
export function restart(canvas, event, game) {
    const { x, y } = getClickCoordinates(canvas, event);
    const tryAgainButtonWidth = 100;
    const tryAgainButtonHeight = 40;
    const tryAgainButtonX = (canvas.width - tryAgainButtonWidth) / 2;
    const tryAgainButtonY = 160;
    if (x > tryAgainButtonX
        && x < tryAgainButtonX + tryAgainButtonWidth
        && y > tryAgainButtonY
        && y < tryAgainButtonY + tryAgainButtonHeight) {
        resetGame();
        return;
    }
}

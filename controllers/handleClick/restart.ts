import { Game } from "types"
import { getClickCoordinates } from "./getClickCoordinates"
import { resetGame } from "models/game"

export function restart(canvas: HTMLCanvasElement,  event: MouseEvent, game: Game) {
  const {x, y} = getClickCoordinates(canvas, event)

  const tryAgainButtonWidth = 100
  const tryAgainButtonHeight = 40
  const tryAgainButtonX = (canvas.width - tryAgainButtonWidth ) / 2
  const tryAgainButtonY = 160

  if (x > tryAgainButtonX
    && x < tryAgainButtonX + tryAgainButtonWidth
    && y > tryAgainButtonY
    && y < tryAgainButtonY + tryAgainButtonHeight
    ) {
      resetGame()
      return
    }
}
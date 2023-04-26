import { Game } from "../../types.js"
import { getClickCoordinates } from "./getClickCoordinates.js"
import { resetGame, resetWords } from "../../models/index.js"

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
      resetWords()
      return
    }
}
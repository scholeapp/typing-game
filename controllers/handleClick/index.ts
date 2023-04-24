import { Game } from "types"
import { restart } from "./restart"
import { start } from "./start"

export function handleClick(canvas:HTMLCanvasElement, event: MouseEvent, game: Game) {
  switch(game.scene) {
    case 'opening':
      start(canvas, event, game)
      break
    case 'gameover':
      restart(canvas, event, game)
      break
  }  
}
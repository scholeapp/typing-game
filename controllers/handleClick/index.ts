import { Game } from "../../types.js"
import { restart } from "./restart.js"
import { start } from "./start.js"

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
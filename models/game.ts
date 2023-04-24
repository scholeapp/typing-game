import { Game } from "types";

const game: Game = {
  scene: 'opening',
  score: 0,
}

export function getGame() {
  return game
}

export function incrementGameScore() {
  game.score++
}

export function resetGame(){
  game.scene = 'playing'
  game.score = 0
}
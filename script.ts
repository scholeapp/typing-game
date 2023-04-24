import { clear, drawEnemies, drawGameover, drawOpening, drawPellets, drawScore, drawTower } from "views/index.js"
import { addEnemyIfNeccesary, detectCollision, handleClick, handleKeyDown } from "controllers/index.js"
import { getEnemies } from "models/enemy.js"
import { getPellets } from "models/index.js"
import { getGame } from "models/game.js"

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const audio = document.getElementById('audio') as HTMLAudioElement

let level = 1

let correctTypes = 0
let startTime = new Date()
let typos = 0

function handleKeyDownEvent(event: KeyboardEvent) {
  handleKeyDown(event, canvas, getEnemies(), getPellets())
}
document.addEventListener("keydown", handleKeyDownEvent, false)

function handleMouseEvent(event: MouseEvent){
  handleClick(canvas, event, getGame())
}
document.addEventListener('click', handleMouseEvent, false)

function draw() {
  clear(canvas, ctx)
  const game = getGame()
  const enemies = getEnemies()
  const pellets = getPellets()
  switch(game.scene) {
    case 'opening':
      drawOpening(canvas, ctx)
      break
    case 'playing':
      drawTower(canvas, ctx)
      drawPellets(canvas, ctx, pellets, enemies)
      drawEnemies(canvas, ctx, game, enemies)
      drawScore(ctx, game.score)
      detectCollision(pellets, enemies, game)
      addEnemyIfNeccesary(canvas, ctx, enemies, audio)
      break
    case 'gameover':
      drawGameover(canvas, ctx, game.score)
      break
    default:
      const _never: never = game.scene
  }
  requestAnimationFrame(draw)
}

draw()

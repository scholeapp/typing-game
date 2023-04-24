import { incrementGameScore } from "models/game"
import { enemyApproxHeight } from "params"
import { Enemy, Game, Pellet } from "types"

export function detectCollision(pellets: Pellet[], enemies: Enemy[], game: Game) {
  for (let i = 0; i < pellets.length; i++) {
    const pellet = pellets[i]
    if (!pellet.visible) {
      continue
    }
    const enemy = enemies.find(function(enemy) {
      return enemy.id === pellet.target
    })
    if (enemy === undefined) {
      console.warn(pellet, 'does not have corresponding target enemy')
      continue
    }
    if (!enemy.visible|| !pellet.visible) {
      continue
    }
    if ( enemy.y + enemyApproxHeight > pellet.y &&
      enemy.y < pellet.y) {
        pellet.visible = false
        enemy.visibleText = enemy.visibleText.slice(1)
        if (enemy.visibleText.length === 0) {
          enemy.visible = false
          enemy.focus = false
          incrementGameScore()
        }
    }
  }
}
import { incrementGameScore } from "../models/index.js"
import { enemyApproxHeight } from "../params/index.js"
import { Enemy, Game, Pellet } from "../types.js"

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
        // check collision
        console.log(pellet.key)
        console.log(enemy)
        if (enemy.originalText.startsWith(enemy.hitText + pellet.key)) {
          // check if the right key hits. This should be true when max enemies = 1
          enemy.hitText = enemy.hitText + pellet.key
          pellet.visible = false
        }
        if (enemy.originalText === enemy.hitText) {
          enemy.visible = false
          enemy.focus = false
          incrementGameScore()
        }
    }
  }
}
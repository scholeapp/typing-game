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
        if (enemy.text.startsWith(enemy.receivedText + pellet.key)) {
          // check if the right key hits
          enemy.receivedText += pellet.key
          pellet.visible = false
        }
        if (enemy.text === enemy.receivedText) {
          enemy.visible = false
          enemy.focus = false
          incrementGameScore()
        }
    }
  }
}
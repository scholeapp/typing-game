import { createPellet } from "../../models/index.js"
import { getTowerCoordinates, pelletRadiusX, pelletRadiusY } from "../../params/index.js"
import { Enemy, Pellet } from "../../types.js"
import { getRandomInt } from "../../utils/index.js"

function sortEnemies(e1: Enemy, e2: Enemy) {
  return e1.y - e2.y
}

export function handleKeyDown(event: KeyboardEvent, canvas: HTMLCanvasElement, enemies: Enemy[], pellets: Pellet[]) {
  let enemy = undefined
  const {y: towerY} = getTowerCoordinates(canvas)

  const sortedEnemies = enemies.sort(sortEnemies)
  for (let i = 0; i < enemies.length; i++) {
    const currentEnemy = sortedEnemies[i]
    if (!currentEnemy.visible || currentEnemy.text.length === 0) {
      continue
    }
    if (currentEnemy.focus) {
      enemy = currentEnemy
      break
    }
    if (currentEnemy.text[0].toLocaleLowerCase() === event.key) {
      enemy = currentEnemy
    }
  }
  if (enemy === undefined) {
    return 
  }
  if (enemy.text[0] === undefined) {
    console.log(enemy)
    console.log(enemy.text)
  }
  if (enemy.text[0].toLocaleLowerCase() === event.key) {
    createPellet(
      (canvas.width - (pelletRadiusX + pelletRadiusY) / 2) / 2,
      towerY - (pelletRadiusX + pelletRadiusY) / 2 / 2,
      enemy.id,
      event.key
    )
    enemy.text = enemy.text.slice(1)
    enemy.focus = true
    return
  } 
}
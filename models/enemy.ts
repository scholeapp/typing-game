import { minDy } from "params"
import { Enemy, Word } from "types"

const enemies: Enemy[] = []
let enemyId = 0

export function createEnemy(x: number, word: Word) {
  const dy = Math.max(Math.random(), minDy)
  const newEnemy: Enemy = {
    id: enemyId,
    x: x,
    y: 0,
    text: word.text,
    dy: dy,
    visibleText: word.text,
    visible: true,
    japanese: word.japanese,
    focus: false,
  }
  enemyId++
  return newEnemy
}

export function getEnemies() {
  return enemies
}
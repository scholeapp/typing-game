import { minDy } from "../params/index.js"
import { Enemy, Word } from "../types.js"


const enemies: Enemy[] = []
let enemyId = 0

export function createEnemy(x: number, word: Word) {
  const dy = Math.max(Math.random(), minDy)
  const newEnemy: Enemy = {
    id: enemyId,
    x: x,
    y: 0,
    originalText: word.text,
    remainingText: word.text,
    hitText: '',
    dy: dy,
    visible: true,
    japanese: word.japanese,
    focus: false,
  }
  enemies.push(newEnemy)
  enemyId++
  return newEnemy
}

export function getEnemy(id: number) {
  const enemy = enemies.find(function(e) {
    return e.id === id
  })
  return enemy
}

export function getEnemies() {
  return enemies
}
export function removeEnemy(id: number) {
  
}
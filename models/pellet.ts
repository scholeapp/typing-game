import { Pellet } from "../types.js";
import { getRandomInt } from "../utils/index.js";

const pellets: Pellet[]  = []
let pelletId = 0

export function getPellets() {
  return pellets
}

export function createPellet(x: number, y: number, enemyId: number, key: string) {
  const newPellet: Pellet = {
    id: pelletId,
    x: x,
    y: y,
    rotation: getRandomInt(180),
    visible: true,
    target: enemyId,
    key: key
  }
  pellets.push(newPellet)
  pelletId++
  return newPellet
}

export function anyPelletVisible() {
  for (let i = 0; i < pellets.length; i++ ) {
    if (pellets[i].visible) {
      return true
    }
  }
  return false
}
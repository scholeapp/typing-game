export type Enemy = {
  id: number, x: number, y: number, focus: boolean, visible: boolean, text: string, visibleText: string, japanese: string, dy: number
}

export type Pellet = {
  x: number, y: number, rotation: number, visible: boolean, target: Enemy["id"], key: string
}

export type Game  = {
  scene: 'opening' | 'playing' | 'gameover',
  enemyId: number,
  score: number,
}
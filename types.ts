export type Enemy = {
  id: number,
  x: number,
  y: number,
  focus: boolean,
  visible: boolean,
  originalText: string,  // this doesn't change
  remainingText: string,  // internally reduce this text.
  hitText: string,  // when a pellet hit, it push into hitText
  japanese: string,
  dy: number,
}

export type Pellet = {
  id: number, x: number, y: number, rotation: number, visible: boolean, target: Enemy["id"], key: string
}

export type Game  = {
  scene: 'opening' | 'playing' | 'gameover',
  score: number,
}

export type Word = {
  text: string,
  japanese: string,
  filename: string,
}
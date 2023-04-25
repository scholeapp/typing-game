import { getStartbuttonCoordinates } from "../params/index.js"
import { getWidth } from "../utils/index.js"

export function clear(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export function drawOpening(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const {x: startButtonX, y: startButtonY, width: startButtonWidth, height: startButtonHeight} = getStartbuttonCoordinates(canvas)
  
  ctx.font = "24px Arial"
  ctx.fillStyle = "#0095DD"
  const text = 'タイピングゲーム'
  const titleWidth = getWidth(ctx, text)
  ctx.fillText(text, (canvas.width - titleWidth) / 2, startButtonY - 80)
  
  ctx.roundRect(startButtonX, startButtonY, startButtonWidth, startButtonHeight, 8)
  ctx.fillStyle = "#0095DD"
  ctx.fill()
  ctx.font = "16px Arial"
  ctx.fillStyle = "#FFF"
  const textMetrics = ctx.measureText('START')
  const textWidth = textMetrics.width
  ctx.fillText('START', (canvas.width - textWidth) / 2, startButtonY + 28)
}


export function drawGameover(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, score: number) {
  const tryAgainButtonWidth = 100
  const tryAgainButtonHeight = 40
  const tryAgainButtonX = (canvas.width - tryAgainButtonWidth ) / 2
  const tryAgainButtonY = 160

  ctx.font = "24px Arial"
  ctx.fillStyle = "#0095DD"
  const gameoverWidth = getWidth(ctx, 'GAME OVER')
  
  ctx.fillText('GAME OVER', (canvas.width - gameoverWidth) / 2, 120)
  ctx.font = "16px Arial"
  ctx.fillText(`スコア: ${score}`, 100, 250)
  ctx.roundRect(tryAgainButtonX, tryAgainButtonY, tryAgainButtonWidth, tryAgainButtonHeight, 8)
  ctx.fillStyle = "#0095DD"
  ctx.fill()
  ctx.fillStyle = "#FFF"
  const textMetrics = ctx.measureText('もういちど')
  const textWidth = textMetrics.width
  ctx.fillText('もういちど', (canvas.width - textWidth) / 2, tryAgainButtonY + 28)
}

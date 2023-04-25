import { Game } from "../types.js";

export function drawScore(ctx: CanvasRenderingContext2D, score: number) {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#0095DD"
  ctx.textAlign = "start";
  ctx.fillText(`スコア: ${score}`, 8, 20)
}

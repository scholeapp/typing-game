import { enemyApproxHeight } from "params";
import { Enemy, Game } from "types";
import { getWidth } from "utils/index.js";

export function drawEnemies(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: Game, enemies: Enemy[], ) {

  const padding = 3

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i]
    if (!enemy.visible) {
      continue
    }
    ctx.textAlign = "end";
    let visibility = 0

    const visibleAreaMinY = Math.min(50 + game.score * 2, 150)
    if (enemy.y < visibleAreaMinY) {
      visibility = 0
    }
    if (enemy.y < 200) {
      visibility = (enemy.y - 50) / 150
    } else if (enemy.y > 200) {
      visibility = 1.0
    }
    ctx.fillStyle = enemy.focus ? "#DD9500" : `rgba(0, 149, 221, ${visibility})`  // #0095DD == rgba(0, 149, 221, 100)
    ctx.font = "24px monospace";
    const enemyWidth = getWidth(ctx, enemy.text)
    if (enemyWidth + padding > enemy.x) {
      // 文字が画面からはみ出るのを防止
      enemy.x = enemyWidth + padding
    }
    ctx.fillText(enemy.visibleText, enemy.x, enemy.y);  
    ctx.font = "14px Ariel";
    const jaWidth = getWidth(ctx, enemy.japanese)
    if ( jaWidth + padding > enemy.x) {
      enemy.x = jaWidth + padding
    }
    ctx.fillStyle = enemy.focus ? "#DD9500" : '#0095DD'
    ctx.fillText(enemy.japanese, enemy.x, enemy.y + enemyApproxHeight + 10);  
    enemy.y += enemy.dy

    // 最下部に到達したらゲームオーバー
    if (enemy.y > canvas.height && enemy.text.length > 0) {
      enemy.visible = false
      game.scene = 'gameover'
    }
  }
}
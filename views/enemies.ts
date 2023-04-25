import { enemyApproxHeight } from "../params/index.js";
import { Enemy, Game } from "../types";
import { getWidth } from "../utils/index.js";

function calculateVisibility(y: number) {
  const visibleAreaMinY = 100
  const visibleAreaMaxY = 250
  const v = (y - visibleAreaMinY  ) * 1 / (visibleAreaMaxY - visibleAreaMinY)
  return v
}

export function drawEnemies(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: Game, enemies: Enemy[], ) {


  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i]
    if (!enemy.visible) {
      continue
    }
    ctx.textAlign = "end";
    const visibility = calculateVisibility(enemy.y)
    offsetX(ctx, enemy)

    if (enemy.focus) {
      //    hel
      // こんにちは
      // のようにhel (received text)はalpha=0, loは不透明度=visibilityとなる
      const fadingInText = enemy.originalText.replace(enemy.hitText, '')
      ctx.font = "24px monospace";
      ctx.fillStyle = `rgba(221, 149, 0, ${visibility})`
      ctx.fillText(fadingInText, enemy.x, enemy.y);

      const fadingInTextWidth = getWidth(ctx, fadingInText)
      ctx.fillStyle = "#DD9500"
      ctx.fillText(enemy.hitText, enemy.x - fadingInTextWidth, enemy.y)

      ctx.font = "14px Ariel";
      ctx.fillText(enemy.japanese, enemy.x, enemy.y + enemyApproxHeight + 10);
    } else {
      ctx.fillStyle =`rgba(0, 149, 221, ${visibility})`  // #0095DD == rgba(0, 149, 221, 100)
      ctx.font = "24px monospace";
      ctx.fillText(enemy.remainingText, enemy.x, enemy.y);
      
  
      ctx.fillStyle = '#0095DD'
      ctx.font = "14px Ariel";
      ctx.fillText(enemy.japanese, enemy.x, enemy.y + enemyApproxHeight + 10);  
    }

    enemy.y += enemy.dy

    // 最下部に到達したらゲームオーバー
    if (enemy.y > canvas.height && enemy.remainingText.length > 0) {
      enemy.visible = false
      game.scene = 'gameover'
    }
  }
}

function offsetX(ctx: CanvasRenderingContext2D, enemy: Enemy) {
  // 文字が画面からはみ出るのを防止
  const padding = 3

  ctx.font = "24px monospace";
  const enemyWidth = getWidth(ctx, enemy.remainingText)
  if (enemyWidth + padding > enemy.x) {
    enemy.x = enemyWidth + padding
  }
  ctx.font = "14px Ariel";

  const jaWidth = getWidth(ctx, enemy.japanese)
  if ( jaWidth + padding > enemy.x) {
    enemy.x = jaWidth + padding
  }
}
import { enemyApproxHeight } from "../params/index.js";
import { getWidth } from "../utils/index.js";
export function drawEnemies(canvas, ctx, game, enemies) {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (!enemy.visible) {
            continue;
        }
        ctx.textAlign = "end";
        let visibility = 0;
        if (enemy.y < 50) {
            visibility = 0;
        }
        if (enemy.y < 200) {
            visibility = (enemy.y - 50) / 150;
        }
        else if (enemy.y > 200) {
            visibility = 1.0;
        }
        offsetX(ctx, enemy);
        if (enemy.focus) {
            //    hel
            // こんにちは
            // のようにhel (received text)はalpha=0, loは不透明度=visibilityとなる
            const remainingText = enemy.text.replace(enemy.receivedText, '');
            ctx.font = "24px monospace";
            ctx.fillStyle = `rgba(221, 149, 0, ${visibility})`;
            ctx.fillText(remainingText, enemy.x, enemy.y);
            const remainingTextWidth = getWidth(ctx, remainingText);
            ctx.fillStyle = "#DD9500";
            ctx.fillText(enemy.receivedText, enemy.x - remainingTextWidth, enemy.y);
            ctx.font = "14px Ariel";
            ctx.fillText(enemy.japanese, enemy.x, enemy.y + enemyApproxHeight + 10);
        }
        else {
            ctx.fillStyle = `rgba(0, 149, 221, ${visibility})`; // #0095DD == rgba(0, 149, 221, 100)
            ctx.font = "24px monospace";
            ctx.fillText(enemy.text, enemy.x, enemy.y);
            ctx.fillStyle = '#0095DD';
            ctx.font = "14px Ariel";
            ctx.fillText(enemy.japanese, enemy.x, enemy.y + enemyApproxHeight + 10);
        }
        enemy.y += enemy.dy;
        // 最下部に到達したらゲームオーバー
        if (enemy.y > canvas.height && enemy.text.length > 0) {
            enemy.visible = false;
            game.scene = 'gameover';
        }
    }
}
function offsetX(ctx, enemy) {
    // 文字が画面からはみ出るのを防止
    const padding = 3;
    ctx.font = "24px monospace";
    const enemyWidth = getWidth(ctx, enemy.text);
    if (enemyWidth + padding > enemy.x) {
        enemy.x = enemyWidth + padding;
    }
    ctx.font = "14px Ariel";
    const jaWidth = getWidth(ctx, enemy.japanese);
    if (jaWidth + padding > enemy.x) {
        enemy.x = jaWidth + padding;
    }
}

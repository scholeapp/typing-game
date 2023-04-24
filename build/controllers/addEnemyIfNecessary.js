import { createEnemy } from "models/index.js";
import { MAX_VISIBLE_WORDS, minDy } from "params/index.js";
import { getRandomInt, readAloud } from "utils/index.js";
import { words } from "words.js";
const padding = 3;
export function addEnemyIfNeccesary(canvas, ctx, enemies, audio) {
    const visibleEnemies = enemies.filter(function (e) {
        return e.visible;
    });
    if (visibleEnemies.length >= MAX_VISIBLE_WORDS) {
        return;
    }
    const ix = getRandomInt(words.length - 1);
    let x = getRandomInt(canvas.width);
    const word = words[ix];
    const dy = Math.max(Math.random(), minDy);
    ctx.font = "24px monospace";
    const textMetricsEn = ctx.measureText(word.text);
    ctx.font = "12px monospace";
    const textMetricsJa = ctx.measureText(word.japanese);
    const enemyWidth = Math.max(textMetricsEn.width, textMetricsJa.width);
    if (enemyWidth + padding > x) {
        // 文字が画面からはみ出るのを防止
        x = enemyWidth + padding;
    }
    const newEnemy = createEnemy(x, word);
    enemies.push(newEnemy);
    readAloud(audio, word.filename);
}

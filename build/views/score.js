export function drawScore(ctx, score) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.textAlign = "start";
    ctx.fillText(`スコア: ${score}`, 8, 20);
}

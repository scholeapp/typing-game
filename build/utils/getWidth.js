export function getWidth(ctx, text) {
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    return textWidth;
}

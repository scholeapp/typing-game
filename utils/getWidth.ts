export function getWidth(ctx: CanvasRenderingContext2D, text: string) {
  const textMetrics = ctx.measureText(text)
  const textWidth = textMetrics.width
  return textWidth
}
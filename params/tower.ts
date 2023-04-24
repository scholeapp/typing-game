export function getTowerCoordinates(canvas: HTMLCanvasElement){
  const width = 12
  const height = 12
  const x = (canvas.width - width) / 2
  const y = canvas.height - height
  return {
    x, y, width, height,
  }
}

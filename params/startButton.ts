export function getStartbuttonCoordinates(canvas:HTMLCanvasElement) {
  const width = 100
  const height = 40
  const x = (canvas.width - width) / 2
  const y = 180
  return {
    x, y, width, height
  }
}

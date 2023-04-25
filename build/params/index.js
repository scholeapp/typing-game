export const pelletRadiusX = 5;
export const pelletRadiusY = 9;
export const pelletVelocity = 5;
export const pelletAngVelocity = 0.2;
export const enemyApproxHeight = 14;
export const MAX_VISIBLE_WORDS = 1;
export const minDy = 0.8;
export function getStartbuttonCoordinates(canvas) {
    const width = 100;
    const height = 40;
    const x = (canvas.width - width) / 2;
    const y = 180;
    return {
        x, y, width, height
    };
}
export function getTowerCoordinates(canvas) {
    const width = 12;
    const height = 12;
    const x = (canvas.width - width) / 2;
    const y = canvas.height - height;
    return {
        x, y, width, height,
    };
}

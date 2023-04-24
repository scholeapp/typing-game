export function readAloud(audio, filename) {
    audio.src = '/assets/' + filename;
    audio.play();
}

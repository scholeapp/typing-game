export function readAloud(audio: HTMLAudioElement, filename: string) {
  audio.src = '/assets/' + filename
  audio.play()
}
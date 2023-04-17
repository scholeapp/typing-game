export function readAloud(text: string) {
  const ssu = new SpeechSynthesisUtterance(text);
  ssu.lang = "en-US";
  ssu.pitch = 1.0;
  // const voices = window.speechSynthesis.getVoices().filter(v => v.lang == 'en-US');
  window.speechSynthesis.speak(ssu);
}
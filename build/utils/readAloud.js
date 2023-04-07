export function readAloud(text) {
    const ssu = new SpeechSynthesisUtterance(text);
    ssu.lang = "en-US";
    ssu.pitch = 1.6;
    // const voices = window.speechSynthesis.getVoices().filter(v => v.lang == 'en-US');
    window.speechSynthesis.speak(ssu);
}

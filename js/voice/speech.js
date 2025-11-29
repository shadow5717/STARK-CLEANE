
export function speak(text){
  if(!('speechSynthesis' in window)){ console.warn('No TTS'); return; }
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'es-DO';
  window.speechSynthesis.cancel(); // cancel previous
  window.speechSynthesis.speak(msg);
}

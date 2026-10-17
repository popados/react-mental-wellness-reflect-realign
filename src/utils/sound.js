let ctx = null;

// Browsers only allow audio after a user gesture, so call this from a click
// handler before a timer starts; playChime can then fire when it ends.
export function primeAudio() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) ctx = new AudioCtx();
  } else if (ctx.state === "suspended") {
    ctx.resume();
  }
}

export function playChime() {
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    [0, 0.35, 0.7].forEach((offset, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 660 - i * 40;
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.3, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 1.3);
    });
  } catch {
    /* audio unavailable */
  }
}

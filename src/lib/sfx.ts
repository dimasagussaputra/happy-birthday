let ctx: AudioContext | null = null;
let muted = false;

export function setSfxMuted(value: boolean) {
  muted = value;
}

function tone(freq: number, duration: number, type: OscillatorType = 'sine', gainValue = 0.04, slideTo?: number) {
  if (muted || typeof window === 'undefined') return;
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    ctx ??= new Ctor();
    if (ctx.state === 'suspended') void ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
    gain.gain.setValueAtTime(gainValue, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  } catch {
    // Suara hanya bonus — abaikan kalau browser menolak.
  }
}

export function playPop() {
  tone(560, 0.12, 'triangle', 0.05, 130);
}

export function playChime() {
  tone(784, 0.32, 'sine', 0.035, 1174);
  window.setTimeout(() => tone(1318, 0.4, 'sine', 0.025), 90);
}

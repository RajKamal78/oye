// Web Audio API Romantic Synthesizer & Sound Effects Engine
// Completely offline, 100% reliable, zero external dependencies

class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.6;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.timerId = null;
    this.step = 0;
    this.subscribers = new Set();
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Music Gain (for gentle fade-in / volume control)
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      // SFX Gain
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    } catch (e) {
      console.warn("AudioContext initialization prevented:", e);
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback({ isPlaying: this.isPlaying, isMuted: this.isMuted, volume: this.volume });
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach((cb) =>
      cb({ isPlaying: this.isPlaying, isMuted: this.isMuted, volume: this.volume })
    );
  }

  async startMusic() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      try {
        await this.ctx.resume();
      } catch (err) {
        console.warn("Could not resume audio context:", err);
      }
    }

    if (this.isPlaying) return;

    this.isPlaying = true;
    this.notify();

    // Gentle fade in
    const now = this.ctx.currentTime;
    this.musicGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.setValueAtTime(0, now);
    this.musicGain.gain.linearRampToValueAtTime(0.7, now + 2.5);

    this.runMelodyLoop();
  }

  pauseMusic() {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    this.musicGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.linearRampToValueAtTime(0, now + 0.8);

    setTimeout(() => {
      this.isPlaying = false;
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      this.notify();
    }, 800);
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.startMusic();
    }
  }

  setVolume(newVal) {
    this.volume = Math.max(0, Math.min(1, newVal));
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  // Play a soft romantic music-box tone
  playNote(freq, time, duration = 1.2, gainLevel = 0.22) {
    if (!this.ctx || !this.musicGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Gentle sine + soft bell-like triangle
    osc1.type = "sine";
    osc2.type = "triangle";

    osc1.frequency.setValueAtTime(freq, time);
    // Subtle detune for romantic warmth
    osc2.frequency.setValueAtTime(freq * 2, time);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2200, time);
    filter.frequency.exponentialRampToValueAtTime(800, time + duration);

    // Warm envelope
    noteGain.gain.setValueAtTime(0, time);
    noteGain.gain.linearRampToValueAtTime(gainLevel, time + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(filter);
    filter.connect(this.musicGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }

  runMelodyLoop() {
    if (this.timerId) clearInterval(this.timerId);

    // Note frequencies
    const N = {
      C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
      C6: 1046.5
    };

    // 8-measure romantic chord progression & music box arpeggios
    // Fmaj7 -> G -> Em7 -> Am7 -> Dm7 -> G7 -> Cmaj9 -> C
    const measures = [
      { bass: N.F3, chord: [N.A3, N.C4, N.E4], melody: [N.C5, N.E5, N.G5, N.A5] },
      { bass: N.G3, chord: [N.B3, N.D4, N.G4], melody: [N.B4, N.D5, N.G5, N.F5] },
      { bass: N.E3, chord: [N.G3, N.B3, N.D4], melody: [N.G4, N.B4, N.E5, N.G5] },
      { bass: N.A3, chord: [N.C4, N.E4, N.G4], melody: [N.A4, N.C5, N.E5, N.C5] },
      { bass: N.D3, chord: [N.F3, N.A3, N.C4], melody: [N.F4, N.A4, N.D5, N.C5] },
      { bass: N.G3, chord: [N.B3, N.D4, N.F4], melody: [N.B4, N.D5, N.F5, N.E5] },
      { bass: N.C3, chord: [N.E3, N.G3, N.B3], melody: [N.C5, N.E5, N.G5, N.B5] },
      { bass: N.C3, chord: [N.G3, N.C4, N.E4], melody: [N.C5, N.G4, N.E4, N.C4] },
    ];

    let measureIdx = 0;
    const stepDuration = 0.55; // ~70 BPM 8th notes

    const scheduleMeasure = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const current = measures[measureIdx % measures.length];

      // Play soft bass note
      this.playNote(current.bass, now, 2.2, 0.24);

      // Play arpeggiated chord notes
      current.chord.forEach((freq, idx) => {
        this.playNote(freq, now + idx * 0.18, 1.6, 0.14);
      });

      // Play music box high melody
      current.melody.forEach((freq, idx) => {
        this.playNote(freq, now + idx * stepDuration, 1.2, 0.18);
      });

      measureIdx++;
    };

    // Schedule immediately then at interval
    scheduleMeasure();
    this.timerId = setInterval(scheduleMeasure, stepDuration * 4 * 1000);
  }

  // SOUND EFFECTS
  playPop() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.12);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  playChime() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    [880, 1318.5, 1760].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.9);
    });
  }

  playBlow() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Filtered noise buffer for blowing sound
    const bufferSize = this.ctx.sampleRate * 0.7;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(320, now);
    filter.Q.setValueAtTime(2.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.7);
  }

  playFanfare() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98];

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0.25, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.8);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.8);
    });
  }

  playBoop() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(120, now + 0.25);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }
}

export const audioEngine = new RomanticAudioEngine();

let ctx = new AudioContext();

function PlayClickSound() {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now); 

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
}

function PlayOggSound(soundFile, volume = 1.0, singleInstance = true) {
    const audio = new Audio(soundFile);
    audio.volume = volume;
    audio.play();
    console.log("Playing sound:", soundFile, "at volume:", volume, "singleInstance:", singleInstance);
    if (singleInstance) {
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            audio.pause();
        });
    }
}

export { PlayClickSound, PlayOggSound };
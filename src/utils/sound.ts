export class BackGroundSound {
  backgroundAudio: HTMLAudioElement;
  constructor(pathFile: string) {
    this.backgroundAudio = new Audio(pathFile);
    this.backgroundAudio.loop = true;
    this.backgroundAudio.volume = 0.5;
  }

  play() {
    this.backgroundAudio.play();
  }
  stop() {
    this.backgroundAudio.pause();
  }
}

export class EffectSound {
  effectAudio: HTMLAudioElement;
  constructor(pathFile: string) {
    this.effectAudio = new Audio(pathFile);
    this.effectAudio.volume = 1;
  }

  play() {
    this.effectAudio.currentTime = 0;
    this.effectAudio.play();
  }
}

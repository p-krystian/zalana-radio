import click from '@/assets/click.wav';

const audio = new Audio(click);
audio.preload = "auto";
audio.volume = 0.2;
audio.load();

function play() {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

export default play;

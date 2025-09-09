import Button from '@/components/Button/Button';
import { moveStep, t } from '@/conf';

type ControlsProps = {
  playing: boolean;
  audio?: HTMLAudioElement | null;
};

function Controls({ playing, audio }: ControlsProps) {
  const forward = () => {
    if (playing && audio) {
      audio.currentTime += moveStep;
    }
  }
  const backward = () => {
    if (playing && audio) {
      audio.currentTime -= moveStep;
    }
  }
  const stop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  return (
    <div class="pyr-flex-evenly">
      <Button
        onClick={backward}
        value={t.backward}
      >
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <title>{t.backward}</title>
          <path d="M256 448c106 0 192-86 192-192S362 64 256 64 64 150 64 256s86 192 192 192z" fill="none" stroke-miterlimit="10" stroke-width="32" />
          <path d="M192 176a16 16 0 0116 16v53l111.68-67.46a10.78 10.78 0 0116.32 9.33v138.26a10.78 10.78 0 01-16.32 9.31L208 267v53a16 16 0 01-32 0V192a16 16 0 0116-16z" />
        </svg>
      </Button>
      <Button
        onClick={stop}
        clicked={!playing && audio?.currentTime === 0}
        value={t.stop}
      >
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <title>{t.stop}</title>
          <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke-miterlimit="10" stroke-width="32" />
          <path d="M310.4 336H201.6a25.62 25.62 0 01-25.6-25.6V201.6a25.62 25.62 0 0125.6-25.6h108.8a25.62 25.62 0 0125.6 25.6v108.8a25.62 25.62 0 01-25.6 25.6z" />
        </svg>
      </Button>
      <Button
        onClick={() => audio?.play()}
        clicked={playing}
        value={t.play}
      >
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <title>{t.play}</title>
          <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke-miterlimit="10" stroke-width="32" />
          <path d="M216.32 334.44l114.45-69.14a10.89 10.89 0 000-18.6l-114.45-69.14a10.78 10.78 0 00-16.32 9.31v138.26a10.78 10.78 0 0016.32 9.31z" />
        </svg>
      </Button>
      <Button
        onClick={() => audio?.pause()}
        clicked={!playing && !!audio && audio.currentTime > 0}
        value={t.pause}
      >
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <title>{t.pause}</title>
          <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke-miterlimit="10" stroke-width="32" />
          <path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M208 192v128M304 192v128" />
        </svg>
      </Button>
      <Button
        onClick={forward}
        value={t.forward}
      >
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <title>{t.forward}</title>
          <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke-miterlimit="10" stroke-width="32" />
          <path d="M320 176a16 16 0 00-16 16v53l-111.68-67.44a10.78 10.78 0 00-16.32 9.31v138.26a10.78 10.78 0 0016.32 9.31L304 267v53a16 16 0 0032 0V192a16 16 0 00-16-16z" />
        </svg>
      </Button>
    </div>
  );
}

export default Controls;

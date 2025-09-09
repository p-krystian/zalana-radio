import Button from '@/components/Button/Button';
import { moveStep, t } from '@/conf';
import { useCallback, useEffect, useState } from 'preact/hooks';

type ControlsProps = {
  audio?: HTMLAudioElement
};
type AudioStates = 'playing' | 'paused' | 'stopped';

function Controls({ audio }: ControlsProps) {
  const [status, setStatus] = useState<AudioStates>('stopped');

  const audioStop = useCallback(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setStatus('stopped');
  }, [audio]);

  useEffect(() => {
    function onPlay() {
      setStatus('playing');
    }
    function onPause() {
      setStatus(audio?.currentTime === 0 ? 'stopped' : 'paused');
    }

    audio?.addEventListener('ended', audioStop);
    audio?.addEventListener('pause', onPause);
    audio?.addEventListener('play', onPlay);
    audio?.addEventListener('playing', onPlay);

    return () => {
      audio?.removeEventListener('ended', audioStop);
      audio?.removeEventListener('pause', onPause);
      audio?.removeEventListener('play', onPlay);
      audio?.removeEventListener('playing', onPlay);
    }
  }, [audio, audioStop]);

  return (
    <div class="pyr-flex-evenly">
      <Button
        onClick={() => { if (audio) audio.currentTime -= moveStep; }}
        value={t.backward}
      >
        {'<'}
      </Button>
      <Button
        onClick={audioStop}
        clicked={status === 'stopped'}
        value={t.stop}
      >
        {'s'}
      </Button>
      <Button
        onClick={() => audio?.play()}
        clicked={status === 'playing'}
        value={t.play}
      >
        {'o'}
      </Button>
      <Button
        onClick={() => audio?.pause()}
        clicked={status === 'paused'}
        value={t.pause}
      >
        {'p'}
      </Button>
      <Button
        onClick={() => { if (audio) audio.currentTime += moveStep; }}
        value={t.forward}
      >
        {'>'}
      </Button>
    </div>
  );
}

export default Controls;

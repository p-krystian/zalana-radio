import { moveStep } from '@/conf';
import { useCallback, useImperativeHandle, useRef } from 'preact/hooks';

type TimeListenerT = (sec: number) => unknown;
type AudioManageT = {
  getCurrentTime: () => number;
  registerTimeUpdate: (listener: TimeListenerT) => (() => void);
  registerDurationUpdate: (listener: TimeListenerT) => (() => void);

  play: () => unknown;
  pause: () => unknown;
  stop: () => unknown;
  forward: () => unknown;
  backward: () => unknown;
};
type CachedAudioProps = preact.JSX.AudioHTMLAttributes<HTMLAudioElement> & {
  manage: preact.Ref<AudioManageT>;
  onTimeUpdate?: never;
  onDurationChange?: never;
};

const timeListeners = new Set<TimeListenerT>();
const durationListeners = new Set<TimeListenerT>();

function CachedAudio({ manage, ...props }: CachedAudioProps) {
  const currentAudioRef = useRef<HTMLAudioElement>(null);

  const handleTimeUpdate = useCallback((e: preact.JSX.TargetedEvent<HTMLAudioElement>) => {
    timeListeners.forEach(tL => tL(e.currentTarget.currentTime));
  }, []);
  const handleDurationUpdate = useCallback((e: preact.JSX.TargetedEvent<HTMLAudioElement>) => {
    durationListeners.forEach(dL => dL(e.currentTarget.duration));
  }, []);

  useImperativeHandle(manage, () => {
    const audio = currentAudioRef.current;

    const registerTimeUpdate = (listener: TimeListenerT) => {
      timeListeners.add(listener);
      return () => timeListeners.delete(listener);
    }
    const registerDurationUpdate = (listener: TimeListenerT) => {
      durationListeners.add(listener);
      return () => durationListeners.delete(listener);
    }

    const forward = () => {
      if (audio && !audio.paused) {
        audio.currentTime += moveStep;
      }
    }
    const backward = () => {
      if (audio && !audio.paused) {
        audio.currentTime -= moveStep;
      }
    }
    const stop = () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
    return {
      getCurrentTime: () => currentAudioRef.current?.currentTime || 0,
      registerTimeUpdate,
      registerDurationUpdate,

      play: () => currentAudioRef.current?.play(),
      pause: () => currentAudioRef.current?.pause(),
      stop,
      forward,
      backward
    }
  }, []);

  return (
    <audio
      {...props}
      onTimeUpdate={handleTimeUpdate}
      onDurationChange={handleDurationUpdate}
      ref={currentAudioRef}
      controls={props.controls ?? true}
    />
  );
}

export { type AudioManageT };
export default CachedAudio;

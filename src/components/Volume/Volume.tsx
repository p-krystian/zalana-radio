import { t } from '@/conf';
import { useId } from 'preact/hooks';
import styles from './Volume.module.css';

type VolumeProps = {
  volume: number,
  setVolume: (volume: number) => void,
};

function Volume({ volume, setVolume }: VolumeProps) {
  const volumeId = useId();

  return (
    <div class={styles.volume}>
      <label for={volumeId}>{t.vol}</label>
      <input
        type="range"
        id={volumeId}
        onInput={e => setVolume(+e.currentTarget.value)}
        min="0"
        max="1"
        step="0.01"
        value={volume}
      />
    </div>
  );
}

export default Volume;
